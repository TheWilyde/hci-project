import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Features", to: "/features" },
    { label: "Methodology", to: "/methodology" },
    { label: "Library", to: "/library" },
    { label: "Sign In", to: "/signin" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 transition-all duration-300"
        style={{
          height: "56px",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          background: scrolled || menuOpen ? "rgba(12,12,15,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1px", zIndex: 60 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#e0e0da", letterSpacing: "0.08em", textTransform: "uppercase" }}>Lexi</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#2db54e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Core</span>
          <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: "#2db54e", marginLeft: "3px", animation: "pulse-dot 2.4s ease-in-out infinite" }} />
        </Link>

        {/* Desktop links */}
        <div className="items-center gap-6 hidden md:flex">
          {[{ label: "Features", to: "/features" }, { label: "Methodology", to: "/methodology" }].map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: isActive ? "#e0e0da" : "#64645e",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                  letterSpacing: "0.02em",
                  borderBottom: isActive ? "1px solid rgba(45,181,78,0.5)" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e0e0da")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#e0e0da" : "#64645e")}
              >
                {label}
              </Link>
            );
          })}

          <Link
            to="/library"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 500,
              color: "#9a9a94",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "5px 12px",
              transition: "all 0.15s ease",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#e0e0da"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#9a9a94"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            Library
          </Link>

          <Link
            to="/signin"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 500,
              color: "#2db54e",
              textDecoration: "none",
              border: "1px solid rgba(45,181,78,0.35)",
              padding: "5px 12px",
              transition: "all 0.15s ease",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(45,181,78,0.1)"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(45,181,78,0.35)"; }}
          >
            Sign In
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", zIndex: 60 }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "20px", height: "1px", background: "#e0e0da", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "20px", height: "1px", background: "#e0e0da", transition: "opacity 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "20px", height: "1px", background: "#e0e0da", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          top: "56px",
          left: 0,
          right: 0,
          background: "rgba(12,12,15,0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 40,
          overflow: "hidden",
          maxHeight: menuOpen ? "300px" : "0",
          transition: "max-height 0.25s ease",
        }}
      >
        <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                style={{
                  fontFamily: label === "Sign In" ? "'JetBrains Mono', monospace" : "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: isActive ? "#2db54e" : "#9a9a94",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "color 0.15s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
