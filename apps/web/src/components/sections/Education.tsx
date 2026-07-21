"use client";

import { useState } from "react";


/* ─── Data ───────────────────────────────────────────────────────────────── */
interface Certification {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  badgeImage?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-cp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badgeImage: "/badges/aws-cloud-practitioner.png",
  },
  {
    id: "az-net",
    title: "Azure Network Engineer Associate",
    issuer: "Microsoft",
    badgeImage: "/badges/azure-network-engineer.png",
  },
  {
    id: "gcp-cdl",
    title: "Professional Cloud Digital Leader",
    issuer: "Google Cloud",
    badgeImage: "/badges/gcp-digital-leader.png",
  },
  {
    id: "oci-fa",
    title: "OCI Foundations & AI Associate",
    issuer: "Oracle Cloud Infrastructure",
    badgeImage: "/badges/oracle-certifications.png",
  },
  {
    id: "finops",
    title: "FinOps Certified Engineer",
    issuer: "FinOps Foundation",
    badgeImage: "/badges/finops-engineer.png",
  },
  {
    id: "gh-security",
    title: "GitHub Advanced Security",
    issuer: "GitHub",
    badgeImage: "/badges/github-security.png",
  },
  {
    id: "gh-actions",
    title: "GitHub Actions",
    issuer: "GitHub",
    badgeImage: "/badges/github-actions.png",
  },
  {
    id: "nasa",
    title: "NASA Open Science 101",
    issuer: "NASA",
    period: "September 2024",
    badgeImage: "/badges/nasa-open-science.png",
  },
];

/* ─── Shimmer Button ────────────────────────────────────────────────────── */
const shimmerStyles = `
  @keyframes shimmer-btn {
    0%     { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    20%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    20.01% { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    33%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    33.01% { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    44%    { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    44.01% { opacity: 0; }
    100%   { opacity: 0; transform: translateX(-150%) skewX(-20deg); }
  }
  @keyframes shimmer-btn-2 {
    0%     { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
    20%    { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
    20.01% { opacity: 1; }
    33%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    33.01% { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    44%    { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    44.01% { opacity: 0; }
    100%   { opacity: 0; transform: translateX(-150%) skewX(-20deg); }
  }
  .edu-btn-row {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
    margin-top: 1rem;
    align-items: center;
  }
  .edu-btn {
    white-space: nowrap;
  }
  .pub-btn-row {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1rem;
  }
  @media (max-width: 600px) {
    .edu-btn-row,
    .pub-btn-row {
      flex-direction: column;
      align-items: stretch;
    }
    .edu-btn {
      width: 100% !important;
      justify-content: center;
      white-space: normal;
      text-align: center;
    }
  }
`;

function ShimmerButton({
  href, label, external, accent, delay, paused, onHoverChange,
}: {
  href: string;
  label: string;
  external?: boolean;
  accent: "slate" | "red";
  delay: number;
  paused: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isRed = accent === "red";
  const shimmerState = paused ? "paused" : "running";

  const handleEnter = () => { setHovered(true); onHoverChange(true); };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setHovered(false);
    onHoverChange(false);
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="edu-btn"
      style={{
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.45rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.72rem",
        fontWeight: 500,
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.02em",
        userSelect: "none",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: hovered
          ? (isRed ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.1)")
          : (isRed ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.05)"),
        border: `1px solid ${isRed ? "rgba(220,38,38,0.35)" : "rgba(255,255,255,0.12)"}`,
        color: hovered ? (isRed ? "#fecaca" : "#fff") : (isRed ? "#fca5a5" : "#cbd5e1"),
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        transition: "background 0.2s ease, color 0.2s ease, transform 0.1s ease",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.96)")}
      onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
    >
      {/* shimmer layer 1 */}
      <span aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isRed
          ? "linear-gradient(105deg, transparent 35%, rgba(255,150,150,0.45) 50%, transparent 65%)"
          : "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
        animation: `shimmer-btn 6s ease-in-out ${delay}s infinite`,
        animationPlayState: shimmerState,
      }} />
      {/* shimmer layer 2 */}
      <span aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isRed
          ? "linear-gradient(105deg, transparent 35%, rgba(255,150,150,0.3) 50%, transparent 65%)"
          : "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
        animation: `shimmer-btn-2 6s ease-in-out ${delay}s infinite`,
        animationPlayState: shimmerState,
      }} />
      {label}
    </a>
  );
}

function BtechButtons() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const buttons = [
    { href: "/college-projects", label: "🔬 Mechanical Engineering Projects ↗", accent: "slate" as const, external: false, delay: 0 },
    { href: "https://www.youtube.com/playlist?list=PL_RecMEcs_p-5UwLqFBFtat90L8IOc1bZ", label: "▶ IoT & Engineering Projects — YouTube", accent: "red" as const, external: true, delay: 0.8 },
    { href: "https://www.youtube.com/playlist?list=PL_RecMEcs_p__J3GSHkKfLjC08q0NmWtR", label: "▶ Mechanical Projects — YouTube", accent: "red" as const, external: true, delay: 1.6 },
  ];
  return (
    <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginTop: "1rem", alignItems: "center" }}
         className="edu-btn-row">
      {buttons.map((btn, i) => (
        <ShimmerButton
          key={btn.href}
          {...btn}
          paused={hoveredIdx !== null && hoveredIdx !== i}
          onHoverChange={(h) => setHoveredIdx(h ? i : null)}
        />
      ))}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export function Education() {
  return (
    <section
      id="education"
      style={{ padding: "5rem 1.5rem", maxWidth: "72rem", margin: "0 auto" }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Education & Certifications
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      {/* ── B.Tech block ── */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>🎓</span>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                marginBottom: "0.3rem",
              }}
            >
              Graduated May 2025
            </p>
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: "0.2rem",
                lineHeight: 1.4,
              }}
            >
              Bachelor of Technology — Mechanical Engineering
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.75rem" }}>
              Academy of Technology
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--color-muted)",
                lineHeight: 1.65,
                opacity: 0.8,
              }}
            >
              Transitioned into cloud engineering and DevOps during final year; built first AWS
              automation projects as a self-directed initiative.
            </p>

            {/* ── B.Tech project buttons ── */}
            <style>{shimmerStyles}</style>
            <BtechButtons />

            {/* ── Final-year publication ── */}
            <div
              style={{
                marginTop: "1.25rem",
                paddingTop: "1.1rem",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Publication · 2026
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  lineHeight: 1.5,
                  marginBottom: "0.4rem",
                }}
              >
                Modeling and Optimization of Surface Roughness of Electrodeposited Nickel Coating
                Using Taguchi and Bonobo Optimizer
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.6,
                  marginBottom: "0.3rem",
                }}
              >
                Proceedings of the 3rd International Conference on Mechanical Engineering,
                Jadavpur University · ISBN 978-81-993635-8-8
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                  opacity: 0.7,
                  lineHeight: 1.55,
                }}
              >
                Abhijit Mallick, Akashdip Mahapatra, Suman Maji, Vikash Kumar, Debamalya Ghosh,
                Jhumpa De
              </p>
              <div className="pub-btn-row">
                <a
                  href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=EQqm0DEAAAAJ&sortby=pubdate&citation_for_view=EQqm0DEAAAAJ:YOwf2qJgpHMC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu-btn"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.45rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    color: "#e8d48b",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    transition: "background 0.2s ease, color 0.2s ease, transform 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(212,175,55,0.16)";
                    el.style.color = "#f5e6a3";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(212,175,55,0.08)";
                    el.style.color = "#e8d48b";
                    el.style.transform = "scale(1)";
                  }}
                  onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.96)")}
                  onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                >
                  Verify Publication on Google Scholar ↗
                </a>
                <a
                  href="https://orcid.org/0009-0002-3839-5290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu-btn"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.45rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background: "rgba(38,180,80,0.08)",
                    border: "1px solid rgba(38,180,80,0.25)",
                    color: "#86efac",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    transition: "background 0.2s ease, color 0.2s ease, transform 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(38,180,80,0.16)";
                    el.style.color = "#bbf7d0";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(38,180,80,0.08)";
                    el.style.color = "#86efac";
                    el.style.transform = "scale(1)";
                  }}
                  onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.96)")}
                  onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                >
                  ORCID Profile ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Certifications sub-section ── */}
      <div style={{ marginBottom: "1.25rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "var(--color-muted)",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          Certifications & Credentials
        </p>

        {/* Responsive 2→3 column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))",
            gap: "0.875rem",
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <CertBadge key={cert.id} cert={cert} />
          ))}
        </div>

        {/* ── CTA row ── */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "1.75rem",
          }}
        >
          <a
            href="https://www.credly.com/users/akashdip2001"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
            style={{ textDecoration: "none" }}
          >
            Verify Credentials on Credly ↗
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Badge card ─────────────────────────────────────────────────────────── */
function CertBadge({ cert }: { cert: Certification }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="card"
      style={{
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
      }
    >
      {/* Badge image or fallback icon */}
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
          flexShrink: 0,
          borderRadius: "0.5rem",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
          border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
        }}
      >
        {cert.badgeImage && !imgFailed ? (
          <img
            src={cert.badgeImage}
            alt={`${cert.title} badge`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <FallbackBadgeIcon />
        )}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--color-text)",
            lineHeight: 1.35,
            marginBottom: "0.15rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={cert.title}
        >
          {cert.title}
        </p>
        <p
          style={{
            fontSize: "0.68rem",
            color: "var(--color-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {cert.issuer}
          {cert.period ? ` · ${cert.period}` : ""}
        </p>
      </div>
    </div>
  );
}

/* Inline SVG shield-check fallback — no external dep */
function FallbackBadgeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--color-accent)" }}
    >
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
