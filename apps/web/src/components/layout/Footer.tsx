"use client";

import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer-root"
      style={{
        background: "rgba(10, 15, 29, 0.85)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text)",
        padding: "4rem 1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Subtle Top Glow Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {/* Top Grid Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Brand & Identity Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  letterSpacing: "-0.03em",
                  color: "#06B6D4",
                }}
              >
                akashdip.
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "4rem",
                  background: "rgba(6, 182, 212, 0.15)",
                  color: "#06B6D4",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
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
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              <a
                href="mailto:contact@akashdipmahapatra.in"
                style={{
                  color: "#38BDF8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
              >
                <span style={{ opacity: 0.7 }}>✉</span> contact@akashdipmahapatra.in
              </a>
              <a
                href="mailto:dev@akashdipmahapatra.in"
                style={{
                  color: "#38BDF8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
              >
                <span style={{ opacity: 0.7 }}>⚡</span> dev@akashdipmahapatra.in
              </a>
              <a
                href="mailto:cloud@akashdipmahapatra.in"
                style={{
                  color: "#38BDF8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
              >
                <span style={{ opacity: 0.7 }}>☁</span> cloud@akashdipmahapatra.in
              </a>
            </div>
          </div>

          {/* Subdomains & Linked Hubs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94A3B8",
                marginBottom: "0.25rem",
              }}
            >
              🌐 SUBDOMAINS & HUBS
            </h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.83rem" }}>
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

          {/* Galleries & About Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94A3B8",
                marginBottom: "0.25rem",
              }}
            >
              🎨 GALLERIES & ARCHIVES
            </h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.83rem" }}>
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
                  <span style={{ ...tagStyle, background: "rgba(59, 130, 246, 0.15)", color: "#60A5FA" }}>Archive</span>
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

          {/* Apps & Social Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94A3B8",
                marginBottom: "0.25rem",
              }}
            >
              🚀 APPS & SOCIAL
            </h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.83rem" }}>
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

        {/* Bottom Copyright & Tech Stack bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
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
  background: "rgba(255, 255, 255, 0.07)",
  color: "var(--color-muted)",
  fontFamily: "var(--font-mono)",
  whiteSpace: "nowrap",
};
