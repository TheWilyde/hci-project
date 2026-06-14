import React from "react";
import { Link } from "react-router";

const footerLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "GitHub", to: "https://github.com", external: true },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "40px 24px",
        background: "#0c0c0f",
      }}
    >
      <div
        className="flex items-center justify-between flex-wrap gap-4"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <div className="flex items-center gap-2">
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#3e3e38",
                letterSpacing: "0.08em",
              }}
            >
              LEXI
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#2db54e",
                letterSpacing: "0.08em",
              }}
            >
              CORE
            </span>
          </Link>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2e2e32",
              letterSpacing: "0.04em",
            }}
          >
            · v0.9
          </span>
        </div>

        <div className="flex items-center gap-6">
          {footerLinks.map(({ label, to, external }) =>
            external ? (
              <a
                key={label}
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#3e3e38",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#3e3e38",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
              >
                {label}
              </Link>
            )
          )}
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "#2e2e32",
            letterSpacing: "0.04em",
          }}
        >
          © 2026 LexiCore
        </span>
      </div>
    </footer>
  );
}
