import React from "react";

const sections = [
  {
    id: "01",
    title: "What we collect",
    body: [
      "When you create an account, we store your email address and a hashed password. We do not store plaintext passwords.",
      "We record which texts you have opened, how many lines you have read, and which vocabulary items you have hovered — collectively called your Reading Activity. This data is used exclusively to surface your reading history and is never sold or shared with third parties.",
      "We do not collect your device fingerprint, install analytics SDKs, or run third-party tracking pixels on any page of LexiCore.",
    ],
  },
  {
    id: "02",
    title: "What we do not collect",
    body: [
      "We do not collect your name, phone number, date of birth, or any demographic information.",
      "We do not use advertising networks. There are no ad tracking cookies on this site.",
      "We do not sell, rent, or trade your personal data to any third party under any commercial arrangement.",
    ],
  },
  {
    id: "03",
    title: "Cookies and local storage",
    body: [
      "We use a single session cookie to keep you signed in. This cookie is HTTP-only, Secure, and expires after 30 days of inactivity.",
      "We use browser localStorage to store your reading position, UI preferences (focus mode, transliteration state), and shortcut configuration. This data never leaves your device.",
      "We do not use third-party cookies.",
    ],
  },
  {
    id: "04",
    title: "Data retention",
    body: [
      "Your account and all associated Reading Activity is retained for as long as your account is active.",
      "You may request full deletion of your account and all associated data at any time by emailing privacy@lexicore.app. Deletion is processed within 7 business days.",
      "Anonymized, aggregate usage statistics (e.g. which texts are most read) may be retained indefinitely after account deletion. These statistics cannot be used to identify you.",
    ],
  },
  {
    id: "05",
    title: "Third-party services",
    body: [
      "LexiCore uses a cloud database provider to store account data and reading activity. This provider processes data under a Data Processing Agreement that prohibits them from using your data for any purpose other than storage.",
      "We use a transactional email provider to send account-related emails (password reset, account confirmation). Your email address is shared with this provider solely for this purpose.",
      "No other third-party services receive your personal data.",
    ],
  },
  {
    id: "06",
    title: "Your rights",
    body: [
      "You have the right to access all personal data we hold about you. Submit a request to privacy@lexicore.app and we will respond within 30 days.",
      "You have the right to correct inaccurate data, restrict processing, or object to processing of your personal data.",
      "If you are located in the European Economic Area, you have additional rights under the GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.",
    ],
  },
  {
    id: "07",
    title: "Changes to this policy",
    body: [
      "We will notify you by email at least 14 days before any material change to this privacy policy takes effect.",
      "The date of the most recent revision is shown at the top of this page. Continued use of LexiCore after a change is effective constitutes acceptance of the revised policy.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0f" }}>
      {/* Header */}
      <section
        style={{
          padding: "100px 24px 56px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
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
            [ Legal · Privacy Policy ]
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
            Privacy Policy
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
            We built LexiCore for readers, not advertisers. This policy is written in plain language.
            Last revised:{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e4e48" }}>
              2026-06-12
            </span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "64px 24px 120px" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {sections.map((s, i) => (
            <div
              key={s.id}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "28px",
                paddingBottom: "48px",
                marginBottom: "0",
              }}
            >
              {/* Index + vertical rule */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", paddingTop: "3px" }}>
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
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    background: i < sections.length - 1 ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                />
              </div>

              {/* Text */}
              <div>
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: "#c4c4be",
                    margin: "0 0 16px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h2>
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
            </div>
          ))}

          {/* Contact block */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "40px",
              marginTop: "8px",
              display: "grid",
              gridTemplateColumns: "40px 1fr",
              gap: "28px",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#2e2e32",
                letterSpacing: "0.08em",
                paddingTop: "3px",
              }}
            >
              ✉
            </span>
            <div>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: "#c4c4be",
                  margin: "0 0 10px 0",
                }}
              >
                Contact
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
                Privacy questions and data requests:{" "}
                <a
                  href="mailto:privacy@lexicore.app"
                  style={{
                    color: "#2db54e",
                    textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                  }}
                >
                  privacy@lexicore.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
