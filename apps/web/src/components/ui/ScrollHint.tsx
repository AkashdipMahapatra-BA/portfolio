"use client";
import { useState, useEffect } from "react";

export default function ScrollHint() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("hasSeenProjectScroll")) return;

    const onScroll = () => {
      const section = document.getElementById("projects");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Show when the projects section top is within 100px of viewport top
      if (rect.top <= 100 && rect.top >= -200) {
        setIsVisible(true);
        window.removeEventListener("scroll", onScroll);
        setTimeout(() => {
          setIsVisible(false);
          localStorage.setItem("hasSeenProjectScroll", "true");
        }, 4000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
      }}
    >
      {/* Glass panel */}
      <div
        style={{
          background: "color-mix(in srgb, var(--color-surface) 75%, transparent)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid color-mix(in srgb, var(--color-border) 60%, transparent)",
          borderRadius: "1.25rem",
          padding: "1.75rem 2.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--color-accent)",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          How to navigate
        </span>

        {/* Gesture row */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>

          {/* ── Mobile: thumb swipe up ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ position: "relative", width: "52px", height: "64px" }}>
              {/* Arrow going up */}
              <svg
                width="16" height="36"
                viewBox="0 0 16 36"
                style={{
                  position: "absolute",
                  left: "4px",
                  top: "4px",
                  color: "var(--color-accent)",
                }}
                className="animate-swipe-up"
              >
                <line x1="8" y1="34" x2="8" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <polyline points="2,10 8,2 14,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Hand / thumb SVG — outline style like the screenshots */}
              <svg
                width="38" height="44"
                viewBox="0 0 38 44"
                fill="none"
                style={{ position: "absolute", right: 0, bottom: 0 }}
              >
                <path
                  d="M10 38 C6 38 4 35 4 32 L4 18 C4 15 6 13 9 13 L9 8 C9 5.5 11 4 13 4 C15 4 17 5.5 17 8 L17 13 C18.5 12 20.5 12.5 21.5 14 C22.5 12.5 24.5 12.5 25.5 14.5 C26.5 13 28.5 13.5 29 15.5 L29 28 C29 33 26 38 21 38 Z"
                  stroke="var(--color-text)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M17 13 L17 20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M21.5 14 L21.5 20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M25.5 14.5 L25.5 20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--color-muted)", textAlign: "center", letterSpacing: "0.05em" }}>
              SWIPE UP
            </span>
          </div>

          {/* OR divider */}
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            opacity: 0.5,
            fontStyle: "italic",
          }}>or</span>

          {/* ── Desktop: mouse scroll wheel ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ position: "relative", width: "52px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Mouse body */}
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
                {/* Outer shell */}
                <rect x="2" y="2" width="28" height="44" rx="14" stroke="var(--color-text)" strokeWidth="2" />
                {/* Left/right button divider */}
                <line x1="16" y1="2" x2="16" y2="18" stroke="var(--color-text)" strokeWidth="1.5" />
                {/* Scroll wheel */}
                <rect
                  x="13" y="10" width="6" height="10" rx="3"
                  fill="var(--color-accent)"
                  className="animate-scroll-wheel"
                />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--color-muted)", textAlign: "center", letterSpacing: "0.05em" }}>
              SCROLL DOWN
            </span>
          </div>

        </div>

        {/* Caption */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-muted)",
          textAlign: "center",
          maxWidth: "220px",
          lineHeight: 1.6,
        }}>
          Scroll vertically — projects move sideways automatically
        </span>

      </div>
    </div>
  );
}
