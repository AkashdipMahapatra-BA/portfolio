"use client";

import { useState, useEffect } from "react";
import {
  User, GitBranch, Cloud, Search, FileSpreadsheet,
  CheckCircle2, ArrowRight, Zap, Database, Network,
  Server, Shield,
} from "lucide-react";

const PHASE_DURATION = 3500; // ms per phase
const TOTAL_PHASES = 3;
const LOOP_DURATION = PHASE_DURATION * TOTAL_PHASES; // full loop = 10500ms

const S = {
  root: {
    width: "100%",
    height: "100%",
    minHeight: "140px",
    borderRadius: "0.5rem",
    border: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    position: "relative" as const,
    boxShadow: "inset 0 0 0 1px var(--color-border)",
  },
  grid: {
    position: "absolute" as const,
    inset: 0,
    backgroundImage:
      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    opacity: 0.5,
  },
  stage: {
    flex: 1,
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1.25rem",
  },
  circle: {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "9999px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  node: {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: {
    position: "absolute" as const,
    width: "75%",
    height: "2px",
    background: "var(--color-accent)",
    boxShadow: "0 0 10px var(--color-accent), 0 0 20px var(--color-accent)",
    zIndex: 15,
  },
  glass: {
    position: "absolute" as const,
    zIndex: 20,
    color: "var(--color-accent)",
    background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
    padding: "0.75rem",
    borderRadius: "9999px",
    backdropFilter: "blur(8px)",
    border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
    boxShadow: "0 0 20px color-mix(in srgb, var(--color-accent) 40%, transparent)",
  },
  resultCard: {
    background: "color-mix(in srgb, #10b981 8%, var(--color-surface))",
    border: "1px solid color-mix(in srgb, #10b981 30%, transparent)",
    borderRadius: "1rem",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px color-mix(in srgb, #10b981 20%, transparent)",
  },
} as const;

function Phase({
  active,
  children,
  translateY = 0,
}: {
  active: boolean;
  children: React.ReactNode;
  translateY?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) scale(1)" : `translateY(${translateY}px) scale(0.95)`,
        pointerEvents: active ? "auto" : "none",
        width: "100%",
        height: "100%",
        padding: "0 1.25rem",
      }}
    >
      {children}
    </div>
  );
}

/* Timeline bar — fills over one full loop (all 3 phases), resets on loop restart */
function TimelineBar({ phase, loopKey }: { phase: number; loopKey: number }) {
  return (
    <div
      style={{
        position: "relative",
        height: "3px",
        background: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
        flexShrink: 0,
      }}
    >
      {/* Phase marker dots — evenly spaced, light up as each phase is reached */}
      {Array.from({ length: TOTAL_PHASES }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: `${((i + 1) / TOTAL_PHASES) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: i < phase ? "7px" : "5px",
            height: i < phase ? "7px" : "5px",
            borderRadius: "9999px",
            background: i < phase
              ? "var(--color-accent)"
              : "color-mix(in srgb, var(--color-accent) 30%, transparent)",
            transition: "all 0.4s ease",
            zIndex: 2,
          }}
        />
      ))}
      {/* Fill bar — key resets it once per full loop */}
      <div
        key={loopKey}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          background: "var(--color-accent)",
          animation: `progress-bar ${LOOP_DURATION}ms linear forwards`,
          opacity: 0.7,
        }}
      />
    </div>
  );
}

export default function ValidatorAnimation() {
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => {
        const next = (p + 1) % TOTAL_PHASES;
        if (next === 0) setLoopKey((k) => k + 1); // new loop starting
        return next;
      });
    }, PHASE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={S.root}>
      <div style={S.grid} />

      {/* Stage area */}
      <div style={S.stage}>

        {/* ── Phase 0: User → GitBranch (ACTIONS) → Cloud (AWS) — sequential pop-in ── */}
        <Phase active={phase === 0} translateY={-20}>
          {/* key=loopKey remounts this div every loop so CSS pop-in animations replay */}
          <div key={loopKey} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", justifyContent: "center" }}>

            {/* User */}
            <div
              className="animate-pop-in"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "0ms" }}
            >
              <div style={S.circle}>
                <User size={22} style={{ color: "var(--color-muted)" }} />
              </div>
            </div>

            {/* Arrow 1 */}
            <ArrowRight
              size={18}
              className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "150ms", opacity: 0 }}
            />

            {/* GitBranch + ACTIONS badge */}
            <div
              className="animate-pop-in"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", position: "relative", animationDelay: "300ms", opacity: 0 }}
            >
              <div style={{ ...S.circle, background: "var(--color-text)", border: "none", padding: "0.85rem" }}>
                <GitBranch size={22} style={{ color: "var(--color-bg)" }} />
              </div>
              {/* ACTIONS badge — top-right offset like screenshot */}
              <div style={{
                position: "absolute",
                bottom: "-1.1rem",
                background: "#3b82f6",
                color: "#fff",
                fontSize: "0.5rem",
                fontWeight: 700,
                padding: "2px 5px",
                borderRadius: "4px",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}>
                ACTIONS
              </div>
            </div>

            {/* Arrow 2 */}
            <ArrowRight
              size={18}
              className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "500ms", opacity: 0 }}
            />

            {/* AWS Cloud */}
            <div
              className="animate-pop-in"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", animationDelay: "650ms", opacity: 0 }}
            >
              <div style={{
                ...S.circle,
                border: "1px solid color-mix(in srgb, #f97316 30%, transparent)",
                boxShadow: "0 0 20px color-mix(in srgb, #f97316 20%, transparent)",
                padding: "0.85rem",
              }}>
                <Cloud size={26} style={{ color: "#f97316" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#f97316", fontWeight: 700 }}>
                AWS
              </span>
            </div>

          </div>
        </Phase>

        {/* ── Phase 1: Inspection — scanner + floating service nodes ── */}
        <Phase active={phase === 1}>
          <div style={{
            ...S.circle,
            border: "1px solid color-mix(in srgb, #f97316 30%, transparent)",
            boxShadow: "0 0 30px color-mix(in srgb, #f97316 15%, transparent)",
            zIndex: 10,
            position: "relative",
          }}>
            <Cloud size={36} style={{ color: "#f97316" }} />
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="animate-float" style={{ ...S.node, position: "absolute", top: "18%", right: "28%" }}>
              <Zap size={16} style={{ color: "#f97316" }} />
            </div>
            <div className="animate-float-delay" style={{ ...S.node, position: "absolute", bottom: "18%", left: "28%" }}>
              <Database size={16} style={{ color: "#22c55e" }} />
            </div>
            <div className="animate-float" style={{ ...S.node, position: "absolute", bottom: "22%", right: "22%" }}>
              <Network size={16} style={{ color: "#ec4899" }} />
            </div>
            <div className="animate-float-delay" style={{ ...S.node, position: "absolute", top: "22%", left: "22%" }}>
              <Server size={16} style={{ color: "#3b82f6" }} />
            </div>
            <div className="animate-float" style={{ ...S.node, position: "absolute", top: "40%", right: "16%" }}>
              <Shield size={16} style={{ color: "#ef4444" }} />
            </div>
          </div>

          <div className="animate-scan" style={S.scanLine} />
          <div className="animate-roam" style={S.glass}>
            <Search size={24} />
          </div>
        </Phase>

        {/* ── Phase 2: Result ── */}
        <Phase active={phase === 2} translateY={20}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ position: "relative" }}>
              <div style={S.resultCard}>
                <FileSpreadsheet size={48} style={{ color: "#10b981" }} />
              </div>
              <div style={{
                position: "absolute",
                bottom: "-6px",
                right: "-6px",
                background: "var(--color-surface)",
                borderRadius: "9999px",
                padding: "2px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "#10b981", letterSpacing: "0.08em" }}>
                AUDIT REPORT GENERATED
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-muted)" }}>
                30 min → 5 min
              </span>
            </div>
          </div>
        </Phase>

      </div>

      {/* ── Timeline bar ── */}
      <TimelineBar phase={phase} loopKey={loopKey} />
    </div>
  );
}
