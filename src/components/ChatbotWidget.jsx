import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatWithJsonny, fetchJsonnyPresetQuestions } from "../utils/chatWithJsonny";
import "./ChatbotWidget.css";

const STORAGE_SESSION_KEY = "jsonny_session_id";

function getOrCreateSessionId() {
  const existing = localStorage.getItem(STORAGE_SESSION_KEY);
  if (existing) return existing;

  const newSessionId = `jsonny-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(STORAGE_SESSION_KEY, newSessionId);
  return newSessionId;
}

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Ciao, sono Jsonny. Come posso aiutarti oggi?",
  },
];

const FALLBACK_PRESET_QUESTIONS = [
  "che prodotti vendi?",
  "parlami di json's quest",
  "quali categorie ci sono",
  "cosa fa il bastone tra le ruote",
];

function getProductSlugFromPath(pathname) {
  const match = String(pathname || "").match(/^\/products\/([^/]+)$/i);
  if (!match?.[1]) return "";

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function ChatbotWidget() {
  const location = useLocation();
  const widgetRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    moved: false,
  });
  const [sessionId] = useState(getOrCreateSessionId);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [presetQuestions, setPresetQuestions] = useState(FALLBACK_PRESET_QUESTIONS);
  const [hasLoadedPresetQuestions, setHasLoadedPresetQuestions] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsidePointerDown(event) {
      const widget = widgetRef.current;
      if (!widget) return;

      if (!widget.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || hasLoadedPresetQuestions) return;

    let cancelled = false;

    async function loadPresetQuestions() {
      try {
        const questions = await fetchJsonnyPresetQuestions();
        if (!cancelled && questions.length > 0) {
          setPresetQuestions(questions);
        }
      } catch {
        // Mantiene fallback locale senza interrompere la chat
      } finally {
        if (!cancelled) {
          setHasLoadedPresetQuestions(true);
        }
      }
    }

    loadPresetQuestions();

    return () => {
      cancelled = true;
    };
  }, [isOpen, hasLoadedPresetQuestions]);

  const historyForApi = useMemo(
    () =>
      messages
        .filter((item) => item.role === "user" || item.role === "assistant")
        .map((item) => ({ role: item.role, content: item.content })),
    [messages]
  );

  async function sendMessage(rawMessage) {
    const trimmedInput = String(rawMessage || "").trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = { role: "user", content: trimmedInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const productSlug = getProductSlugFromPath(location.pathname);
      const effectiveSessionId = productSlug ? `product-${productSlug}` : sessionId;

      const assistantReply = await chatWithJsonny(trimmedInput, historyForApi, effectiveSessionId, {
        productSlug: productSlug || undefined,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantReply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Non riesco a trovare il mio cervello ora. Riprova tra poco.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await sendMessage(input);
  }

  async function handlePresetQuestionClick(question) {
    await sendMessage(question);
  }

  function handleTogglePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current.active = true;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    dragRef.current.moved = false;
  }

  function handleTogglePointerMove(event) {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.lastX;
    const deltaY = event.clientY - drag.lastY;

    drag.lastX = event.clientX;
    drag.lastY = event.clientY;

    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
      drag.moved = true;
    }

    setDragOffset((prev) => {
      const widget = widgetRef.current;
      if (!widget) return prev;

      const rect = widget.getBoundingClientRect();
      const viewportPadding = 8;

      let allowedDeltaX = deltaX;
      let allowedDeltaY = deltaY;

      if (rect.left + allowedDeltaX < viewportPadding) {
        allowedDeltaX = viewportPadding - rect.left;
      }

      if (rect.right + allowedDeltaX > window.innerWidth - viewportPadding) {
        allowedDeltaX = (window.innerWidth - viewportPadding) - rect.right;
      }

      if (rect.top + allowedDeltaY < viewportPadding) {
        allowedDeltaY = viewportPadding - rect.top;
      }

      if (rect.bottom + allowedDeltaY > window.innerHeight - viewportPadding) {
        allowedDeltaY = (window.innerHeight - viewportPadding) - rect.bottom;
      }

      return {
        x: prev.x + allowedDeltaX,
        y: prev.y + allowedDeltaY,
      };
    });
  }

  function stopDrag(event) {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    drag.active = false;
    drag.pointerId = null;
    drag.lastX = 0;
    drag.lastY = 0;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleToggleClick() {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }

    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className="chatbot-widget"
      ref={widgetRef}
      style={{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
    >
      <button
        type="button"
        className="chatbot-toggle"
        onPointerDown={handleTogglePointerDown}
        onPointerMove={handleTogglePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onClick={handleToggleClick}
        aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
      >
        <img src="/img/jsonny.png" alt="Jsonny" className="chatbot-avatar" draggable={false} />
      </button>

      {isOpen ? (
        <section className="chatbot-panel" aria-live="polite">
          <header className="chatbot-header">
            <img src="/img/jsonny.png" alt="Jsonny" className="chatbot-header-avatar" />
            <div>
              <h2>Jsonny</h2>
              <p>Assistente virtuale</p>
            </div>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`chatbot-message chatbot-message-${message.role}`}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </article>
            ))}

            {isLoading ? (
              <article className="chatbot-message chatbot-message-assistant">
                Sto scrivendo...
              </article>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          {presetQuestions.length > 0 ? (
            <div className="chatbot-preset-questions" aria-label="Domande preimpostate">
              {presetQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chatbot-preset-button"
                  onClick={() => handlePresetQuestionClick(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Scrivi un messaggio..."
              aria-label="Messaggio per Jsonny"
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Invia
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}

export default ChatbotWidget;
