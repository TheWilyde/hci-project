import React, { useState } from "react";
import { Link } from "react-router";

const languages = [
  { id: "arabic", label: "Arabic", script: "العربية" },
  { id: "russian", label: "Russian", script: "Русский" },
  { id: "persian", label: "Persian", script: "فارسی" },
];

const levels = [
  { id: "beginner", label: "Beginner", desc: "I can read the script slowly" },
  { id: "intermediate", label: "Intermediate", desc: "I read basic texts with help" },
  { id: "advanced", label: "Advanced", desc: "I read native content regularly" },
];

type Step = "form" | "done";

export function EarlyAccessPage() {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleLang = (id: string) =>
    setSelectedLangs((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (selectedLangs.length === 0) e.langs = "Select at least one language";
    if (!selectedLevel) e.level = "Select your level";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1000);
  };

  if (step === "done") {
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
        <div style={{ maxWidth: "420px", width: "100%", textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid rgba(45,181,78,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <span style={{ color: "#2db54e", fontSize: "18px" }}>✓</span>
          </div>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "22px",
              fontWeight: 300,
              lineHeight: 1.2,
              color: "#e0e0da",
              letterSpacing: "-0.015em",
              margin: "0 0 14px 0",
            }}
          >
            You're on the list.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#4e4e48",
              margin: "0 0 36px 0",
            }}
          >
            We'll email{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9a9a94", fontSize: "12px" }}>
              {email}
            </span>{" "}
            when your access is ready. Expect to hear from us within a few weeks.
          </p>
          <Link
            to="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "#3e3e38",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.15s ease",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0c0c0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Header */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1px", marginBottom: "40px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 500, color: "#e0e0da", letterSpacing: "0.08em" }}>Lexi</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 500, color: "#2db54e", letterSpacing: "0.08em" }}>Core</span>
        </Link>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "#2db54e",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "16px",
          }}
        >
          [ Early Access ]
        </span>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "22px",
            fontWeight: 300,
            lineHeight: 1.2,
            color: "#e0e0da",
            letterSpacing: "-0.015em",
            margin: "0 0 10px 0",
          }}
        >
          Request access
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#4e4e48",
            margin: "0 0 36px 0",
          }}
        >
          We're admitting readers in small batches. Tell us what you're studying.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Email */}
            <div>
              <label
                htmlFor="ea-email"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64645e", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}
              >
                Email
              </label>
              <input
                id="ea-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: "" })); }}
                placeholder="you@example.com"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#e0e0da",
                  background: "#111114",
                  border: `1px solid ${errors.email ? "rgba(192,57,43,0.6)" : "rgba(255,255,255,0.09)"}`,
                  padding: "11px 14px",
                  width: "100%",
                  outline: "none",
                  caretColor: "#2db54e",
                  transition: "border-color 0.15s ease",
                }}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "rgba(45,181,78,0.5)"; }}
                onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
              />
              {errors.email && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#c0392b", margin: "6px 0 0", letterSpacing: "0.04em" }}>{errors.email}</p>}
            </div>

            {/* Language selection */}
            <div>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64645e", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                Language(s) you're studying
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {languages.map((lang) => {
                  const selected = selectedLangs.includes(lang.id);
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => { toggleLang(lang.id); setErrors((er) => ({ ...er, langs: "" })); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        background: selected ? "rgba(45,181,78,0.07)" : "#111114",
                        border: `1px solid ${selected ? "rgba(45,181,78,0.4)" : "rgba(255,255,255,0.07)"}`,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: "14px",
                            height: "14px",
                            border: `1px solid ${selected ? "#2db54e" : "rgba(255,255,255,0.2)"}`,
                            background: selected ? "#2db54e" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.15s ease",
                          }}
                        >
                          {selected && <span style={{ color: "#060608", fontSize: "9px", fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: selected ? "#e0e0da" : "#64645e" }}>{lang.label}</span>
                      </div>
                      <span style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: lang.id === "russian" ? "14px" : "17px", color: selected ? "#2db54e" : "#2e2e32", direction: lang.id !== "russian" ? "rtl" : "ltr" }}>
                        {lang.script}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.langs && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#c0392b", margin: "6px 0 0", letterSpacing: "0.04em" }}>{errors.langs}</p>}
            </div>

            {/* Level */}
            <div>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64645e", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                Your level
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {levels.map((lv) => {
                  const selected = selectedLevel === lv.id;
                  return (
                    <button
                      key={lv.id}
                      type="button"
                      onClick={() => { setSelectedLevel(lv.id); setErrors((er) => ({ ...er, level: "" })); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 14px",
                        background: selected ? "rgba(45,181,78,0.07)" : "#111114",
                        border: `1px solid ${selected ? "rgba(45,181,78,0.4)" : "rgba(255,255,255,0.07)"}`,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: `1px solid ${selected ? "#2db54e" : "rgba(255,255,255,0.2)"}`,
                          borderRadius: "50%",
                          background: selected ? "#2db54e" : "transparent",
                          flexShrink: 0,
                          transition: "all 0.15s ease",
                        }}
                      />
                      <div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: selected ? "#e0e0da" : "#64645e", display: "block" }}>{lv.label}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#3e3e38" }}>{lv.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.level && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#c0392b", margin: "6px 0 0", letterSpacing: "0.04em" }}>{errors.level}</p>}
            </div>

            {/* Optional referral */}
            <div>
              <label
                htmlFor="ea-referral"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64645e", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}
              >
                How did you hear about us?{" "}
                <span style={{ color: "#2e2e32" }}>(optional)</span>
              </label>
              <input
                id="ea-referral"
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="Reddit, a friend, Hacker News..."
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#e0e0da",
                  background: "#111114",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "11px 14px",
                  width: "100%",
                  outline: "none",
                  caretColor: "#2db54e",
                  transition: "border-color 0.15s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,78,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
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
                transition: "background 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: "10px", height: "10px", border: "1.5px solid rgba(6,6,8,0.3)", borderTopColor: "rgba(6,6,8,0.8)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Submitting...
                </>
              ) : "Request Access"}
            </button>
          </div>
        </form>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#2e2e32", margin: "20px 0 0", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "#4e4e48", textDecoration: "none" }}>Sign in</Link>
        </p>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  );
}
