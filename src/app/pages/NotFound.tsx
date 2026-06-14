import React from "react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0c0c0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#2db54e",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "20px",
        }}
      >
        [ 404 ]
      </span>
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.2,
          color: "#e0e0da",
          letterSpacing: "-0.02em",
          margin: "0 0 16px 0",
        }}
      >
        Page not found.
      </h1>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#4e4e48",
          margin: "0 0 40px 0",
        }}
      >
        The text you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          fontWeight: 500,
          color: "#060608",
          background: "#2db54e",
          textDecoration: "none",
          padding: "11px 24px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
