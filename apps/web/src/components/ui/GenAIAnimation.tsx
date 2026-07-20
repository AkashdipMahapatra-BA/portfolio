"use client";
import { useState, useEffect, useRef } from "react";
import {
  Bot, Brain, Search, Database, ShieldCheck, User,
  MessageSquare, Sparkles, CheckCircle2, ArrowRight, BookOpen,
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
  node: (color: string) => ({
    background: "var(--color-surface)", padding: "0.5rem", borderRadius: "0.5rem",
    border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
    boxShadow: `0 0 15px color-mix(in srgb, ${color} 20%, transparent)`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }),
  resultCard: {
    background: "color-mix(in srgb, #8b5cf6 8%, var(--color-surface))",
    border: "1px solid color-mix(in srgb, #8b5cf6 30%, transparent)",
    borderRadius: "1rem", padding: "1.5rem", display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: "0 0 40px color-mix(in srgb, #8b5cf6 20%, transparent)",
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

export default function GenAIAnimation() {
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

        {/* Phase 0 — NL Query → IAM Auth → Agent */}
        <Phase active={phase === 0} translateY={-10}>
          <div key={`p0-${loopKey}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", justifyContent: "center" }}>

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "0ms" }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #3b82f6 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #3b82f6 20%, transparent)" }}>
                <User size={24} style={{ color: "#3b82f6" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#3b82f6", fontWeight: 700, marginTop: "0.4rem" }}>NL QUERY</span>
            </div>

            <ArrowRight size={14} className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "200ms", opacity: 0 }} />

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "400ms", opacity: 0 }}>
              <div style={{ ...S.circle, padding: "0.75rem", border: "1px solid color-mix(in srgb, #10b981 30%, transparent)", boxShadow: "0 0 16px color-mix(in srgb, #10b981 20%, transparent)" }}>
                <ShieldCheck size={20} style={{ color: "#10b981" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#10b981", fontWeight: 700, marginTop: "0.4rem" }}>IAM AUTH</span>
            </div>

            <ArrowRight size={14} className="animate-pop-in"
              style={{ color: "var(--color-accent)", flexShrink: 0, animationDelay: "600ms", opacity: 0 }} />

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", animationDelay: "800ms", opacity: 0 }}>
              <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #a855f7 30%, transparent)", boxShadow: "0 0 20px color-mix(in srgb, #a855f7 20%, transparent)" }}>
                <Bot size={26} style={{ color: "#a855f7" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#a855f7", fontWeight: 700, marginTop: "0.4rem" }}>AGENT</span>
            </div>

          </div>
        </Phase>

        {/* Phase 1 — Agent orchestrates Bedrock + Vector DB + Memory + Runbooks */}
        <Phase active={phase === 1}>
          {/* Centre orchestrator */}
          <div style={{ ...S.circle, border: "1px solid color-mix(in srgb, #a855f7 40%, transparent)", boxShadow: "0 0 30px color-mix(in srgb, #a855f7 30%, transparent)", zIndex: 10, position: "relative" }}>
            <Bot size={34} style={{ color: "#a855f7" }} />
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Bedrock — top centre */}
            <div className="animate-float" style={{ position: "absolute", top: "12%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <div style={S.node("#8b5cf6")}><Brain size={18} style={{ color: "#8b5cf6" }} /></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#8b5cf6" }}>BEDROCK</span>
            </div>
            {/* Vector DB — bottom right */}
            <div className="animate-float-delay" style={{ position: "absolute", bottom: "14%", right: "20%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <div style={S.node("#0ea5e9")}><Search size={16} style={{ color: "#0ea5e9" }} /></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#0ea5e9" }}>VECTOR DB</span>
            </div>
            {/* Memory — bottom left */}
            <div className="animate-float" style={{ position: "absolute", bottom: "14%", left: "20%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <div style={S.node("#3b82f6")}><Database size={16} style={{ color: "#3b82f6" }} /></div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#3b82f6" }}>MEMORY</span>
            </div>
            {/* Runbooks — top right */}
            <div className="animate-float-delay" style={{ position: "absolute", top: "22%", right: "14%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", opacity: 0.8 }}>
              <div style={{ background: "var(--color-surface)", padding: "0.4rem", borderRadius: "0.5rem", border: "1px solid var(--color-border)", display: "flex" }}>
                <BookOpen size={14} style={{ color: "var(--color-muted)" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "var(--color-muted)" }}>RUNBOOKS</span>
            </div>
          </div>

          {/* Roaming search glass to show retrieval */}
          <div className="animate-roam" style={{
            position: "absolute", zIndex: 20, color: "#a855f7",
            background: "color-mix(in srgb, #a855f7 12%, transparent)",
            padding: "0.6rem", borderRadius: "9999px", backdropFilter: "blur(8px)",
            border: "1px solid color-mix(in srgb, #a855f7 40%, transparent)",
            boxShadow: "0 0 20px color-mix(in srgb, #a855f7 40%, transparent)",
          }}>
            <Search size={20} />
          </div>
        </Phase>

        {/* Phase 2 — AI synthesis complete */}
        <Phase active={phase === 2} translateY={10}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>

            <div className="animate-pop-in" style={{ display: "flex", alignItems: "center", gap: "0.75rem", animationDelay: "0ms" }}>
              <Brain size={20} style={{ color: "#8b5cf6" }} />
              <ArrowRight size={14} style={{ color: "var(--color-accent)" }} />
              <MessageSquare size={22} style={{ color: "#a855f7" }} />
            </div>

            <div className="animate-pop-in" style={{ position: "relative", animationDelay: "300ms", opacity: 0 }}>
              <div style={S.resultCard}>
                <Sparkles size={48} style={{ color: "#a855f7" }} />
              </div>
              <div style={{ position: "absolute", bottom: "-6px", right: "-6px", background: "var(--color-surface)", borderRadius: "9999px", padding: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
              </div>
            </div>

            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", animationDelay: "600ms", opacity: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "#a855f7", letterSpacing: "0.08em" }}>AI SYNTHESIS COMPLETE</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-muted)" }}>Manual search → Instant RAG</span>
            </div>

          </div>
        </Phase>

      </div>
      <TimelineBar phase={phase} loopKey={loopKey} loopDuration={phaseDuration * TOTAL_PHASES} />
    </div>
  );
}
