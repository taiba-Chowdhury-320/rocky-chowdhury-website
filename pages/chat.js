// pages/chat.js
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Chat() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm Rocky Chowdhury's AI assistant. How can I help you today? 👋`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${data.message}` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Head><title>AI Chat — Rocky Chowdhury</title></Head>
      <Navbar />

      <div style={{
        paddingTop: "64px", height: "100vh",
        display: "flex", flexDirection: "column",
        background: "#080808"
      }}>
        {/* Chat header */}
        <div style={{
          padding: "1.25rem 2rem",
          borderBottom: "1px solid #1a1a1a",
          display: "flex", alignItems: "center", gap: "0.75rem",
          background: "#0d0d0d"
        }}>
          <div style={{
            width: "36px", height: "36px",
            background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem"
          }}>✦</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
              Rocky&apos;s AI Assistant
            </div>
            <div style={{ color: "#52c97a", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#52c97a", display: "inline-block" }} />
              Online · Powered by Claude
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem"
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "fadeIn 0.3s ease"
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: "30px", height: "30px", flexShrink: 0,
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", marginRight: "0.75rem", marginTop: "0.2rem"
                }}>✦</div>
              )}
              <div style={{
                maxWidth: "70%",
                padding: "0.875rem 1.25rem",
                background: msg.role === "user" ? "#c9a84c" : "#141414",
                color: msg.role === "user" ? "#080808" : "#e0d9cc",
                border: msg.role === "user" ? "none" : "1px solid #1f1f1f",
                fontSize: "0.875rem", lineHeight: 1.7,
                fontWeight: msg.role === "user" ? 500 : 400,
                whiteSpace: "pre-wrap"
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "30px", height: "30px",
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem"
              }}>✦</div>
              <div style={{
                padding: "0.875rem 1.25rem", background: "#141414",
                border: "1px solid #1f1f1f", display: "flex", gap: "4px", alignItems: "center"
              }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span key={i} style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#c9a84c", display: "inline-block",
                    animation: `pulse 1s ${delay}s infinite`
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid #1a1a1a", padding: "1.25rem 2rem",
          background: "#0d0d0d", display: "flex", gap: "0.75rem", alignItems: "flex-end"
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message... (Enter to send)"
            rows={1}
            style={{
              flex: 1, padding: "0.85rem 1rem",
              background: "#141414", border: "1px solid #2a2a2a",
              color: "#f0ebe0", fontSize: "0.875rem",
              resize: "none", outline: "none",
              fontFamily: "inherit", lineHeight: 1.5,
              transition: "border-color 0.2s",
              maxHeight: "150px", overflowY: "auto"
            }}
            onFocus={e => e.target.style.borderColor = "#c9a84c"}
            onBlur={e => e.target.style.borderColor = "#2a2a2a"}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "0.85rem 1.5rem",
              background: loading || !input.trim() ? "#2a2a2a" : "#c9a84c",
              color: loading || !input.trim() ? "#555" : "#080808",
              border: "none", fontSize: "0.8rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              fontWeight: 700, cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s", whiteSpace: "nowrap"
            }}
          >
            {loading ? "..." : "Send →"}
          </button>
        </div>

        {/* Hint */}
        <div style={{
          textAlign: "center", padding: "0.6rem",
          color: "#333", fontSize: "0.7rem", letterSpacing: "0.06em"
        }}>
          Logged in as <span style={{ color: "#555" }}>{session?.user?.name || session?.user?.email}</span>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
}
