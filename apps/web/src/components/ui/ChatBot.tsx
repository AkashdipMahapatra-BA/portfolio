"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, RotateCcw, Sparkles, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "⚡ What AWS projects has he built?",
  "🛠️ What is Akashdip's core tech stack?",
  "💼 Tell me about his work experience",
  "✉️ How can I contact Akashdip?",
  "🤖 How this Chatbot works",
];

const INITIAL_WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi there! I'm **Akashdip AI**, your interactive assistant. Ask me anything about Akashdip's experience in **Data Engineering**, **AWS Cloud Automation**, **Python**, or his engineering projects!",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "I couldn't process that response. Please try again!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Connection error. Please check your network connection or try again shortly!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_WELCOME]);
  };

  // Full Markdown Renderer helper for formatting code blocks, diagrams, links & headers safely
  const formatMarkdown = (text: string) => {
    let formatted = text;

    // 1. Parse markdown links: [Text](URL)
    formatted = formatted.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      "<a href='$2' target='_blank' rel='noopener noreferrer' class='chat-link'>$1</a>"
    );

    // 2. Parse triple backtick code blocks (```text ... ```)
    formatted = formatted.replace(/```(?:text|json|bash|cypher)?\n?([\s\S]*?)```/g, (_match, codeContent) => {
      const escapedCode = codeContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre class="chat-code-block">${escapedCode.trim()}</pre>`;
    });

    // 3. Horizontal rules
    formatted = formatted.replace(/^---$/gm, "<hr class='chat-hr' />");

    // 4. Headers (### Header)
    formatted = formatted.replace(/### (.*?)(?=\n|$)/g, "<h4 class='chat-h4'>$1</h4>");
    formatted = formatted.replace(/## (.*?)(?=\n|$)/g, "<h3 class='chat-h3'>$1</h3>");

    // 5. Bold text (**word**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 6. Single backtick inline code (`code`)
    formatted = formatted.replace(/`([^`\n]+)`/g, "<code class='chat-code'>$1</code>");

    // 7. Convert remaining newlines (outside <pre>) to <br/>
    const parts = formatted.split(/(<pre[\s\S]*?<\/pre>)/g);
    formatted = parts
      .map((part) => {
        if (part.startsWith("<pre")) return part;
        return part.replace(/\n/g, "<br/>");
      })
      .join("");

    return { __html: formatted };
  };

  return (
    <aside aria-label="AI Assistant" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 1000 }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Akashdip AI Assistant Chat"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.8rem 1.2rem",
            borderRadius: "9999px",
            background: "var(--color-accent)",
            color: "#000",
            fontWeight: 600,
            fontSize: "0.85rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px color-mix(in srgb, var(--color-accent) 40%, transparent)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Sparkles style={{ width: "1.1rem", height: "1.1rem" }} />
            {hasUnread && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "2px solid #000",
                }}
              />
            )}
          </div>
          <span>Chat with AI</span>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div
          style={{
            width: "clamp(320px, 90vw, 400px)",
            height: "530px",
            borderRadius: "1.25rem",
            background: "color-mix(in srgb, var(--color-bg) 92%, #000)",
            backdropFilter: "blur(16px)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "chatFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.25rem",
              background: "color-mix(in srgb, var(--color-border) 25%, transparent)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
                  border: "1px solid var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent)",
                  position: "relative",
                }}
              >
                <Bot style={{ width: "20px", height: "20px" }} />
                <span
                  style={{
                    position: "absolute",
                    bottom: "1px",
                    right: "1px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#22c55e",
                  }}
                />
              </div>
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, margin: 0, color: "var(--color-text)" }}>
                  Akashdip AI
                </h4>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--color-muted)",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Data & Cloud Assistant
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <button
                onClick={handleClear}
                title="Reset conversation"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-muted)",
                  padding: "0.4rem",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  display: "flex",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                <RotateCcw style={{ width: "16px", height: "16px" }} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-muted)",
                  padding: "0.4rem",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  display: "flex",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: "0.25rem",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    maxWidth: "92%",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background:
                        msg.role === "user"
                          ? "var(--color-border)"
                          : "color-mix(in srgb, var(--color-accent) 25%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {msg.role === "user" ? (
                      <User style={{ width: "13px", height: "13px", color: "var(--color-muted)" }} />
                    ) : (
                      <Bot style={{ width: "13px", height: "13px", color: "var(--color-accent)" }} />
                    )}
                  </div>

                  <div
                    style={{
                      padding: "0.65rem 0.85rem",
                      borderRadius:
                        msg.role === "user" ? "1rem 1rem 0.2rem 1rem" : "1rem 1rem 1rem 0.2rem",
                      background:
                        msg.role === "user"
                          ? "color-mix(in srgb, var(--color-accent) 18%, transparent)"
                          : "color-mix(in srgb, var(--color-border) 40%, transparent)",
                      border:
                        msg.role === "user"
                          ? "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)"
                          : "1px solid var(--color-border)",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      color: "var(--color-text)",
                      wordBreak: "break-word",
                    }}
                    dangerouslySetInnerHTML={formatMarkdown(msg.content)}
                  />
                </div>

                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                    padding: "0 0.5rem",
                  }}
                >
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading typing indicator */}
            {isLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot style={{ width: "13px", height: "13px", color: "var(--color-accent)" }} />
                </div>
                <div
                  style={{
                    padding: "0.5rem 0.85rem",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    background: "color-mix(in srgb, var(--color-border) 40%, transparent)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <span className="dot-pulse" style={{ animationDelay: "0ms" }} />
                  <span className="dot-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="dot-pulse" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (if fewer than 4 messages) */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: "0.5rem 0.75rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.35rem",
                borderTop: "1px dashed var(--color-border)",
                background: "color-mix(in srgb, var(--color-bg) 60%, transparent)",
              }}
            >
              {INITIAL_SUGGESTIONS.map((sug, i) => {
                const isSpecial = sug.includes("How this Chatbot works");
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className={isSpecial ? "chat-sug-btn-special" : "chat-sug-btn-normal"}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      fontSize: "0.68rem",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "0.5rem",
                      background: isSpecial
                        ? "color-mix(in srgb, var(--color-accent) 20%, transparent)"
                        : "color-mix(in srgb, var(--color-border) 50%, transparent)",
                      border: isSpecial
                        ? "1px solid color-mix(in srgb, var(--color-accent) 60%, transparent)"
                        : "1px solid var(--color-border)",
                      color: isSpecial ? "var(--color-accent)" : "var(--color-muted)",
                      fontWeight: isSpecial ? 600 : 400,
                      cursor: "pointer",
                      textAlign: "left",
                      width: "auto",
                      boxShadow: isSpecial ? "0 2px 10px color-mix(in srgb, var(--color-accent) 25%, transparent)" : "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-accent)";
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSpecial) {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-muted)";
                      }
                    }}
                  >
                    {/* ONLY special 'How this Chatbot works' button gets the Dual-Sweep Shimmer */}
                    {isSpecial && (
                      <span
                        className="shimmer-layer-chat"
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                          animation: "shimmer-btn-chat 4.5s ease-in-out infinite",
                        }}
                      />
                    )}
                    <span style={{ position: "relative", zIndex: 1 }}>{sug}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Input Controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: "0.75rem 1rem",
              background: "color-mix(in srgb, var(--color-border) 20%, transparent)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Akashdip's skills or chatbot architecture..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                borderRadius: "0.6rem",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "0.6rem",
                background: input.trim() && !isLoading ? "var(--color-accent)" : "var(--color-border)",
                color: input.trim() && !isLoading ? "#000" : "var(--color-muted)",
                border: "none",
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
            >
              <Send style={{ width: "16px", height: "16px" }} />
            </button>
          </form>
        </div>
      )}

      {/* Global CSS keyframes for ChatBot animation, dual-sweep shimmer & markdown formatting */}
      <style jsx global>{`
        @keyframes chatFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer-btn-chat {
          0%     { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
          20%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
          20.01% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          23%    { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          23.01% { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
          43%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
          43.01% { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
          63%    { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
          63.01% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          100%   { opacity: 0; transform: translateX(-150%) skewX(-20deg); }
        }
        .dot-pulse {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
          display: inline-block;
          animation: dotPulse 1.2s infinite ease-in-out;
        }
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .chat-code {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1px 4px;
          border-radius: 3px;
          color: var(--color-accent);
        }
        .chat-code-block {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          line-height: 1.45;
          background: color-mix(in srgb, #000 85%, var(--color-bg));
          border: 1px solid color-mix(in srgb, var(--color-accent) 40%, transparent);
          border-radius: 0.5rem;
          padding: 0.65rem 0.75rem;
          margin: 0.6rem 0;
          color: var(--color-accent);
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.5);
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: hidden;
          max-width: 100%;
        }
        .chat-hr {
          margin: 0.6rem 0;
          border: none;
          border-top: 1px dashed var(--color-border);
        }
        .chat-h4 {
          font-size: 0.82rem;
          font-weight: 700;
          margin: 0.5rem 0 0.25rem 0;
          color: var(--color-accent);
        }
        .chat-h3 {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0.6rem 0 0.3rem 0;
          color: var(--color-text);
        }
        .chat-link {
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
          word-break: break-all;
          transition: opacity 0.15s ease;
        }
        .chat-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </aside>
  );
}
