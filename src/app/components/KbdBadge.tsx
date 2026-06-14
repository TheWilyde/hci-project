import React from "react";

interface KbdBadgeProps {
  keys: string[];
  label: string;
}

export function KbdBadge({ keys, label }: KbdBadgeProps) {
  return (
    <span
      className="flex items-center gap-1.5"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {keys.map((k, i) => (
        <React.Fragment key={k}>
          <kbd
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 500,
              color: "#9a9a94",
              background: "#1a1a1d",
              border: "1px solid rgba(255,255,255,0.12)",
              borderBottom: "2px solid rgba(255,255,255,0.08)",
              padding: "1px 6px",
              minWidth: "22px",
              fontFamily: "'JetBrains Mono', monospace",
              lineHeight: "1.6",
            }}
          >
            {k}
          </kbd>
          {i < keys.length - 1 && (
            <span style={{ fontSize: "10px", color: "#3e3e38" }}>/</span>
          )}
        </React.Fragment>
      ))}
      <span
        style={{
          fontSize: "11px",
          color: "#64645e",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </span>
  );
}
