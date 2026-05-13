import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(8,8,8,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid #1f1f1f",
      padding: "0 2rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <Link href="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.4rem", fontWeight: 600,
        background: "linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        Rocky Chowdhury
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {[
          { href: "/", label: "Home" },
          { href: "/chat", label: "AI Chat" },
          { href: "/#about", label: "About" },
          { href: "/#contact", label: "Contact" },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            color: "#888", fontSize: "0.8rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            transition: "color 0.2s"
          }}
            onMouseEnter={e => e.target.style.color = "#c9a84c"}
            onMouseLeave={e => e.target.style.color = "#888"}
          >{link.label}</Link>
        ))}

        {session ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#888", fontSize: "0.78rem" }}>
              {session.user.name || session.user.email}
            </span>
            <button onClick={() => signOut({ callbackUrl: "/" })} style={{
              background: "transparent", border: "1px solid #2a2a2a",
              color: "#888", padding: "0.4rem 1rem",
              fontSize: "0.75rem", letterSpacing: "0.08em",
              textTransform: "uppercase", transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#c9a84c"; e.target.style.color = "#c9a84c"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#2a2a2a"; e.target.style.color = "#888"; }}
            >Sign Out</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/login" style={{
              border: "1px solid #2a2a2a", color: "#888",
              padding: "0.4rem 1rem", fontSize: "0.75rem",
              letterSpacing: "0.08em", textTransform: "uppercase"
            }}>Login</Link>
            <Link href="/register" style={{
              background: "#c9a84c", color: "#080808",
              padding: "0.4rem 1rem", fontSize: "0.75rem",
              letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600
            }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
