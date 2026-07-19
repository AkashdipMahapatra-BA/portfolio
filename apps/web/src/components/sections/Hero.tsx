"use client";

import { useEffect, useRef } from "react";

const FULL_TEXT = "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist";

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      el.textContent = FULL_TEXT.slice(0, i + 1);
      i++;
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "calc(100vh - 3.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "52rem", width: "100%" }}>

        {/* Terminal window chrome */}
        <div className="card" style={{ overflow: "hidden" }}>

          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1rem",
              borderBottom: "1px solid var(--color-border)",
              background: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
            <span
              style={{
                marginLeft: "0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
              }}
            >
              ~/portfolio — zsh
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "1.75rem 1.75rem 2rem" }}>

            {/* Prompt line */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-muted)",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>akashdip@cloud</span>
              <span style={{ color: "var(--color-muted)" }}>:</span>
              <span style={{ color: "#818CF8" }}>~</span>
              <span style={{ color: "var(--color-muted)" }}> $ </span>
              <span>whoami</span>
            </p>

            {/* Typewriter name */}
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>▶ </span>
              <span ref={typedRef} />
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  background: "var(--color-accent)",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-muted)",
                lineHeight: 1.75,
                maxWidth: "44rem",
                marginBottom: "2rem",
              }}
            >
              Building unbreakable, scalable systems. Transitioned from Mechanical Engineering
              to engineering enterprise cloud pipelines and Agentic AI.
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <a href="/Akashdip_Mahapatra_CV.pdf" download className="btn-accent" style={{ textDecoration: "none" }}>
                ↓ Download CV
              </a>
              <a
                href="#experience"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                  paddingBottom: "1px",
                  transition: "opacity 0.2s",
                }}
              >
                View Experience →
              </a>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <p
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            letterSpacing: "0.1em",
            opacity: 0.6,
          }}
        >
          scroll to explore ↓
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
