"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send, RotateCcw, Bot, User, ExternalLink, Loader2, Sparkles, Maximize2, FileText, Download, Key, Lock, Check, ThumbsUp, ThumbsDown, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_URL, STORAGE_KEYS, ChatMessage, ChatSource, sendChatFeedback } from "../lib/api";

export default function FloatingChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamBuffer, setCurrentStreamBuffer] = useState("");
  const [zoomedMessage, setZoomedMessage] = useState<ChatMessage | null>(null);

  // Estado para la Clave de Acceso del curso
  const [accessKeyInput, setAccessKeyInput] = useState("");
  const [hasValidKey, setHasValidKey] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyError, setKeyError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Función para exportar la conversación completa o apunte a PDF General impecable
  const handleExportNotebookPDF = (targetMsg?: ChatMessage) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const messagesToExport = targetMsg ? [targetMsg] : messages;

    // Convertidor liviano de Markdown a HTML para PDF limpio
    const markdownToHTML = (text: string) => {
      let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Formatear tablas Markdown
      const tableRegex = /\|(.+)\|[\r\n]\|[-:| ]+\|[\r\n]((?:\|.+\|[\r\n]?)+)/g;
      html = html.replace(tableRegex, (match, headerLine, bodyLines) => {
        const headers = headerLine.split("|").filter((h: string) => h.trim() !== "").map((h: string) => `<th>${h.trim()}</th>`).join("");
        const rows = bodyLines.trim().split("\n").map((row: string) => {
          const cols = row.split("|").filter((c: string) => c.trim() !== "").map((c: string) => `<td>${c.trim()}</td>`).join("");
          return `<tr>${cols}</tr>`;
        }).join("");
        return `<table class="pdf-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
      });

      // Formatear títulos, negritas y código
      html = html
        .replace(/^## (.*$)/gim, '<h2 class="pdf-h2">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="pdf-h3">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="pdf-code">$1</code>')
        .replace(/\n/g, '<br/>');

      return html;
    };

    const renderedMessages = messagesToExport.map((m) => `
      <div class="msg-box ${m.role === 'user' ? 'user-msg' : 'assistant-msg'}">
        <div class="msg-header">
          <strong>${m.role === 'user' ? '👤 Alumno' : '🤖 Tutor Cloud IA'}</strong>
          <span class="msg-date">${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="msg-body">${markdownToHTML(m.content)}</div>
      </div>
    `).join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Apunte Académico - Cloud Computing</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 32px; color: #0f172a; max-width: 840px; margin: 0 auto; line-height: 1.6; background: #fff; }
          .header { border-bottom: 3px solid #0284c7; padding-bottom: 12px; margin-bottom: 24px; }
          .title { font-size: 24px; font-weight: bold; color: #0284c7; margin: 0; }
          .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
          .msg-box { margin-bottom: 20px; padding: 16px; border-radius: 12px; font-size: 13px; page-break-inside: avoid; }
          .user-msg { background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; }
          .assistant-msg { background: #f8fafc; border: 1px solid #e2e8f0; color: #1e293b; }
          .msg-header { font-size: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; border-b: 1px solid #cbd5e1; padding-bottom: 4px; }
          .msg-date { color: #94a3b8; font-size: 11px; }
          .pdf-h2 { color: #0369a1; font-size: 16px; margin-top: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
          .pdf-h3 { color: #0f172a; font-size: 14px; margin-top: 10px; }
          .pdf-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
          .pdf-table th { background: #e0f2fe; color: #0369a1; padding: 8px 10px; border: 1px solid #7dd3fc; text-align: left; font-weight: 600; }
          .pdf-table td { padding: 8px 10px; border: 1px solid #e2e8f0; }
          .pdf-code { background: #0f172a; color: #38bdf8; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 11px; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">📄 Documento de Estudio: Cloud Computing (GCP)</h1>
          <p class="subtitle">Portal Académico FES Acatlán - UNAM • Exportación General • ${new Date().toLocaleDateString("es-MX")}</p>
        </div>
        ${renderedMessages}
        <div class="footer">
          <p>Generado automáticamente desde la plataforma de Cloud Computing • Compatible con Gemini Notebook LM & Lectores PDF</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Cargar historial y clave de localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
      const savedKey = localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY);
      if (savedKey) {
        setHasValidKey(true);
        setAccessKeyInput(savedKey);
      }
    } catch (e) {
      console.warn("No se pudo cargar el historial de chat", e);
    }
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = accessKeyInput.trim();
    if (!cleanKey) return;

    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_ACCESS_KEY, cleanKey);
      setHasValidKey(true);
      setShowKeyInput(false);
      setKeyError(false);
    } catch (e) { }
  };

  // Guardar historial truncado a los últimos 40 mensajes

  // Función para calificar una respuesta (👍 / 👎)
  const handleRating = async (targetMsg: ChatMessage, ratingValue: number) => {
    if (!targetMsg.log_id) return;
    const newRating = targetMsg.rating === ratingValue ? 0 : ratingValue;
    const updated = messages.map((m) =>
      m.id === targetMsg.id ? { ...m, rating: newRating } : m
    );
    saveChatHistory(updated);
    if (newRating !== 0) {
      await sendChatFeedback(targetMsg.log_id, newRating);
    }
  };

  const saveChatHistory = (newMessages: ChatMessage[]) => {
    const truncated = newMessages.slice(-40);
    setMessages(truncated);
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(truncated));
    } catch (e) {
      console.warn("No se pudo guardar el historial de chat", e);
    }
  };

  // Scroll al final al recibir contenido
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStreamBuffer]);

  // Limpiar conversación
  const handleNewConversation = () => {
    setMessages([]);
    setCurrentStreamBuffer("");
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    } catch (e) { }
  };

  // Navegar a la fuente citada
  const handleNavigateSource = (source: ChatSource) => {
    router.push(source.url);
    setTimeout(() => {
      const elem = document.getElementById(source.slug);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  // Enviar mensaje y procesar SSE Stream
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || isStreaming) return;

    const accessKey = localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY) || "";

    // BLOQUEO ESTRICTO EN FRONTEND: Si no hay clave de acceso guardada, exige ingresarla antes de consumir la API
    if (!hasValidKey || !accessKey.trim()) {
      setShowKeyInput(true);
      const promptKeyMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "🔒 Se requiere la Clave de Acceso del curso para enviar consultas y proteger los recursos de la plataforma. Por favor ingresa la clave arriba.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, promptKeyMsg]);
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setCurrentStreamBuffer("");

    // Preparar historial reciente (últimos 8 mensajes)
    const historyPayload = updatedMessages.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    abortControllerRef.current = new AbortController();
    let accumulatedText = "";
    let receivedSources: ChatSource[] = [];
    let receivedLogId = "";
    let isCachedResponse = false;

    try {
      const accessKey = localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY) || "";

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": accessKey,
        },
        body: JSON.stringify({ query, history: historyPayload, access_key: accessKey }),
        signal: abortControllerRef.current.signal,
      });

      if (response.status === 401) {
        throw new Error("CLAVE_INVALIDA");
      }

      if (!response.ok) {
        throw new Error(`Error en servidor (${response.status})`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));

              if (data.text) {
                accumulatedText += data.text;
                setCurrentStreamBuffer(accumulatedText);
              }
              if (data.sources) {
                receivedSources = data.sources;
              }
              if (data.log_id) {
                receivedLogId = data.log_id;
              }
              if (data.cached) {
                isCachedResponse = true;
              }
              if (data.error) {
                accumulatedText += `\n[Error: ${data.error}]`;
                setCurrentStreamBuffer(accumulatedText);
              }
            } catch (err) {
              console.warn("Error parseando SSE chunk", err);
            }
          }
        }
      }

      // Finalizar mensaje de la IA
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: accumulatedText || "Respuesta recibida.",
        sources: receivedSources,
        log_id: receivedLogId,
        isCached: isCachedResponse,
        timestamp: Date.now(),
      };

      saveChatHistory([...updatedMessages, assistantMessage]);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        if (err.message === "CLAVE_INVALIDA") {
          localStorage.removeItem(STORAGE_KEYS.CHAT_ACCESS_KEY);
          setHasValidKey(false);
          const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "🔒 La clave de acceso ingresada es incorrecta o ha caducado. Por favor, ingresa la clave de nuevo arriba para continuar.",
            timestamp: Date.now(),
          };
          saveChatHistory([...updatedMessages, errorMessage]);
        } else {
          const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: accumulatedText
              ? `${accumulatedText}\n\n⚠️ (La respuesta se cortó por conexión. Intenta de nuevo.)`
              : "⚠️ Ocurrió un problema de conexión con el Asistente IA (servidor despertando en Render). Intenta en unos segundos.",
            sources: receivedSources,
            timestamp: Date.now(),
          };
          saveChatHistory([...updatedMessages, errorMessage]);
        }
      }
    } finally {
      setIsStreaming(false);
      setCurrentStreamBuffer("");
    }
  };

  return (
    <>
      {/* Botón Flotante Inferior Derecho */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-3.5 sm:p-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full shadow-2xl shadow-cyan-900/50 transition-all duration-300 transform hover:scale-105 z-50 flex items-center space-x-2 group border border-cyan-400/30"
          aria-label="Abrir Asistente Tutor IA"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs sm:text-sm font-semibold pr-1">
            Asistente Tutor IA
          </span>
        </button>
      )}

      {/* Ventana Desplegable de Chatbot */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 w-[480px] max-w-[calc(100vw-1.5rem)] h-[580px] max-h-[calc(100vh-5rem)] bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300">
          {/* Encabezado del Chat */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  Tutor Cloud IA <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[11px] text-slate-400">RAG + Llama 3 / Gemini</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                title={hasValidKey ? "Clave de acceso configurada" : "Ingresar clave de acceso"}
                className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 text-xs ${hasValidKey
                    ? "text-emerald-400 hover:bg-slate-800"
                    : "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                  }`}
              >
                <Key className="w-4 h-4" />
                {!hasValidKey && <span className="text-[11px] font-medium pr-1">Clave</span>}
              </button>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
                    if (lastAssistantMsg) setZoomedMessage(lastAssistantMsg);
                  }}
                  title="Ver conversación en grande"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleNewConversation}
                title="Nueva Conversación"
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner o Formulario para pedir la clave si no está configurada o si el usuario quiere cambiarla */}
          {(!hasValidKey || showKeyInput) && (
            <div className="bg-slate-950 border-b border-amber-500/30 p-3.5 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Clave de Acceso al Asistente IA</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Para proteger los tokens del curso de uso externo, ingresa la clave asignada en clase.
              </p>
              <form onSubmit={handleSaveKey} className="flex items-center space-x-2 pt-1">
                <input
                  type="password"
                  value={accessKeyInput}
                  onChange={(e) => setAccessKeyInput(e.target.value)}
                  placeholder="Ingresa clave (ej. rgm8dh)"
                  className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-500 text-xs rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
              </form>
            </div>
          )}

          {/* Lista de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && !currentStreamBuffer && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Bot className="w-12 h-12 text-cyan-500/50 mb-3" />
                <p className="text-sm font-medium text-slate-200">¡Hola! Soy tu tutor del curso.</p>
                <p className="text-xs text-slate-400 mt-1">
                  Pregúntame cualquier duda sobre Compute Engine, IAM, Cloud Storage, Serverless o laboratorios.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed overflow-x-auto ${msg.role === "user"
                      ? "bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-950/40"
                      : "bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none"
                    }`}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-2">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ node, ...props }) => (
                            <div className="my-2 overflow-x-auto rounded-lg border border-slate-700">
                              <table className="w-full text-left text-[11px] border-collapse bg-slate-900/60" {...props} />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th className="bg-slate-800/90 text-cyan-300 font-semibold p-2 border-b border-slate-700" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="p-2 border-b border-slate-800/80 text-slate-300" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-xs font-bold text-cyan-300 mt-2 mb-1 border-b border-slate-700/50 pb-1" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-xs font-semibold text-slate-100 mt-2 mb-1" {...props} />
                          ),
                          code: ({ node, className, children, ...props }) => (
                            <code className="bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[11px]" {...props}>
                              {children}
                            </code>
                          ),
                          a: ({ node, children, href, ...props }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300 font-medium" {...props}>
                              {children}
                            </a>
                          )
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Botones de Acción (Ver en Grande + PDF Gemini Notebook) */}
                  {msg.role === "assistant" && (
                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setZoomedMessage(msg)}
                          className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-medium transition-colors"
                          title="Ver respuesta ampliada en modal"
                        >
                          <Maximize2 className="w-3 h-3 text-cyan-400" />
                          <span>Ver en grande</span>
                        </button>
                        <button
                          onClick={() => handleExportNotebookPDF(msg)}
                          className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-900 hover:bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium transition-colors"
                          title="Exportar apunte PDF para Gemini Notebook"
                        >
                          <FileText className="w-3 h-3 text-emerald-400" />
                          <span>PDF Notebook</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-1">
                        {msg.isCached && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[9px] font-semibold" title="Respuesta ultra rapida desde Cache Semantico">
                            <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          </span>
                        )}
                        {msg.log_id && (
                          <div className="flex items-center space-x-1 pl-1">
                            <button
                              onClick={() => handleRating(msg, 1)}
                              className={`p-1 rounded-md border text-[10px] font-medium transition-colors flex items-center space-x-1 ${msg.rating === 1
                                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50"
                                  : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-300 border-slate-700/60"
                                }`}
                              title="Respuesta util (👍)"
                            >
                              <ThumbsUp className="w-3 h-3 text-emerald-400" />
                            </button>
                            <button
                              onClick={() => handleRating(msg, -1)}
                              className={`p-1 rounded-md border text-[10px] font-medium transition-colors flex items-center space-x-1 ${msg.rating === -1
                                  ? "bg-rose-950 text-rose-300 border-rose-500/50"
                                  : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border-slate-700/60"
                                }`}
                              title="Respuesta no util (👎)"
                            >
                              <ThumbsDown className="w-3 h-3 text-rose-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fuentes RAG citadas */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Fuentes:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavigateSource(src)}
                            className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/20 text-[10px] transition-colors"
                          >
                            <span>{src.title}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Mensaje en Streaming acumulativo */}
            {isStreaming && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="max-w-[88%] p-3.5 rounded-2xl rounded-bl-none bg-slate-800/90 text-slate-200 border border-slate-700/60 text-xs leading-relaxed overflow-x-auto">
                  {currentStreamBuffer ? (
                    <div className="prose prose-invert max-w-none text-xs leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ node, ...props }) => (
                            <div className="my-2 overflow-x-auto rounded-lg border border-slate-700">
                              <table className="w-full text-left text-[11px] border-collapse bg-slate-900/60" {...props} />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th className="bg-slate-800/90 text-cyan-300 font-semibold p-2 border-b border-slate-700" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="p-2 border-b border-slate-800/80 text-slate-300" {...props} />
                          ),
                          code: ({ node, children, ...props }) => (
                            <code className="bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[11px]" {...props}>
                              {children}
                            </code>
                          )
                        }}
                      >
                        {currentStreamBuffer}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Buscando en contexto RAG y pensando...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de Entrada */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasValidKey ? "Escribe tu duda sobre Cloud..." : "🔒 Ingresa la clave arriba para chatear..."}
              className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 disabled:opacity-60"
              disabled={isStreaming || !hasValidKey}
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim() || !hasValidKey}
              className="p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white disabled:text-slate-600 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Modal Ampliado ("Ver en Grande") */}
      {zoomedMessage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header del Modal */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">Respuesta Ampliada del Tutor IA</h3>
                  <p className="text-xs text-slate-400">Vista detallada para estudio profundo y toma de notas</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportNotebookPDF(zoomedMessage)}
                  className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>PDF Gemini Notebook</span>
                </button>
                <button
                  onClick={() => setZoomedMessage(null)}
                  className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido Ampliado en ReactMarkdown */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-slate-200">
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ node, ...props }) => (
                      <div className="my-4 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/60 p-1">
                        <table className="w-full text-left text-xs border-collapse" {...props} />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th className="bg-slate-800/90 text-cyan-300 font-semibold p-3 border-b border-slate-700" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="p-3 border-b border-slate-800 text-slate-300" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-base font-bold text-cyan-300 mt-4 mb-2 border-b border-slate-700/60 pb-1" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-sm font-semibold text-slate-100 mt-3 mb-1" {...props} />
                    ),
                    code: ({ node, children, ...props }) => (
                      <code className="bg-slate-950 text-cyan-400 px-2 py-1 rounded font-mono text-xs" {...props}>
                        {children}
                      </code>
                    ),
                    a: ({ node, children, href, ...props }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300 font-medium" {...props}>
                        {children}
                      </a>
                    )
                  }}
                >
                  {zoomedMessage.content}
                </ReactMarkdown>
              </div>

              {/* Fuentes RAG citadas en modal */}
              {zoomedMessage.sources && zoomedMessage.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                  <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Fuentes RAG Referenciadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {zoomedMessage.sources.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setZoomedMessage(null);
                          setIsOpen(false);
                          handleNavigateSource(src);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs transition-colors"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
