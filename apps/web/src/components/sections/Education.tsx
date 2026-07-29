"use client";

import { useState } from "react";
import { EducationThreads } from "@/components/ui/EducationThreads";

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

/* ─── Shimmer & Education Button Styles ─────────────────────────────────── */
const shimmerStyles = `
  @keyframes shimmer-btn {
    0%     { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    20%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    20.01% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
    23%    { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
    23.01% { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    43%    { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    43.01% { transform: translateX(150%)  skewX(-20deg); opacity: 1; }
    63%    { transform: translateX(-150%) skewX(-20deg); opacity: 1; }
    63.01% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
    100%   { opacity: 0; transform: translateX(-150%) skewX(-20deg); }
  }

  .edu-btn-row {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
    margin-top: 1rem;
    align-items: center;
  }
  .pub-btn-row {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1rem;
  }

  /* ── Agentic Conic Rotating Glow Button Effect (Signature Border Orbit) ── */
  .edu-btn-agentic-glow {
    position: relative;
    padding: 2px !important;
    border: none !important;
    background: transparent !important;
    border-radius: 9999px !important;
    cursor: pointer;
    display: inline-flex;
    overflow: hidden;
    box-shadow: 0 0 16px rgba(66, 133, 244, 0.4), 0 0 25px rgba(155, 81, 224, 0.3);
    text-decoration: none;
  }

  .edu-btn-agentic-glow::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #4285f4,
      #9b51e0,
      #e91e63,
      #10b981,
      #facc15,
      #4285f4
    );
    animation: spin-border 3s linear infinite;
    z-index: 1;
  }

  .edu-btn-agentic-glow .btn-inner-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 1.05rem;
    background: #0f172a;
    color: #ffffff;
    border-radius: 9999px;
    font-weight: 600;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    z-index: 2;
    white-space: nowrap;
  }

  [data-theme="light"] .edu-btn-agentic-glow .btn-inner-content {
    background: #ffffff;
    color: #0f172a;
  }

  @keyframes spin-border {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .edu-btn {
    white-space: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 1.05rem;
    border-radius: 0.5rem;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    user-select: none;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }

  /* ── Dark Mode (Default) ── */
  .edu-btn-slate {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #cbd5e1;
  }
  .edu-btn-slate:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.28);
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.08);
  }
  .edu-btn-slate .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%);
  }

  .edu-btn-red {
    background: rgba(220, 38, 38, 0.12);
    border: 1px solid rgba(220, 38, 38, 0.38);
    color: #fca5a5;
  }
  .edu-btn-red:hover {
    background: rgba(220, 38, 38, 0.22);
    border-color: rgba(220, 38, 38, 0.6);
    color: #fecaca;
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.22);
  }
  .edu-btn-red .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 200, 200, 0.5) 50%, transparent 65%);
  }

  @media (max-width: 640px) {
    .edu-btn-agentic-glow {
      max-width: 100%;
      width: fit-content;
    }
    .edu-btn-agentic-glow .btn-inner-content {
      padding: 0.42rem 0.8rem !important;
      font-size: 0.68rem !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
    }
    .edu-btn {
      padding: 0.42rem 0.8rem !important;
      font-size: 0.68rem !important;
      max-width: 100%;
      white-space: nowrap;
    }
  }

  .pub-btn-scholar {
    background: rgba(212, 175, 55, 0.08);
    border: 1px solid rgba(212, 175, 55, 0.3);
    color: #e8d48b;
  }
  .pub-btn-scholar:hover {
    background: rgba(212, 175, 55, 0.18);
    border-color: rgba(212, 175, 55, 0.5);
    color: #f5e6a3;
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.18);
  }

  .pub-btn-orcid {
    background: rgba(38, 180, 80, 0.08);
    border: 1px solid rgba(38, 180, 80, 0.3);
    color: #86efac;
  }
  .pub-btn-orcid:hover {
    background: rgba(38, 180, 80, 0.18);
    border-color: rgba(38, 180, 80, 0.5);
    color: #bbf7d0;
    box-shadow: 0 6px 20px rgba(38, 180, 80, 0.18);
  }

  /* ── Light Mode (White Mode) Overrides ── */
  [data-theme="light"] .edu-btn-slate {
    background: rgba(15, 23, 42, 0.05);
    border: 1px solid rgba(15, 23, 42, 0.22);
    color: #0f172a;
  }
  [data-theme="light"] .edu-btn-slate:hover {
    background: rgba(15, 23, 42, 0.12);
    border-color: rgba(15, 23, 42, 0.4);
    color: #0284c7;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.12);
  }
  [data-theme="light"] .edu-btn-slate .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.75) 50%, transparent 65%);
  }

  [data-theme="light"] .edu-btn-red {
    background: rgba(220, 38, 38, 0.07);
    border: 1px solid rgba(220, 38, 38, 0.38);
    color: #dc2626;
  }
  [data-theme="light"] .edu-btn-red:hover {
    background: rgba(220, 38, 38, 0.15);
    border-color: rgba(220, 38, 38, 0.65);
    color: #991b1b;
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.18);
  }
  [data-theme="light"] .edu-btn-red .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.75) 50%, transparent 65%);
  }

  [data-theme="light"] .pub-btn-scholar {
    background: rgba(180, 83, 9, 0.07);
    border: 1px solid rgba(180, 83, 9, 0.38);
    color: #b45309;
  }
  [data-theme="light"] .pub-btn-scholar:hover {
    background: rgba(180, 83, 9, 0.15);
    border-color: rgba(180, 83, 9, 0.65);
    color: #78350f;
    box-shadow: 0 6px 20px rgba(180, 83, 9, 0.15);
  }

  [data-theme="light"] .pub-btn-orcid {
    background: rgba(21, 128, 61, 0.07);
    border: 1px solid rgba(21, 128, 61, 0.38);
    color: #15803d;
  }
  [data-theme="light"] .pub-btn-orcid:hover {
    background: rgba(21, 128, 61, 0.15);
    border-color: rgba(21, 128, 61, 0.65);
    color: #14532d;
    box-shadow: 0 6px 20px rgba(21, 128, 61, 0.15);
  }

  /* ── Credly Widget Container & Desktop/Mobile 2D Paintbrush Arrows ── */
  .credly-widget-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 2rem;
    position: relative;
    width: 100%;
  }

  .credly-arrow-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .credly-arrow-desktop {
    display: block;
    width: 220px;
    height: 130px;
  }
  .credly-arrow-mobile {
    display: none;
    width: 190px;
    height: 140px;
  }

  .credly-hand-arrow {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* Body Path Animation (Body paints 0%->60%, holds, and fades out FIRST 78%->86%) */
  @keyframes draw-arrow-body {
    0% {
      stroke-dashoffset: 480;
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    60% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    78% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    86% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
  }

  /* Arrowhead Animation (Head paints 52%->70%, STAYS visible, and fades out SECOND 90%->98%) */
  @keyframes draw-arrow-head {
    0%, 50% {
      stroke-dashoffset: 100;
      opacity: 0;
    }
    54% {
      opacity: 1;
    }
    70% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    90% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    98% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
  }

  /* Staggered CSS Classes: Base paints FIRST, Golden Accent paints SECOND (0.8s delay) */
  .credly-draw-path-base {
    stroke-dasharray: 480;
    stroke-dashoffset: 480;
    animation: draw-arrow-body 4.5s ease-in-out 0s infinite;
  }

  .credly-draw-head-base {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: draw-arrow-head 4.5s ease-in-out 0s infinite;
  }

  .credly-draw-path-accent {
    stroke-dasharray: 480;
    stroke-dashoffset: 480;
    animation: draw-arrow-body 4.5s ease-in-out 0.8s infinite;
  }

  .credly-draw-head-accent {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: draw-arrow-head 4.5s ease-in-out 0.8s infinite;
  }

  @keyframes credly-badge-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(243, 108, 33, 0.45);
    }
    70% {
      box-shadow: 0 0 0 12px rgba(243, 108, 33, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(243, 108, 33, 0);
    }
  }

  .credly-badge-emblem {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    text-decoration: none;
    padding: 0.55rem 1.15rem 0.55rem 0.55rem;
    border-radius: 9999px;
    background: rgba(243, 108, 33, 0.12);
    border: 1.5px solid rgba(243, 108, 33, 0.45);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(243, 108, 33, 0.15);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .credly-badge-emblem .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 180, 100, 0.55) 50%, transparent 65%);
  }

  [data-theme="light"] .credly-badge-emblem {
    background: rgba(243, 108, 33, 0.08);
    border-color: rgba(243, 108, 33, 0.5);
    box-shadow: 0 4px 18px rgba(243, 108, 33, 0.12);
  }
  [data-theme="light"] .credly-badge-emblem .shimmer-layer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.8) 50%, transparent 65%);
  }

  .credly-badge-emblem:hover {
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(243, 108, 33, 0.85);
    background: rgba(243, 108, 33, 0.22);
    box-shadow: 0 8px 30px rgba(243, 108, 33, 0.3);
  }
  [data-theme="light"] .credly-badge-emblem:hover {
    background: rgba(243, 108, 33, 0.16);
    box-shadow: 0 8px 25px rgba(243, 108, 33, 0.22);
  }

  .credly-badge-icon-wrap {
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F36C21;
    animation: credly-badge-pulse 2.5s infinite;
    flex-shrink: 0;
  }

  /* Publication container styling for Light & Dark mode */
  .pub-box {
    margin-top: 1.5rem;
    padding: 1.1rem 1.25rem;
    border-radius: 0.65rem;
    border-left: 3px solid var(--color-accent);
    background: color-mix(in srgb, var(--color-surface) 70%, transparent);
    border-top: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  [data-theme="light"] .pub-box {
    background: rgba(255, 255, 255, 0.65);
  }

  /* Card elevation effect */
  .edu-main-card {
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  [data-theme="light"] .edu-main-card {
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03);
  }

  .cert-badge-card {
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
  }
  .cert-badge-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px -3px rgba(0, 0, 0, 0.12);
  }

  /* Sharp Muted Text in Light mode */
  [data-theme="light"] .edu-text-muted {
    color: #475569 !important;
    opacity: 1 !important;
  }
  [data-theme="light"] .edu-text-subtle {
    color: #64748b !important;
    opacity: 1 !important;
  }

  @media (max-width: 640px) {
    .edu-btn-row,
    .pub-btn-row {
      flex-direction: column;
      align-items: stretch;
    }
    .edu-btn {
      width: 100% !important;
      justify-content: center;
      white-space: normal !important;
      word-break: break-word;
      text-align: center;
    }
    .credly-widget-container {
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
    }
    .credly-arrow-desktop {
      display: none !important;
    }
    .credly-arrow-mobile {
      display: block !important;
      width: 170px;
      height: 180px;
    }
    .credly-badge-emblem {
      width: 100%;
      justify-content: center;
      border-radius: 0.85rem;
    }
  @keyframes ai-border-orbit {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .edu-btn-ai-highlight {
    position: relative;
    border-color: rgba(6, 182, 212, 0.6) !important;
    box-shadow: 0 0 16px rgba(6, 182, 212, 0.4), 0 0 24px rgba(168, 85, 247, 0.3) !important;
  }
  .edu-btn-ai-highlight::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 0.6rem;
    padding: 2px;
    background: linear-gradient(
      90deg,
      #06B6D4,
      #3B82F6,
      #A855F7,
      #EC4899,
      #EF4444,
      #F97316,
      #FACC15,
      #10B981,
      #06B6D4
    );
    background-size: 300% 300%;
    animation: ai-border-orbit 3.5s ease infinite;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

function ShimmerButton({
  href, label, external, accent, delay, paused, highlight, onHoverChange,
}: {
  href: string;
  label: string;
  external?: boolean;
  accent: "slate" | "red";
  delay: number;
  paused: boolean;
  highlight?: boolean | undefined;
  onHoverChange: (hovered: boolean) => void;
}) {
  const isRed = accent === "red";
  const shimmerState = paused ? "paused" : "running";

  const handleEnter = () => { onHoverChange(true); };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onHoverChange(false);
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  };

  if (highlight) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="edu-btn-agentic-glow"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className="btn-inner-content">{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`edu-btn ${isRed ? "edu-btn-red" : "edu-btn-slate"}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.96)")}
      onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
    >
      {/* Shimmer streak layer */}
      <span
        aria-hidden
        className="shimmer-layer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          animation: `shimmer-btn 5s ease-in-out ${delay}s infinite`,
          animationPlayState: shimmerState,
        }}
      />
      {label}
    </a>
  );
}

function BtechButtons({ isAbsorbed }: { isAbsorbed?: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const buttons = [
    { href: "/college-projects", label: "💻 IT and Software Projects ↗", accent: "slate" as const, external: false, delay: 0, highlight: Boolean(isAbsorbed) },
    { href: "https://www.youtube.com/playlist?list=PL_RecMEcs_p-5UwLqFBFtat90L8IOc1bZ", label: "▶ IoT & Engineering Projects — YouTube", accent: "red" as const, external: true, delay: 0.8, highlight: false },
    { href: "https://www.youtube.com/playlist?list=PL_RecMEcs_p__J3GSHkKfLjC08q0NmWtR", label: "▶ Mechanical Projects — YouTube", accent: "red" as const, external: true, delay: 1.6, highlight: false },
  ];
  return (
    <div className="edu-btn-row">
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

/* ─── Credly Widget with Desktop & Mobile Two-Tone Paintbrush Looping Arrows ─── */
function CredlyWidget() {
  return (
    <div className="credly-widget-container">
      {/* ── 1. Desktop 2D Yellow & Golden Paintbrush Looping Arrow (Points RIGHT into button) ── */}
      <div className="credly-arrow-wrapper credly-arrow-desktop">
        <svg
          className="credly-hand-arrow"
          viewBox="0 0 220 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tapered Tail Tip Path (Yellow base) */}
          <path
            d="M 36 18 C 30 26, 26 40, 27 58"
            stroke="#FFE600"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="credly-draw-path-base"
          />

          {/* Outer Bright Yellow Base Brush Stroke Body (Paints FIRST at t=0s) */}
          <path
            d="M 32 30 C 20 65, 45 110, 68 110 C 92 110, 115 75, 95 45 C 75 18, 42 55, 62 90 C 82 122, 140 100, 195 68"
            stroke="#FFE600"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-path-base"
          />

          {/* Inner Dark Golden/Amber Accent Brush Stroke (Paints SECOND with 0.8s delay!) */}
          <path
            d="M 32 32 C 22 66, 46 108, 68 108 C 90 108, 113 76, 95 47 C 77 22, 44 56, 62 89 C 80 120, 138 98, 195 68"
            stroke="#D97706"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-path-accent"
            opacity="0.85"
          />

          {/* Outer Bright Yellow Arrowhead Barbs */}
          <path
            d="M 160 52 L 195 68 L 180 96"
            stroke="#FFE600"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-head-base"
          />

          {/* Inner Dark Golden/Amber Arrowhead Core (Paints SECOND with 0.8s delay!) */}
          <path
            d="M 162 53 L 195 68 L 181 94"
            stroke="#D97706"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-head-accent"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ── 2. Mobile 2D Yellow & Golden Paintbrush Vertical Arc Arrow (Arrowhead opening line is 100% perpendicular to incoming stem tangent) ── */}
      <div className="credly-arrow-wrapper credly-arrow-mobile">
        <svg
          className="credly-hand-arrow"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Tapered Tail Tip Path (Semi-transparent slate gray tip on mobile) */}
          <path
            d="M 38 32 C 55 20, 85 14, 115 18"
            stroke="rgba(148, 163, 184, 0.45)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="credly-draw-path-base"
          />

          {/* 2. Outer Semi-Transparent Slate Gray Base Body (Paints FIRST at t=0s) */}
          <path
            d="M 105 18 C 135 22, 148 38, 130 58 C 108 78, 72 62, 78 44 C 85 28, 115 36, 132 68 C 148 102, 128 114, 82 160"
            stroke="rgba(148, 163, 184, 0.45)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-path-base"
          />

          {/* 3. Inner Dark Golden/Amber Core (LEAVE UNTOUCHED as dark yellow/golden) */}
          <path
            d="M 105 20 C 133 24, 146 39, 130 58 C 108 77, 74 62, 78 45 C 85 29, 114 36, 131 68 C 146 101, 128 114, 82 160"
            stroke="#D97706"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-path-accent"
            opacity="0.85"
          />

          {/* 4. Outer Bright Yellow Perpendicular Arrowhead (UNTOUCHED - bright yellow) */}
          <path
            d="M 62 135 L 82 160 L 107 157"
            stroke="#FFE600"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-head-base"
          />

          {/* 5. Inner Golden Perpendicular Arrowhead Core (UNTOUCHED - dark golden amber) */}
          <path
            d="M 64 136 L 82 160 L 105 156"
            stroke="#D97706"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="credly-draw-head-accent"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Centered Official Credly Profile Badge Button */}
      <a
        href="https://www.credly.com/users/akashdip2001"
        target="_blank"
        rel="noopener noreferrer"
        className="credly-badge-emblem"
        onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.97)")}
        onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
      >
        <span
          aria-hidden
          className="shimmer-layer"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "9999px",
            animation: "shimmer-btn 5s ease-in-out 0s infinite",
          }}
        />
        <div className="credly-badge-icon-wrap">
          <img
            src="/badges/credly.svg"
            alt="Credly Emblem"
            style={{ width: "2.5rem", height: "2.5rem", objectFit: "contain", transform: "scale(1.5)" }}
          />
        </div>
        <div style={{ paddingRight: "0.4rem" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.25, margin: 0 }}>
            Official Credly Profile
          </p>
          <p style={{ fontSize: "0.66rem", fontFamily: "var(--font-mono)", color: "#F36C21", margin: "0.2rem 0 0", fontWeight: 600 }}>
            Verified Badges & Transcripts ↗
          </p>
        </div>
      </a>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export function Education() {
  const [isAbsorbed, setIsAbsorbed] = useState(false);

  return (
    <section
      id="education"
      style={{ padding: "5rem 1.5rem", maxWidth: "72rem", margin: "0 auto", position: "relative" }}
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
            fontWeight: 600,
          }}
        >
          Education & Certifications
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      {/* ── B.Tech block wrapper with EducationThreads overlay ── */}
      <div style={{ position: "relative" }}>
        <EducationThreads onAbsorption={() => setIsAbsorbed(true)} />

        <div className="card edu-main-card" style={{ padding: "1.5rem", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>🎓</span>
          <div style={{ width: "100%" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                marginBottom: "0.3rem",
                fontWeight: 600,
              }}
            >
              Graduated May 2025
            </p>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: "0.2rem",
                lineHeight: 1.4,
              }}
            >
              Bachelor of Technology — Mechanical Engineering
            </h4>
            <p
              className="edu-text-muted"
              style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.75rem", fontWeight: 500 }}
            >
              Academy of Technology
            </p>
            <p
              className="edu-text-subtle"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-muted)",
                lineHeight: 1.65,
                opacity: 0.85,
              }}
            >
              Transitioned into cloud engineering and DevOps during final year; built first AWS
              automation projects as a self-directed initiative.
            </p>

            {/* ── B.Tech project buttons ── */}
            <style>{shimmerStyles}</style>
            <BtechButtons isAbsorbed={isAbsorbed} />

            {/* ── Final-year publication ── */}
            <div className="pub-box">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                  fontWeight: 600,
                }}
              >
                Publication · 2026
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1.45,
                  marginBottom: "0.4rem",
                }}
              >
                Modeling and Optimization of Surface Roughness of Electrodeposited Nickel Coating
                Using Taguchi and Bonobo Optimizer
              </p>
              <p
                className="edu-text-muted"
                style={{
                  fontSize: "0.74rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.55,
                  marginBottom: "0.35rem",
                }}
              >
                Proceedings of the 3rd International Conference on Mechanical Engineering,
                Jadavpur University · <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>ISBN 978-81-993635-8-8</span>
              </p>
              <p
                className="edu-text-subtle"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                  opacity: 0.85,
                  lineHeight: 1.55,
                }}
              >
                Abhijit Mallick, <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>Akashdip Mahapatra</strong>, Suman Maji, Vikash Kumar, Debamalya Ghosh, Jhumpa De
              </p>
              <div className="pub-btn-row">
                <a
                  href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=EQqm0DEAAAAJ&sortby=pubdate&citation_for_view=EQqm0DEAAAAJ:YOwf2qJgpHMC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu-btn pub-btn-scholar"
                  onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(0.96)")}
                  onMouseUp={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                >
                  Verify Publication on Google Scholar ↗
                </a>
                <a
                  href="https://orcid.org/0009-0002-3839-5290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu-btn pub-btn-orcid"
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
            fontWeight: 600,
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

        {/* ── Credly Widget Row ── */}
        <CredlyWidget />
      </div>
    </section>
  );
}

/* ─── Badge card ─────────────────────────────────────────────────────────── */
function CertBadge({ cert }: { cert: Certification }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="card cert-badge-card"
      style={{
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        borderRadius: "0.75rem",
        cursor: "default",
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
          borderRadius: "0.6rem",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
          border: "1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)",
          padding: "0.25rem",
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
            marginBottom: "0.2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={cert.title}
        >
          {cert.title}
        </p>
        <p
          className="edu-text-muted"
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
