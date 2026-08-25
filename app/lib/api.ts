/**
 * Configuración centralizada del cliente API y constantes de almacenamiento local.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Claves centralizadas para localStorage
export const STORAGE_KEYS = {
  RECENT_SEARCHES: "cloud_recent_searches",
  CHAT_HISTORY: "cloud_chat_history",
  EXAM_CONFIG: "cloud_exam_config",
  CHAT_ACCESS_KEY: "cloud_chat_access_key",
};

export interface SearchResult {
  id: string;
  title: string;
  unidad?: number;
  labNumber?: number;
  slug: string;
  snippet: string;
  url: string;
  score: number;
}

export interface ChatSource {
  title: string;
  url: string;
  slug: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  log_id?: string;
  rating?: number; // 1 (👍) o -1 (👎)
  isCached?: boolean;
  timestamp: number;
}

/**
 * Envia la calificación (👍 / 👎) de una respuesta del asistente al backend.
 */
export async function sendChatFeedback(logId: string, rating: number, comment?: string): Promise<boolean> {
  try {
    const accessKey = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY) || "" : "";
    const response = await fetch(`${API_URL}/chat/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": accessKey,
      },
      body: JSON.stringify({ log_id: logId, rating, comment, access_key: accessKey }),
    });
    return response.ok;
  } catch (err) {
    console.warn("Error enviando feedback de rating", err);
    return false;
  }
}

export interface ExamRequestPayload {
  unidad?: number | null;
  labNumber?: number | null;
  tipo?: string;
  cantidad?: number;
}

export interface ExamResponse {
  unidad?: number;
  labNumber?: number;
  tipo: string;
  total_examples: number;
  questions: any[];
}

/**
 * Función genérica de fetch con timeout integrado.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 15000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
    });
    return response;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`TIEMPO_EXCEDIDO: La petición tardó más de ${timeoutMs / 1000}s. Es posible que el servidor en Render esté despertando.`);
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}
