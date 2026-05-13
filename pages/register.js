import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError(result.error); setLoading(false); }
      else router.push("/chat");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem",
    background: "#0d0d0d", border: "1px solid #2a2a2a",
    color: "#f0ebe0", fontSize: "0.875rem",
    outline: "none", transition: "border-color 0.2s", fontFamily: "inherit"
  };

  return (
    <>
      <Head><title>Create Account — Rocky Chowdhury</title></Head>
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "2rem",
        background: "radial-gradient(ellipse at top, #0f0d08 0%, #080808 60%)"
      }}>
        <div style={{
          width: "100%", maxWidth: "420px",
          border: "1px solid #1f1f1f", padding: "3rem",
          background: "#0d0d0d", animation: "fadeIn 0.5s ease"
        }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Link href="/" style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600,
              background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>Rocky Chowdhury</Link>
            <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.5rem", letterSpacing: "0.08em" }}>CREATE YOUR FREE ACCOUNT</p>
          </div>

          {error && (
            <div style={{ background: "rgba(224,82,82,0.1)", border: "1px solid rgba(224,82,82,0.3)", color: "#e05252", padding: "0.75rem 1rem", fontSize: "0.8rem", marginBottom: "1.5rem" }}>{error}</div>
          )}

          <button onClick={() => signIn("google", { callbackUrl: "/chat" })} style={{
            width: "100%", padding: "0.85rem", background: "transparent",
            border: "1px solid #2a2a2a", color: "#f0ebe0", fontSize: "0.8rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.75rem", marginBottom: "1.5rem", cursor: "pointer", transition: "all 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a84c"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2a2a"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign Up with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "#1f1f1f" }} />
            <span style={{ color: "#444", fontSize: "0.72rem", letterSpacing: "0.1em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#1f1f1f" }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "#555", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Rocky Chowdhury" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "#555", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", color: "#555", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters" required minLength={6} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e => e.target.style.borderColor = "#2a2a2a"} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.9rem",
              background: loading ? "#8a6f2e" : "#c9a84c",
              color: "#080808", border: "none", fontSize: "0.8rem",
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
              cursor: loading ? "wait" : "pointer"
            }}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#444", fontSize: "0.78rem", marginTop: "2rem" }}>
            Already have an account? <Link href="/login" style={{ color: "#c9a84c" }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) return { redirect: { destination: "/chat", permanent: false } };
  return { props: {} };
}
