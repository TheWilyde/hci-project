import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import { GlobalSearch } from "../components/GlobalSearch";
import { OnboardingModal } from "../components/OnboardingModal";

export function AppLayout() {
  const location = useLocation();
  const inReader = location.pathname.startsWith("/library/") && location.pathname !== "/library";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0d", color: "#e0e0da", minHeight: "100vh" }}>
      {/* Minimal top bar shown only on library index, not in reader (reader has its own bar) */}
      {!inReader && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: "52px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            background: "rgba(10,10,13,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1px" }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 500, color: "#e0e0da", letterSpacing: "0.08em" }}>Lexi</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 500, color: "#2db54e", letterSpacing: "0.08em" }}>Core</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/library"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#64645e",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderBottom: "1px solid #2db54e",
                paddingBottom: "1px",
              }}
            >
              Library
            </Link>
            <Link
              to="/signin"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#3e3e38",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
      <Outlet />
      <GlobalSearch />
      <OnboardingModal />
    </div>
  );
}
