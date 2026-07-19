"use client";

import { useMemo } from "react";

/* ─── Experience calculator ─────────────────────────────────────────────── */
const CAREER_START = new Date("2025-08-01");

function formatTenure(from: Date, to: Date): string {
  const totalMonths =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  if (totalMonths < 12) return `${totalMonths} Month${totalMonths !== 1 ? "s" : ""}`;
  const years = totalMonths / 12;
  return `${years.toFixed(1).replace(/\.0$/, "")} Year${years < 2 ? "" : "s"}`;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    id: "de",
    role: "Data Engineer (DevOps & Infrastructure)",
    company: "Tata Consultancy Services — Global Aviation Client",
    period: "August 2025 – Present",
    active: true,
    tools: [] as string[],
    bullets: [
      "Engineered an automated post-deployment validation engine using Python/Boto3, cutting cycle time from 30 min to a 5-minute zero-error pipeline.",
      "Built a UAT data pipeline and health-check automation script, reducing complex validation from 1.5 hours to 5 minutes.",
      "Transformed OS/Python vulnerability remediation from a full-day manual process into a 30-minute automated, zero-touch execution.",
      "Eliminated manual S3 data extraction, reducing cross-functional tasks from 30 minutes to a 2-minute event-driven trigger.",
    ],
  },
  {
    id: "ilp",
    role: "Network & DevOps Trainee (ILP)",
    company: "Tata Consultancy Services — Global Technology Client / Apple",
    period: "Prior to August 2025",
    active: false,
    tools: ["Wireshark", "Nmap", "tcpdump", "Nginx", "Linux", "Bash"],
    bullets: [
      "Executed hands-on troubleshooting for deep Linux OS and networking issues using tcpdump and Wireshark.",
      "Deployed and configured Nginx reverse proxies and load balancers to resolve HTTP/DNS failures.",
      "Hardened server security via strict file permissions and network firewalls (UFW, iptables).",
    ],
  },
] as const;

const SKILL_GROUPS: { label: string; tags: string[] }[] = [
  {
    label: "Cloud & Infrastructure",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Docker", "CloudFormation", "Lambda", "S3", "EC2"],
  },
  {
    label: "Languages & Scripting",
    tags: ["Python", "Bash", "SQL", "TypeScript"],
  },
  {
    label: "Data & AI",
    tags: ["Amazon Bedrock", "GenAI", "RAG Pipelines", "Agentic AI", "Data Engineering", "Glue", "Athena"],
  },
  {
    label: "Networking & Security",
    tags: ["Wireshark", "Nmap", "tcpdump", "Nginx", "UFW", "iptables", "Linux"],
  },
  {
    label: "Practices",
    tags: ["System Design", "CI/CD", "DevOps", "IaC", "Observability", "Automation"],
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export function ExperienceSkills() {
  const tenure = useMemo(() => formatTenure(CAREER_START, new Date()), []);

  return (
    <section
      id="experience"
      style={{ padding: "5rem 1.5rem", maxWidth: "72rem", margin: "0 auto" }}
    >
      <SectionLabel text="Experience & Skills" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
          gap: "2rem",
          marginTop: "2.5rem",
        }}
      >
        {/* ── Left: Work History ── */}
        <div>
          {/* Header row with dynamic tenure badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Work History
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "var(--color-accent)",
                background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
                borderRadius: "9999px",
                padding: "0.15rem 0.6rem",
                letterSpacing: "0.06em",
              }}
            >
              {tenure} total
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {EXPERIENCE.map((job) => (
              <div
                key={job.id}
                className="card"
                style={{ padding: "1.25rem 1.5rem", position: "relative" }}
              >
                {/* Accent left bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "1rem",
                    bottom: "1rem",
                    width: "3px",
                    borderRadius: "0 2px 2px 0",
                    background: job.active
                      ? "var(--color-accent)"
                      : "var(--color-muted)",
                    opacity: job.active ? 1 : 0.4,
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: job.active ? "var(--color-accent)" : "var(--color-muted)",
                    marginBottom: "0.25rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {job.period}
                </p>
                <h4
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "0.15rem",
                    lineHeight: 1.4,
                  }}
                >
                  {job.role}
                </h4>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-muted)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.5,
                  }}
                >
                  {job.company}
                </p>

                {/* Tool tags for ILP role */}
                {job.tools.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {job.tools.map((t) => (
                      <span key={t} className="tag" style={{ fontSize: "0.65rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <ul
                  style={{
                    paddingLeft: "1.1rem",
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.65,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Skills ── */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Technical Skills
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "0.6rem",
                    opacity: 0.7,
                  }}
                >
                  {group.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {group.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
      <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
    </div>
  );
}
