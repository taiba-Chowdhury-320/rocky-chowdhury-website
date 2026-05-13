// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Rocky Chowdhury — AI-Powered Website</title>
        <meta name="description" content="Rocky Chowdhury's personal AI-powered website. Chat with AI, explore projects." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main style={{ paddingTop: "64px" }}>
        {/* HERO SECTION */}
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column", textAlign: "center",
          padding: "4rem 2rem", position: "relative", overflow: "hidden"
        }}>
          {/* Background grid */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }} />

          {/* Glow */}
          <div style={{
            position: "absolute", top: "30%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            zIndex: 0
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: "1px solid #2a2a2a", padding: "0.4rem 1.2rem",
              marginBottom: "2rem", fontSize: "0.72rem",
              letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a84c"
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#52c97a",
                boxShadow: "0 0 8px #52c97a",
                animation: "pulse 2s infinite"
              }} />
              AI-Powered Website
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em"
            }}>
              Rocky{" "}
              <span style={{
                background: "linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
                display: "inline-block"
              }}>Chowdhury</span>
            </h1>

            <p style={{
              color: "#888", fontSize: "1.05rem", maxWidth: "560px",
              margin: "0 auto 3rem", lineHeight: 1.7, fontWeight: 300
            }}>
              Welcome to my personal space on the web. Explore my work, connect with me, and have a conversation with my AI assistant — trained to answer all your questions.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/chat" style={{
                background: "#c9a84c", color: "#080808",
                padding: "0.9rem 2.5rem", fontSize: "0.8rem",
                letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
                transition: "all 0.2s", display: "inline-block"
              }}
                onMouseEnter={e => e.target.style.background = "#e8c97a"}
                onMouseLeave={e => e.target.style.background = "#c9a84c"}
              >Chat with AI</Link>

              <a href="#about" style={{
                border: "1px solid #2a2a2a", color: "#f0ebe0",
                padding: "0.9rem 2.5rem", fontSize: "0.8rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                transition: "all 0.2s", display: "inline-block"
              }}
                onMouseEnter={e => { e.target.style.borderColor = "#c9a84c"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#2a2a2a"; }}
              >About Me</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)", display: "flex",
            flexDirection: "column", alignItems: "center", gap: "0.5rem",
            color: "#444", fontSize: "0.7rem", letterSpacing: "0.15em"
          }}>
            <span>SCROLL</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #444, transparent)" }} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={{
          padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto"
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem",
            alignItems: "center"
          }}>
            {/* Left */}
            <div>
              <p style={{
                color: "#c9a84c", fontSize: "0.72rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                marginBottom: "1.5rem"
              }}>About Me</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300, lineHeight: 1.1,
                marginBottom: "1.5rem"
              }}>
                Creating the<br />
                <span style={{
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>future, today.</span>
              </h2>
              <p style={{ color: "#777", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                I&apos;m Rocky Chowdhury — passionate about technology, AI, and building digital experiences that make a difference.
              </p>
              <p style={{ color: "#777", lineHeight: 1.8, fontSize: "0.9rem" }}>
                This website is powered by cutting-edge AI technology, allowing you to have real conversations and get instant answers to your questions.
              </p>
            </div>

            {/* Right - Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#1a1a1a" }}>
              {[
                { num: "AI", label: "Powered Chat" },
                { num: "24/7", label: "Available" },
                { num: "Fast", label: "Responses" },
                { num: "100%", label: "Secure Auth" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "#111", padding: "2rem",
                  display: "flex", flexDirection: "column", gap: "0.5rem"
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem", fontWeight: 300,
                    background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>{stat.num}</span>
                  <span style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI CTA SECTION */}
        <section style={{
          padding: "6rem 2rem", background: "#0d0d0d",
          borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a"
        }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <p style={{
              color: "#c9a84c", fontSize: "0.72rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>AI Assistant</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.15
            }}>
              Ask me anything.<br />
              <span style={{
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>I&apos;ll answer instantly.</span>
            </h2>
            <p style={{ color: "#666", marginBottom: "2.5rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
              My AI assistant is powered by Anthropic&apos;s Claude. Ask anything — it&apos;s smart, fast, and always available.
              {!session && " Create a free account to start chatting."}
            </p>
            <Link href={session ? "/chat" : "/register"} style={{
              background: "#c9a84c", color: "#080808",
              padding: "1rem 3rem", fontSize: "0.8rem",
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
              display: "inline-block", transition: "all 0.2s"
            }}
              onMouseEnter={e => e.target.style.background = "#e8c97a"}
              onMouseLeave={e => e.target.style.background = "#c9a84c"}
            >
              {session ? "Open AI Chat →" : "Get Started Free →"}
            </Link>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            color: "#c9a84c", fontSize: "0.72rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: "1.5rem"
          }}>Contact</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300, marginBottom: "1.5rem"
          }}>Get In Touch</h2>
          <p style={{ color: "#666", marginBottom: "2.5rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Want to collaborate or just say hello? Feel free to reach out.
          </p>
          <a href="mailto:rockychowdhury@email.com" style={{
            border: "1px solid #c9a84c", color: "#c9a84c",
            padding: "0.9rem 2.5rem", fontSize: "0.8rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            display: "inline-block", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.target.style.background = "#c9a84c"; e.target.style.color = "#080808"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#c9a84c"; }}
          >rockychowdhury@email.com</a>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: "1px solid #1a1a1a", padding: "2rem",
          textAlign: "center", color: "#333", fontSize: "0.75rem",
          letterSpacing: "0.08em"
        }}>
          © {new Date().getFullYear()} Rocky Chowdhury. Built with Next.js & Claude AI.
        </footer>
      </main>
    </>
  );
}
