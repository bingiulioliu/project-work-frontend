import { useEffect, useMemo, useRef, useState } from "react";
import { chatWithJsonny } from "../utils/chatWithJsonny";
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

function ChatbotWidget() {
  const messagesEndRef = useRef(null);
  const [sessionId] = useState(getOrCreateSessionId);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [isOpen, messages, isLoading]);

  const historyForApi = useMemo(
    () =>
      messages
        .filter((item) => item.role === "user" || item.role === "assistant")
        .map((item) => ({ role: item.role, content: item.content })),
    [messages]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = { role: "user", content: trimmedInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const assistantReply = await chatWithJsonny(trimmedInput, historyForApi, sessionId);

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

  return (
    <div className="chatbot-widget">
      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
      >
        <img src="/img/jsonny.png" alt="Jsonny" className="chatbot-avatar" />
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
                {message.content}
              </article>
            ))}

            {isLoading ? (
              <article className="chatbot-message chatbot-message-assistant">
                Sto scrivendo...
              </article>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

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
