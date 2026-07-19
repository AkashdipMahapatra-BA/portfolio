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
              <a
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=EQqm0DEAAAAJ&sortby=pubdate&citation_for_view=EQqm0DEAAAAJ:YOwf2qJgpHMC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
              >
                Verify Publication on Google Scholar ↗
              </a>
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
          <a href="/college-projects" className="btn-accent" style={{ textDecoration: "none" }}>
            View College Projects Archive
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
