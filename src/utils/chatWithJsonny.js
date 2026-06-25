const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || "/ai/assistant";

const PREFERRED_KEYS = new Set([
  "reply",
  "response",
  "message",
  "result",
  "text",
  "answer",
  "completion",
  "output_text",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    if (Array.isArray(acc)) {
      const index = Number(key);
      return Number.isNaN(index) ? undefined : acc[index];
    }
    return acc[key];
  }, obj);
}

function findTextDeep(node, parentKey = "") {
  if (node == null) return "";

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findTextDeep(item, parentKey);
      if (found) return found;
    }
    return "";
  }

  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (PREFERRED_KEYS.has(key) && isNonEmptyString(value)) {
        return value.trim();
      }

      const found = findTextDeep(value, key);
      if (found) return found;
    }
    return "";
  }

  if (PREFERRED_KEYS.has(parentKey) && isNonEmptyString(node)) {
    return node.trim();
  }

  return "";
}

function extractAssistantText(payload) {
  if (isNonEmptyString(payload)) {
    return payload.trim();
  }

  if (!payload || typeof payload !== "object") {
    return "Non sono riuscito a generare una risposta.";
  }

  const candidatePaths = [
    "reply",
    "response",
    "message",
    "result",
    "text",
    "answer",
    "completion",
    "output_text",
    "data.reply",
    "data.response",
    "data.message",
    "data.result",
    "data.text",
    "data.answer",
    "data.completion",
    "data.output_text",
    "result.reply",
    "result.response",
    "result.message",
    "result",
    "result.text",
    "result.answer",
    "result.completion",
    "result.output_text",
    "choices.0.message.content",
    "choices.0.text",
    "content.0.text",
  ];

  for (const path of candidatePaths) {
    const value = getByPath(payload, path);
    if (isNonEmptyString(value)) {
      return value.trim();
    }
  }

  if (Array.isArray(payload.content)) {
    const textContent = payload.content
      .map((item) => {
        if (isNonEmptyString(item)) return item.trim();
        if (isNonEmptyString(item?.text)) return item.text.trim();
        return "";
      })
      .filter(Boolean)
      .join("\n");

    if (textContent) return textContent;
  }

  const deepResult = findTextDeep(payload);
  if (deepResult) {
    return deepResult;
  }

  return "Non sono riuscito a generare una risposta.";
}

export async function chatWithJsonny(message, history = [], sessionId = "default", options = {}) {
  const body = {
    message,
    history,
    sessionId,
  };

  if (options?.productSlug) {
    body.productSlug = options.productSlug;
  }

  if (options?.productId) {
    body.productId = options.productId;
  }

  const response = await fetch(`${BACKEND_URL}${CHAT_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Errore durante la richiesta al chatbot");
  }

  const contentType = response.headers.get("content-type") || "";

  let payload;

  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch {
      payload = await response.text();
    }
  } else {
    payload = await response.text();
  }

  return extractAssistantText(payload);
}
