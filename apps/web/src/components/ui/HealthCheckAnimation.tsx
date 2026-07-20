"use client";
import { useState, useEffect } from "react";
import {
  Terminal, FileCode, GitMerge, Activity, Server,
  CheckCircle2, ArrowRight, BarChart2, Box, Cpu
} from "lucide-react";

const PHASE_DURATION = 3500;
const TOTAL_PHASES = 3;
const LOOP_DURATION = PHASE_DURATION * TOTAL_PHASES;

const S = {
  root: {
    width: "100%", height: "100%", minHeight: "140px", borderRadius: "0.5rem",
    border: "1px solid var(--color-border)", background: "var(--color-surface)",
    display: "flex", flexDirection: "column" as const, overflow: "hidden",
    position: "relative" as const, boxShadow: "inset 0 0 0 1px var(--color-border)",
  },
  grid: {
    position: "absolute" as const, inset: 0,
    backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
    backgroundSize: "20px 20px", opacity: 0.5,
  },
  stage: {
    flex: 1, position: "relative" as const, display: "flex", alignItems: "center",
    justifyContent: "center", padding: "0 1.25rem",
  },
  circle: {
    background: "var(--color-bg)", border: "1px solid var(--color-border)",
    borderRadius: "9999px", padding: "1rem", display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  node: {
    background: "var(--color-bg)", border: "1px solid var(--color-border)",
    borderRadius: "0.5rem", padding: "0.4rem", display: "flex", alignItems: "center",
    justifyContent: "center",
  },
  resultCard: {
    background: "color-mix(in srgb, #3b82f6 8%, var(--color-surface))",
    border: "1px solid color-mix(in srgb, #3b82f6 30%, transparent)",
    borderRadius: "1rem", padding: "1.5rem", display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: "0 0 40px color-mix(in srgb, #3b82f6 20%, transparent)",
  },
} as const;

function Phase({ active, children, translateY = 0 }: { active: boolean; children: React.ReactNode; translateY?: number }) {
  return (
    <div style={{
      position: "absolute", display: "flex", alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s ease, transform 0.6s ease", opacity: active ? 1 : 0,
      transform: active ? "translateY(0) scale(1)" : `translateY(${translateY}px) scale(0.95)`,
      pointerEvents: active ? "auto" : "none", width: "100%", height: "100%", padding: "0 1.25rem",
    }}>
      {children}
    </div>
  );
}

function TimelineBar({ phase, loopKey }: { phase: number; loopKey: number }) {
  return (
    <div style={{ position: "relative", height: "3px", background: "color-mix(in srgb, var(--color-accent) 15%, transparent)", flexShrink: 0 }}>
      {Array.from({ length: TOTAL_PHASES }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: `${((i + 1) / TOTAL_PHASES) * 100}%`,
          transform: "translate(-50%, -50%)", width: i < phase ? "7px" : "5px", height: i < phase ? "7px" : "5px",
          borderRadius: "9999px", background: i < phase ? "var(--color-accent)" : "color-mix(in srgb, var(--color-accent) 30%, transparent)",
          transition: "all 0.4s ease", zIndex: 2,
        }} />
      ))}
      <div key={loopKey} style={{
        position: "absolute", left: 0, top: 0, height: "100%", background: "var(--color-accent)",
        animation: `progress-bar ${LOOP_DURATION}ms linear forwards`, opacity: 0.7,
      }} />
    </div>
  );
}

export default function HealthCheckAnimation() {
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => {
        const next = (p + 1) % TOTAL_PHASES;
        if (next === 0) setLoopKey((k) => k + 1);
        return next;
      });
    }, PHASE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={S.root}>
      <div style={S.grid} />
      <div style={S.stage}>

        {/* Phase 0 — Bash Terminal → Python Orchestration */}
        <Phase active={phase === 0} translateY={-20}>
          <div key={loopKey} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", justifyContent: "center" }}>

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #a855f7 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #a855f7 20%, transparent)" }}>
                <Terminal size={26} style={{ color: "#a855f7" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#a855f7", fontWeight: 700, marginTop: "0.4rem" }}>BASH</span>
            </div>

            <ArrowRight size={18} className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "200ms", opacity: 0 }} />

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "400ms", opacity: 0 }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #eab308 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #eab308 20%, transparent)" }}>
                <FileCode size={26} style={{ color: "#eab308" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#eab308", fontWeight: 700, marginTop: "0.4rem" }}>PYTHON</span>
            </div>

          </div>
        </Phase>

        {/* Phase 1 — Parallel Fan-Out to Microservices */}
        <Phase active={phase === 1}>
          <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #3b82f6 30%, transparent)", boxShadow: "0 0 30px color-mix(in srgb, #3b82f6 30%, transparent)", zIndex: 10, position: "relative" }}>
            <GitMerge size={32} style={{ color: "#3b82f6" }} />
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="animate-float"       style={{ ...S.node, position: "absolute", top: "15%",    right: "30%" }}><Server size={14} style={{ color: "#14b8a6" }} /></div>
            <div className="animate-float-delay" style={{ ...S.node, position: "absolute", bottom: "15%", left: "30%"  }}><Server size={14} style={{ color: "#14b8a6" }} /></div>
            <div className="animate-float"       style={{ ...S.node, position: "absolute", top: "35%",    right: "12%" }}><Box    size={14} style={{ color: "#8b5cf6" }} /></div>
            <div className="animate-float-delay" style={{ ...S.node, position: "absolute", bottom: "35%", left: "12%"  }}><Box    size={14} style={{ color: "#8b5cf6" }} /></div>
            <div className="animate-float"       style={{ ...S.node, position: "absolute", top: "15%",    left: "30%"  }}><Cpu    size={14} style={{ color: "#f43f5e" }} /></div>
            <div className="animate-float-delay" style={{ ...S.node, position: "absolute", bottom: "15%", right: "30%" }}><Cpu    size={14} style={{ color: "#f43f5e" }} /></div>
          </div>

          <div className="animate-scan" style={{
            position: "absolute", width: "75%", height: "2px",
            background: "#3b82f6",
            boxShadow: "0 0 10px #3b82f6, 0 0 20px #3b82f6",
            zIndex: 15,
          }} />

          <Activity size={48} style={{ position: "absolute", color: "color-mix(in srgb, #3b82f6 15%, transparent)", zIndex: 5 }} />
        </Phase>

        {/* Phase 2 — Aggregated Results Dashboard */}
        <Phase active={phase === 2} translateY={20}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ position: "relative" }}>
              <div style={S.resultCard}>
                <BarChart2 size={48} style={{ color: "#3b82f6" }} />
              </div>
              <div style={{ position: "absolute", bottom: "-6px", right: "-6px", background: "var(--color-surface)", borderRadius: "9999px", padding: "2px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "#3b82f6", letterSpacing: "0.08em" }}>HEALTH AGGREGATED</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-muted)" }}>1.5 h → 5 min</span>
            </div>
          </div>
        </Phase>

      </div>
      <TimelineBar phase={phase} loopKey={loopKey} />
    </div>
  );
}
