"use client";

import { useState, useEffect, useRef } from "react";

export default function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 500);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Dismiss as soon as HTML + scripts are ready — don't wait for images
    if (document.readyState === "interactive" || document.readyState === "complete") {
      dismiss();
    } else {
      document.addEventListener("DOMContentLoaded", dismiss);
    }

    // Fallback: force dismiss after 4s no matter what
    const fallbackTimer = setTimeout(dismiss, 4000);

    // Show override hint after 2.5s
    const overrideTimer = setTimeout(() => setShowOverride(true), 2500);

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(overrideTimer);
      document.removeEventListener("DOMContentLoaded", dismiss);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fadingOut ? "none" : "all",
      }}
    >
      {/* Blinking cursor + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
        <span
          style={{
            display: "inline-block",
            width: "0.6rem",
            height: "1.1rem",
            background: "#06B6D4",
            animation: "blink 1s step-end infinite",
          }}
        />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#94A3B8",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            animation: "blink 1s step-end infinite",
          }}
        >
          Initializing system...
        </span>
      </div>

      {/* Poor internet override — mounts only after 3.5s from page start */}
      {showOverride && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#94A3B8",
            textAlign: "center",
            background: "#1E293B",
            border: "1px solid rgba(6,182,212,0.4)",
            borderRadius: "0.5rem",
            padding: "0.6rem 1.2rem",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          poor internet,{" "}
          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "monospace",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#06B6D4",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            click
          </button>
          {" "}to see the page
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
