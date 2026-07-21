"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-init";
import ValidatorAnimation from "@/components/ui/ValidatorAnimation";
import HealthCheckAnimation from "@/components/ui/HealthCheckAnimation";
import VulnerabilityAnimation from "@/components/ui/VulnerabilityAnimation";
import DataDumpAnimation from "@/components/ui/DataDumpAnimation";
import GenAIAnimation from "@/components/ui/GenAIAnimation";
import ScrollHint from "@/components/ui/ScrollHint";

/* ─── Types & Data ───────────────────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  metric: { before: string; after: string; label: string };
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "AWS Post-Deployment Validator",
    description:
      "Replaced a manual 30-step AWS console checklist with a fully automated Python + Boto3 validation suite triggered post-CodePipeline. Covers IAM, security groups, CloudWatch alarms, and service health in a single run.",
    image: "/diagrams/project-1-validator.png",
    metric: { before: "30 min", after: "5 min", label: "Deployment Validation" },
    tags: ["Python", "Boto3", "AWS", "CI/CD"],
  },
  {
    id: "p2",
    title: "UAT / Prod Health-Check Orchestrator",
    description:
      "Built a Bash + Python orchestration layer that parallelises environment health checks across 12 microservices, replacing sequential manual verification with a single command that fans out and aggregates results.",
    image: "/diagrams/project-2-health-check.png",
    metric: { before: "1.5 h", after: "5 min", label: "Health Check Cycle" },
    tags: ["Bash", "Python", "AWS Lambda", "Observability"],
  },
  {
    id: "p3",
    title: "Automated Vulnerability Remediation Pipeline",
    description:
      "Integrated AWS Inspector findings into a Lambda-driven remediation workflow: auto-patches EC2 AMIs, raises PRs for IaC fixes, and posts Slack summaries — eliminating the manual triage-and-fix loop.",
    image: "/diagrams/project-3-vulnerability.png",
    metric: { before: "1 day manual", after: "30 min automated", label: "Vulnerability Fix" },
    tags: ["AWS Inspector", "Lambda", "Terraform", "Security"],
  },
  {
    id: "p4",
    title: "S3 Parallel Data-Dump Engine",
    description:
      "Re-architected a sequential S3 export script into a multi-threaded Python engine using concurrent.futures, with intelligent part-size tuning and S3 Transfer Acceleration — reducing export time by 93%.",
    image: "/diagrams/project-4-s3-dump.png",
    metric: { before: "30 min", after: "2 min", label: "S3 Data Export" },
    tags: ["Python", "S3", "Concurrency", "Data Engineering"],
  },
  {
    id: "p5",
    title: "Enterprise GenAI RAG Agent",
    description:
      "Designed and deployed a production Retrieval-Augmented Generation pipeline on Amazon Bedrock (Claude 3) with a vector store on OpenSearch Serverless, enabling natural-language querying of internal operational runbooks.",
    image: "/diagrams/project-5-genai-agent.png",
    metric: {
      before: "Manual runbook search",
      after: "Enterprise RAG + Bedrock",
      label: "GenAI Agent",
    },
    tags: ["Amazon Bedrock", "RAG", "OpenSearch", "Agentic AI"],
  },
];

/* ─── Section ────────────────────────────────────────────────────────────── */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ overflow: "hidden", background: "var(--color-bg)", position: "relative" }}
    >
      <ScrollHint />
      {/* Section header */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
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
            Project Showcase
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
            }}
          >
            scroll →
          </span>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1.5rem",
          padding: "0 3rem 4rem",
          width: "max-content",
          alignItems: "stretch",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="card"
      style={{
        width: "clamp(280px, 30vw, 360px)",
        flexShrink: 0,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
      }
    >
      {/* Title */}
      <h3
        style={{
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "var(--color-text)",
          lineHeight: 1.4,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          flex: "none",
        }}
      >
        {project.description}
      </p>

      {/* Validator animation — p1 only */}
      {project.id === "p1" && (
        <div style={{ flex: 1, minHeight: "140px" }}>
          <ValidatorAnimation />
        </div>
      )}

      {/* Health-check animation — p2 only */}
      {project.id === "p2" && (
        <div style={{ flex: 1, minHeight: "140px" }}>
          <HealthCheckAnimation />
        </div>
      )}

      {/* Vulnerability animation — p3 only */}
      {project.id === "p3" && (
        <div style={{ flex: 1, minHeight: "140px" }}>
          <VulnerabilityAnimation />
        </div>
      )}

      {/* Data-dump animation — p4 only */}
      {project.id === "p4" && (
        <div style={{ flex: 1, minHeight: "140px" }}>
          <DataDumpAnimation />
        </div>
      )}

      {/* GenAI animation — p5 only */}
      {project.id === "p5" && (
        <div style={{ flex: 1, minHeight: "140px" }}>
          <GenAIAnimation />
        </div>
      )}

      {/* Architecture diagram — fallback for any future projects */}
      {project.id !== "p1" && project.id !== "p2" && project.id !== "p3" && project.id !== "p4" && project.id !== "p5" && project.image && (
        <div
          ref={(el) => { if (el) el.style.display = "flex"; }}
          style={{
            width: "100%",
            flex: 1,
            minHeight: "120px",
            borderRadius: "0.375rem",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} architecture diagram`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              const wrapper = (e.currentTarget as HTMLImageElement).parentElement;
              if (wrapper) wrapper.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Impact metric — Before → After */}
      <div
        style={{
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          background: "color-mix(in srgb, var(--color-accent) 8%, transparent)",
          border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          {project.metric.label}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              textDecoration: "line-through",
              opacity: 0.7,
            }}
          >
            {project.metric.before}
          </span>
          <span style={{ color: "var(--color-accent)", fontSize: "0.8rem" }}>→</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--color-accent)",
            }}
          >
            {project.metric.after}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {project.tags.map((t) => (
          <span key={t} className="tag" style={{ fontSize: "0.65rem" }}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
