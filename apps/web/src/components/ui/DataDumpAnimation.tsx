"use client";
import { useState, useEffect, useRef } from "react";
import {
  Clock, Terminal, Database, Shield, FolderDown,
  CloudUpload, CheckCircle2, ArrowRight, FastForward,
} from "lucide-react";
import { useRandomAnimation } from "@/hooks/useRandomAnimation";

const PHASE_DURATION = 3500;
const TOTAL_PHASES = 3;

const S = {
  root: {
    width: "100%", height: "100%", minHeight: "160px", borderRadius: "0.5rem",
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
    background: "color-mix(in srgb, #06b6d4 8%, var(--color-surface))",
    border: "1px solid color-mix(in srgb, #06b6d4 30%, transparent)",
    borderRadius: "1rem", padding: "1.5rem", display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: "0 0 40px color-mix(in srgb, #06b6d4 20%, transparent)",
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

function TimelineBar({ phase, loopKey, loopDuration }: { phase: number; loopKey: number; loopDuration: number }) {
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
        animation: `progress-bar ${loopDuration}ms linear forwards`, opacity: 0.7,
      }} />
    </div>
  );
}

export default function DataDumpAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { phase, loopKey, phaseDuration } = useRandomAnimation(TOTAL_PHASES, PHASE_DURATION);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        setScale(h < 190 ? h / 190 : 1);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={S.root} ref={containerRef}>
      <div style={S.grid} />
      <div style={{ ...S.stage, transform: `scale(${scale})`, transformOrigin: "center center", transition: "transform 0.1s ease-out" }}>

        {/* Phase 0 — Cron Trigger → Python Lambda */}
        <Phase active={phase === 0} translateY={-10}>
          <div key={`p0-${loopKey}`} style={{ display: "flex", alignItems: "center", gap: "1.5rem", width: "100%", justifyContent: "center" }}>

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "0ms" }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #a855f7 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #a855f7 20%, transparent)" }}>
                <Clock size={28} style={{ color: "#a855f7" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#a855f7", fontWeight: 700, marginTop: "0.5rem" }}>06:00 UTC</span>
            </div>

            <ArrowRight size={20} className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "300ms", opacity: 0 }} />

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "600ms", opacity: 0 }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #f97316 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #f97316 20%, transparent)" }}>
                <Terminal size={28} style={{ color: "#f97316" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#f97316", fontWeight: 700, marginTop: "0.5rem" }}>PYTHON 3.11</span>
            </div>

          </div>
        </Phase>

        {/* Phase 1 — Parallel fan-out: Credentials → Oracle DB → /tmp/ */}
        <Phase active={phase === 1}>
          <div key={`p1-${loopKey}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", width: "100%" }}>

            {/* Orchestrator node */}
            <div className="animate-pop-in" style={{ ...S.node, animationDelay: "0ms" }}>
              <Terminal size={20} style={{ color: "#f97316" }} />
            </div>

            {/* Branch lines drawn with inline divs */}
            <div className="animate-pop-in" style={{ position: "relative", width: "160px", height: "20px", animationDelay: "200ms", opacity: 0 }}>
              {/* horizontal bar */}
              <div style={{ position: "absolute", top: 0, left: "16.5%", width: "67%", height: "2px", background: "color-mix(in srgb, var(--color-muted) 40%, transparent)" }} />
              {/* left drop */}
              <div style={{ position: "absolute", top: 0, left: "16.5%", width: "2px", height: "100%", background: "color-mix(in srgb, var(--color-muted) 40%, transparent)" }} />
              {/* center drop */}
              <div style={{ position: "absolute", top: 0, left: "50%", width: "2px", height: "100%", background: "color-mix(in srgb, var(--color-muted) 40%, transparent)" }} />
              {/* right drop */}
              <div style={{ position: "absolute", top: 0, right: "16.5%", width: "2px", height: "100%", background: "color-mix(in srgb, var(--color-muted) 40%, transparent)" }} />
            </div>

            {/* Three parallel nodes */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", justifyContent: "center" }}>
              <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", animationDelay: "400ms", opacity: 0 }}>
                <div style={S.node}><Shield size={18} style={{ color: "#eab308" }} /></div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--color-muted)" }}>CREDENTIALS</span>
              </div>
              <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", animationDelay: "550ms", opacity: 0 }}>
                <div style={S.node}><Database size={18} style={{ color: "#3b82f6" }} /></div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--color-muted)" }}>ORACLE DB</span>
              </div>
              <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", animationDelay: "700ms", opacity: 0 }}>
                <div style={S.node}><FolderDown size={18} style={{ color: "#10b981" }} /></div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--color-muted)" }}>S3/FOLDER</span>
              </div>
            </div>

          </div>
        </Phase>

        {/* Phase 2 — /tmp/ → S3 Upload complete */}
        <Phase active={phase === 2} translateY={10}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>

            <div className="animate-pop-in" style={{ display: "flex", alignItems: "center", gap: "0.75rem", animationDelay: "0ms" }}>
              <FolderDown size={20} style={{ color: "#10b981" }} />
              <ArrowRight size={16} style={{ color: "var(--color-accent)" }} />
              <CloudUpload size={22} style={{ color: "#0ea5e9" }} />
            </div>

            <div className="animate-pop-in" style={{ position: "relative", animationDelay: "300ms", opacity: 0 }}>
              <div style={S.resultCard}>
                <FastForward size={48} style={{ color: "#06b6d4" }} />
              </div>
              <div style={{ position: "absolute", bottom: "-6px", right: "-6px", background: "var(--color-surface)", borderRadius: "9999px", padding: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              </div>
            </div>

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", animationDelay: "600ms", opacity: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "#06b6d4", letterSpacing: "0.08em" }}>TARGET S3 UPLOAD</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-muted)" }}>30 min → 2 min (93% faster)</span>
            </div>

          </div>
        </Phase>

      </div>
      <TimelineBar phase={phase} loopKey={loopKey} loopDuration={phaseDuration * TOTAL_PHASES} />
    </div>
  );
}
