import React, { useState } from "react";

const sections = [
  {
    id: "01",
    title: "Acceptance of terms",
    body: [
      "By creating an account or using LexiCore (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.",
      "We may update these terms from time to time. When we do, we will revise the date at the top of this page and, for material changes, notify you by email at least 14 days in advance.",
    ],
  },
  {
    id: "02",
    title: "The service",
    body: [
      "LexiCore provides a reading environment for learners of Arabic, Russian, and Persian. The Service includes text display, vocabulary annotation, grammar analysis, and reading activity tracking.",
      "The Service is provided for personal, non-commercial use only. You may not use the Service to develop competing products, scrape content at scale, or resell access to others.",
      "We are currently in early access (v0.9). Features may change, and occasional downtime may occur. We do not guarantee uninterrupted availability.",
    ],
  },
  {
    id: "03",
    title: "Your account",
    body: [
      "You are responsible for maintaining the confidentiality of your account credentials. Do not share your password with others.",
      "You must be at least 13 years old to use the Service. By creating an account, you represent that you meet this requirement.",
      "You may not create accounts for others, use false identities, or create multiple accounts to circumvent restrictions.",
    ],
  },
  {
    id: "04",
    title: "Content and intellectual property",
    body: [
      "Texts in the LexiCore library are sourced from public domain works, openly licensed publications, and licensed third-party content. All rights in library texts remain with their respective rights holders.",
      "LexiCore's software, interface design, annotation data, and grammatical analysis are proprietary. You may not copy, modify, distribute, or create derivative works from them without our written permission.",
      "If you upload personal texts to the Service, you retain full ownership of that content. You grant LexiCore a limited, non-exclusive license to process and display your uploaded content solely for the purpose of providing the annotation and reading features.",
    ],
  },
  {
    id: "05",
    title: "Acceptable use",
    body: [
      "You agree not to use the Service to transmit any content that is unlawful, abusive, or that infringes on the rights of others.",
      "You agree not to attempt to probe, scan, or test the vulnerability of the Service, nor to breach any security or authentication measures.",
      "You agree not to use automated tools to access, scrape, or index the Service at a rate exceeding that of a normal human user.",
    ],
  },
  {
    id: "06",
    title: "Subscriptions and billing",
    body: [
      "LexiCore is currently available for free during the early access period. When paid plans are introduced, we will notify all users at least 30 days in advance with clear pricing information.",
      "If you purchase a subscription in the future, you will be billed in advance on a recurring basis. You may cancel at any time; cancellation takes effect at the end of the current billing period.",
      "Refunds are evaluated case by case. If you experience a technical issue that materially prevents you from using the Service, contact us within 14 days of the charge.",
    ],
  },
  {
    id: "07",
    title: "Termination",
    body: [
      "You may delete your account at any time from your account settings. Account deletion is permanent and immediate.",
      "We may suspend or terminate your account if we reasonably believe you have violated these terms, with or without notice depending on the severity of the violation.",
      "Upon termination, your right to use the Service ceases immediately. Provisions of these terms that by their nature should survive termination — including intellectual property, limitation of liability, and dispute resolution — will do so.",
    ],
  },
  {
    id: "08",
    title: "Limitation of liability",
    body: [
      "The Service is provided \"as is\" without warranty of any kind. We make no warranties about accuracy, completeness, or fitness for a particular purpose.",
      "To the maximum extent permitted by law, LexiCore's total liability for any claim arising out of or relating to these terms shall not exceed the amount you paid to us in the twelve months preceding the claim, or USD 50 if you have not made any payments.",
      "We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data or interruption of service.",
    ],
  },
  {
    id: "09",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of the jurisdiction in which LexiCore operates, without regard to conflict of law principles.",
      "Any dispute that cannot be resolved informally shall be submitted to binding arbitration under the rules of a mutually agreed arbitration body, except that either party may seek injunctive relief in a court of competent jurisdiction.",
    ],
  },
];

export function TermsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0f" }}>
      {/* Header */}
      <section
        style={{
          padding: "100px 24px 56px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2db54e",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            [ Legal · Terms of Service ]
          </span>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 300,
              lineHeight: 1.12,
              color: "#e0e0da",
              letterSpacing: "-0.025em",
              margin: "0 0 20px 0",
            }}
          >
            Terms of Service
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#3e3e38",
              margin: 0,
            }}
          >
            These terms govern your use of LexiCore. Last revised:{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e4e48" }}>
              2026-06-12
            </span>
          </p>
        </div>
      </section>

      {/* Two-column layout: TOC + content */}
      <section style={{ padding: "64px 24px 120px" }}>
        <div
          id="terms-layout"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* TOC sidebar */}
          <div
            id="terms-toc"
            style={{
              position: "sticky",
              top: "72px",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#2e2e32",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Contents
            </span>
            <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(s.id);
                  }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: activeSection === s.id ? "#e0e0da" : "#3e3e38",
                    textDecoration: "none",
                    padding: "4px 0 4px 10px",
                    borderLeft: activeSection === s.id
                      ? "1px solid #2db54e"
                      : "1px solid rgba(255,255,255,0.06)",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                    display: "flex",
                    gap: "8px",
                    alignItems: "baseline",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== s.id) e.currentTarget.style.color = "#64645e";
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== s.id) e.currentTarget.style.color = "#3e3e38";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      color: "#2e2e32",
                      flexShrink: 0,
                    }}
                  >
                    {s.id}
                  </span>
                  {s.title.charAt(0).toUpperCase() + s.title.slice(1)}
                </a>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {sections.map((s, i) => (
              <div
                key={s.id}
                id={`section-${s.id}`}
                style={{
                  paddingBottom: "48px",
                  marginBottom: i < sections.length - 1 ? "0" : "0",
                  borderBottom: i < sections.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                  marginBottom2: "48px",
                }}
              >
                <div
                  className="flex items-center gap-3"
                  style={{ marginBottom: "16px", paddingTop: i > 0 ? "48px" : "0" }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#2db54e",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.id}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: "#c4c4be",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      textTransform: "capitalize",
                    }}
                  >
                    {s.title}
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        lineHeight: 1.85,
                        color: "#4e4e48",
                        margin: 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact block */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "40px",
                marginTop: "8px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#c4c4be",
                  margin: "0 0 10px 0",
                }}
              >
                Questions?
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#4e4e48",
                  margin: 0,
                }}
              >
                Contact us at{" "}
                <a
                  href="mailto:legal@lexicore.app"
                  style={{
                    color: "#2db54e",
                    textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                  }}
                >
                  legal@lexicore.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive: hide TOC on narrow screens */}
      <style>{`
        @media (max-width: 640px) {
          #terms-layout { grid-template-columns: 1fr !important; }
          #terms-toc { display: none !important; }
        }
      `}</style>
    </main>
  );
}
