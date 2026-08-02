"use client";

import React, { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <footer
      className="footer-root"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 95%, var(--color-surface))",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text)",
        padding: "3.5rem 1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <style>{`
        @keyframes edge-glow-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.5rem;
        }

        @media (min-width: 641px) {
          .mobile-expand-bar {
            display: none !important;
          }
          .mobile-collapsible-content {
            display: contents !important;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .mobile-collapsible-content {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            max-height: 125px;
            overflow: hidden;
            position: relative;
            transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-collapsible-content.expanded {
            max-height: 2500px;
          }

          .mobile-collapsible-content:not(.expanded)::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 95px;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              color-mix(in srgb, var(--color-bg) 75%, transparent) 50%,
              var(--color-bg) 100%
            );
            backdrop-filter: blur(2px);
            pointer-events: none;
          }

          .mobile-expand-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.75rem 0 1rem 0;
          }

          .mobile-expand-btn {
            background: var(--color-surface);
            border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
            border-radius: 2rem;
            padding: 0.45rem 1.25rem;
            color: var(--color-accent);
            font-family: var(--font-mono);
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            box-shadow: 0 4px 15px color-mix(in srgb, var(--color-border) 60%, transparent);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .mobile-expand-btn::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent);
            background-size: 200% 100%;
            animation: edge-glow-sweep 3s linear infinite;
            pointer-events: none;
          }

          .double-v-icon {
            display: inline-flex;
            transition: transform 0.3s ease;
          }

          .double-v-icon.open {
            transform: rotate(180deg);
          }
        }
      `}</style>

      {/* Decorative Subtle Top Glow Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 40%, transparent), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {/* Main Grid Container */}
        <div className="footer-grid">
          {/* Column 1: Brand & Identity */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  letterSpacing: "-0.03em",
                  color: "var(--color-accent)",
                }}
              >
                akashdip.
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "4rem",
                  background: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                  color: "var(--color-accent)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                LIVE
              </span>
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              Data Engineer & Cloud Automation Specialist. Building unbreakable, scalable enterprise cloud systems and intelligent agentic AI solutions.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                marginTop: "0.25rem",
                fontSize: "0.78rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              <a
                href="mailto:contact@akashdipmahapatra.in"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span style={{ opacity: 0.7 }}>✉</span> contact@akashdipmahapatra.in
              </a>
              <a
                href="mailto:dev@akashdipmahapatra.in"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span style={{ opacity: 0.7 }}>⚡</span> dev@akashdipmahapatra.in
              </a>
              <a
                href="mailto:cloud@akashdipmahapatra.in"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span style={{ opacity: 0.7 }}>☁</span> cloud@akashdipmahapatra.in
              </a>
            </div>
          </div>

          {/* Columns 2, 3, 4 Wrapper (Collapsible on Mobile, display:contents on Desktop) */}
          <div className={`mobile-collapsible-content ${isMobileExpanded ? "expanded" : ""}`}>
            {/* Column 2: Subdomains & Linked Hubs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <h4 style={headingStyle}>🌐 SUBDOMAINS & HUBS</h4>
              <ul style={listStyle}>
                <li>
                  <a href="https://social.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>social.akashdipmahapatra.in</span>
                    <span style={tagStyle}>Linktree</span>
                  </a>
                </li>
                <li>
                  <a href="https://websites.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>websites.akashdipmahapatra.in</span>
                    <span style={tagStyle}>Directory</span>
                  </a>
                </li>
                <li>
                  <a href="https://college-final-year-project.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>college-final-year-project.akashdipmahapatra.in</span>
                  </a>
                </li>
                <li>
                  <a href="https://edm.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>edm.akashdipmahapatra.in</span>
                    <span style={tagStyle}>Research</span>
                  </a>
                </li>
                <li>
                  <a href="https://electroplating.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>electroplating.akashdipmahapatra.in</span>
                    <span style={tagStyle}>Research</span>
                  </a>
                </li>
                <li>
                  <a href="https://linktree.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>linktree.akashdipmahapatra.in</span>
                    <span style={tagStyle}>Netlify</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Galleries & Archives */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <h4 style={headingStyle}>🎨 GALLERIES & ARCHIVES</h4>
              <ul style={listStyle}>
                <li>
                  <a href="https://college-gallery.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>college-gallery.akashdipmahapatra.in</span>
                    <span style={tagStyle}>2021-25</span>
                  </a>
                </li>
                <li>
                  <a href="https://school-gallery.akashdipmahapatra.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>school-gallery.akashdipmahapatra.in</span>
                    <span style={tagStyle}>School</span>
                  </a>
                </li>
                <li>
                  <a href="/college-projects" style={linkStyle}>
                    <span>/college-projects (IT & IoT)</span>
                    <span style={{ ...tagStyle, background: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent)" }}>Archive</span>
                  </a>
                </li>
                <li>
                  <a href="https://akashdip2001.github.io/website-2/my-Gallery.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>Early School Art Gallery (Class 1-10)</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtu.be/IkcPfEoTvcs" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>Presidential Award Video (2012)</span>
                    <span style={{ ...tagStyle, background: "rgba(239, 68, 68, 0.15)", color: "#F87171" }}>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Apps & Social Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <h4 style={headingStyle}>🚀 APPS & SOCIAL</h4>
              <ul style={listStyle}>
                <li>
                  <a href="/skyassure-ai" style={linkStyle}>
                    <span>/skyassure-ai (Airline Refund AI)</span>
                    <span style={{ ...tagStyle, background: "rgba(16, 185, 129, 0.15)", color: "#34D399" }}>AI Hackathon</span>
                  </a>
                </li>
                <li>
                  <a href="/tcs-ai-hackathon" style={linkStyle}>
                    <span>/tcs-ai-hackathon</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/AkashdipMahapatra-BA" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>GitHub (@AkashdipMahapatra-BA)</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/akashdip2001" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>GitHub (@akashdip2001)</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/akashdipmahapatra" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>LinkedIn Profile</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/playlist?list=PL_RecMEcs_p__J3GSHkKfLjC08q0NmWtR" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <span>CAD & 3D YouTube Playlist</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Double "v" Expand Button Bar */}
        <div className="mobile-expand-bar">
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="mobile-expand-btn"
          >
            <span>{isMobileExpanded ? "SHOW LESS" : "EXPLORE ALL SUBDOMAINS & LINKS"}</span>
            <div className={`double-v-icon ${isMobileExpanded ? "open" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 7 12 12 17 7" />
                <polyline points="7 13 12 18 17 13" />
              </svg>
            </div>
          </button>
        </div>

        {/* Bottom Copyright & Navigation Bar — Always Visible */}
        <div
          id="footer-copyright"
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>
            © {currentYear} Akashdip Mahapatra. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="#hero" style={{ color: "var(--color-muted)", textDecoration: "none" }}>Back to top ↑</a>
            <span>•</span>
            <span>Built with Next.js 15 · Neo4j GraphRAG · Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--color-muted)",
  marginBottom: "0.25rem",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  fontSize: "0.83rem",
};

const linkStyle: React.CSSProperties = {
  color: "var(--color-text)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  opacity: 0.85,
  transition: "all 0.2s ease",
  wordBreak: "break-all",
};

const tagStyle: React.CSSProperties = {
  fontSize: "0.62rem",
  padding: "0.08rem 0.35rem",
  borderRadius: "0.25rem",
  background: "var(--color-border)",
  color: "var(--color-muted)",
  fontFamily: "var(--font-mono)",
  whiteSpace: "nowrap",
};
