import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0c0c0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>
        {/* Logo */}
        <div className="flex items-center gap-1 mb-12">
          <Link
            to="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                color: "#e0e0da",
                letterSpacing: "0.08em",
              }}
            >
              Lexi
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                color: "#2db54e",
                letterSpacing: "0.08em",
              }}
            >
              Core
            </span>
          </Link>
        </div>

        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#e0e0da",
            margin: "0 0 8px 0",
            letterSpacing: "-0.015em",
          }}
        >
          Sign in
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#4e4e48",
            margin: "0 0 40px 0",
          }}
        >
          Continue reading where you left off.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: "#64645e",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#e0e0da",
                  background: "#111114",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "11px 14px",
                  width: "100%",
                  outline: "none",
                  transition: "border-color 0.15s ease",
                  caretColor: "#2db54e",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,78,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: "#64645e",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#3e3e38",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#e0e0da",
                  background: "#111114",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "11px 14px",
                  width: "100%",
                  outline: "none",
                  transition: "border-color 0.15s ease",
                  caretColor: "#2db54e",
                  letterSpacing: "0.1em",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,78,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                fontWeight: 500,
                color: loading ? "rgba(6,6,8,0.6)" : "#060608",
                background: loading ? "#1e7d36" : "#2db54e",
                border: "none",
                padding: "13px",
                width: "100%",
                cursor: loading ? "wait" : "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "8px",
                transition: "background 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      border: "1.5px solid rgba(6,6,8,0.4)",
                      borderTopColor: "rgba(6,6,8,0.8)",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <kbd
                    style={{
                      fontSize: "10px",
                      color: "rgba(6,6,8,0.5)",
                      background: "rgba(6,6,8,0.15)",
                      border: "none",
                      padding: "1px 5px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    ↵
                  </kbd>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div
          className="flex items-center gap-4 my-8"
          style={{ color: "#2e2e32" }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2e2e32",
              letterSpacing: "0.08em",
            }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Register link */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#3e3e38",
            textAlign: "center",
            margin: 0,
          }}
        >
          No account?{" "}
          <Link
            to="/early-access"
            style={{
              color: "#2db54e",
              textDecoration: "none",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Request early access
          </Link>
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </main>
  );
}
