"use client";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";

const contactStyles = `
  @keyframes orbit-spin {
    0%   { transform: rotate(0deg)   translateY(-7px) rotate(0deg); }
    50%  { transform: rotate(180deg) translateY(-7px) rotate(-180deg); }
    100% { transform: rotate(360deg) translateY(-7px) rotate(-360deg); }
  }
  @keyframes orbit-spin-r {
    0%   { transform: rotate(0deg)    translateY(6px) rotate(0deg); }
    50%  { transform: rotate(-180deg) translateY(6px) rotate(180deg); }
    100% { transform: rotate(-360deg) translateY(6px) rotate(360deg); }
  }

  /* ── Desktop: two-column grid ── */
  .contact-outer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: 3rem;
    align-items: start;
  }

  /* ── Mobile (≤ 640px): single column, stacked ── */
  @media (max-width: 640px) {
    .contact-outer {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .contact-photo-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.25rem;
    }
    .contact-meta-list {
      flex: 1;
    }
    .contact-form-card {
      width: 100%;
      box-sizing: border-box;
    }
  }

  /* ── Tablet (641px – 900px): photo left, meta right inline ── */
  @media (min-width: 641px) and (max-width: 900px) {
    .contact-photo-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
    }
    .contact-meta-list {
      flex: 1;
    }
  }

  /* ── Desktop (> 900px): photo below meta, centered ── */
  @media (min-width: 901px) {
    .contact-photo-meta {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
  }
`;

/* ─── Squiggly ring helpers ───────────────────────────────────────────── */

// Build a wavy closed path around a circle — shape is fixed per lap, not per frame
function buildSquigglyPath(cx: number, cy: number, r: number, seed: number): string {
  const rng = (n: number) => Math.abs(Math.sin(seed * 9301 + n * 49297) % 1);
  const waves = 11;
  const steps = waves * 10;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const wavePhase = (i / steps) * waves * Math.PI * 2;
    const amp = 4 + rng(i) * 4;
    const offset = amp * Math.sin(wavePhase);
    const pr = r + offset;
    pts.push([cx + pr * Math.cos(angle), cy + pr * Math.sin(angle)]);
  }
  const first = pts[0]!;
  let d = `M ${first[0].toFixed(2)} ${first[1].toFixed(2)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const n = pts[i + 1]!;
    const mx = (p[0] + n[0]) / 2;
    const my = (p[1] + n[1]) / 2;
    d += ` Q ${p[0].toFixed(2)} ${p[1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

function ProfilePhoto({ size = 140 }: { size?: number }) {
  const r1 = size / 2 + 12;
  const r2 = size / 2 + 20;
  const total = (r2 + 8) * 2;
  const cx = total / 2;
  const cy = total / 2;

  const pathRef = useRef<SVGPathElement>(null);
  const [squigglyActive, setSquigglyActive] = useState(false);
  const [strokeColor, setStrokeColor] = useState("var(--color-accent)");

  useEffect(() => {
    let animId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const pickColor = () => {
      const isDark = document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      // dark: 80% accent (blue), 20% yellow; light: 80% yellow, 20% accent
      const useYellow = isDark ? Math.random() < 0.2 : Math.random() < 0.8;
      return useYellow ? "#f5c518" : "var(--color-accent)";
    };

const runSquiggly = () => {
      if (!pathRef.current) { scheduleNext(); return; }

      const color = pickColor();
      setStrokeColor(color);
      setSquigglyActive(true);

      const laps = 1 + Math.floor(Math.random() * 3);
      let lapsLeft = laps;

      const startLap = () => {
        if (!pathRef.current) { setSquigglyActive(false); scheduleNext(); return; }

        const seed = Math.random() * 1000;
        pathRef.current.setAttribute("d", buildSquigglyPath(cx, cy, r2 - 4, seed));
        const len = pathRef.current.getTotalLength();
        const speed = 1.2 + Math.random() * 2.0; // deg/frame, random per lap

        // arc length visible = fraction of full circumference
        // arcLen grows during phase1, shrinks during phase2
        // dashoffset shifts the start point of the visible arc forward
        let headDeg = 0;  // how far the head has travelled (0→360)
        let tailDeg = 0;  // how far the tail has travelled (0→360, lags behind head)
        let phase: "draw" | "erase" = "draw";

        const tick = () => {
          if (!pathRef.current) { setSquigglyActive(false); scheduleNext(); return; }

          if (phase === "draw") {
            headDeg = Math.min(headDeg + speed, 360);
            // arc = from tailDeg to headDeg
            const arcLen = ((headDeg - tailDeg) / 360) * len;
            const offset = len - (tailDeg / 360) * len;
            pathRef.current.style.strokeDasharray = `${arcLen} ${len - arcLen}`;
            pathRef.current.style.strokeDashoffset = `${offset}`;

            if (headDeg >= 360) phase = "erase";
            animId = requestAnimationFrame(tick);

          } else {
            // tail catches up to head (head is fixed at 360 = start point)
            tailDeg = Math.min(tailDeg + speed, 360);
            const arcLen = Math.max(((360 - tailDeg) / 360) * len, 0);
            const offset = len - (tailDeg / 360) * len;
            pathRef.current.style.strokeDasharray = `${arcLen} ${len - arcLen}`;
            pathRef.current.style.strokeDashoffset = `${offset}`;

            if (tailDeg >= 360) {
              lapsLeft--;
              if (lapsLeft > 0) {
                animId = requestAnimationFrame(startLap);
              } else {
                setSquigglyActive(false);
                scheduleNext();
              }
              return;
            }
            animId = requestAnimationFrame(tick);
          }
        };
        animId = requestAnimationFrame(tick);
      };

      startLap();
    };

    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 8000;
      timeoutId = setTimeout(runSquiggly, delay);
    };

    timeoutId = setTimeout(runSquiggly, 1000 + Math.random() * 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative", width: total, height: total, flexShrink: 0 }}>

      <svg
        width={total} height={total}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
      >
        {/* outer dashed ring — hidden during squiggly */}
        {!squigglyActive && (
          <circle cx={cx} cy={cy} r={r2}
            fill="none"
            stroke="color-mix(in srgb, var(--color-accent) 30%, transparent)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}
        {/* inner dashed ring — always visible */}
        <circle cx={cx} cy={cy} r={r1}
          fill="none"
          stroke="color-mix(in srgb, var(--color-accent) 18%, transparent)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        {/* squiggly ring — drawn progressively via dashoffset */}
        <path
          ref={pathRef}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 1.5px ${strokeColor})`,
            opacity: squigglyActive ? 0.95 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </svg>

      {/* orbiting dots — hidden during squiggly */}
      {!squigglyActive && [0, 1, 2].map((i) => (
        <div key={`o${i}`} style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: r2 * 2, height: r2 * 2,
          marginTop: -r2, marginLeft: -r2,
          borderRadius: "50%",
          animation: `orbit-spin 2.4s ease-in-out ${i * 0.8}s infinite`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "50%",
            width: 8, height: 8,
            marginLeft: -4, marginTop: -4,
            borderRadius: "50%",
            background: "var(--color-accent)",
            boxShadow: "0 0 8px var(--color-accent)",
          }} />
        </div>
      ))}
      {!squigglyActive && [0, 1].map((i) => (
        <div key={`i${i}`} style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: r1 * 2, height: r1 * 2,
          marginTop: -r1, marginLeft: -r1,
          borderRadius: "50%",
          animation: `orbit-spin-r 3.2s ease-in-out ${i * 1.6}s infinite`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "50%",
            width: 6, height: 6,
            marginLeft: -3, marginTop: -3,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-accent) 70%, white)",
            boxShadow: "0 0 6px var(--color-accent)",
          }} />
        </div>
      ))}

      {/* photo */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: size, height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid color-mix(in srgb, var(--color-accent) 50%, transparent)",
        boxShadow: "0 0 10px color-mix(in srgb, var(--color-accent) 12%, transparent), 3px 4px 0px rgba(0,0,0,0.10)",
        filter: "saturate(1.1) contrast(1.05)",
      }}>
        <img
          src="/img/akashdip.jpg"
          alt="Akashdip Mahapatra"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
    </div>
  );
}

const META = [
  { label: "Location",      value: "Chennai, India" },
  { label: "Availability",  value: "Open to opportunities" },
  { label: "Response time", value: "< 24 hours" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      style={{ padding: "5rem 1.5rem 6rem", maxWidth: "72rem", margin: "0 auto" }}
    >
      <style>{contactStyles}</style>

      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Get In Touch
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      <div className="contact-outer">

        {/* ── Left column ── */}
        <div>
          {/* Heading + description — always on top */}
          <h2 style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            lineHeight: 1.3,
            marginBottom: "1rem",
          }}>
            Let's build something{" "}
            <span style={{ color: "var(--color-accent)" }}>together.</span>
          </h2>
          <p style={{
            fontSize: "0.9rem",
            color: "var(--color-muted)",
            lineHeight: 1.75,
            marginBottom: "1.75rem",
          }}>
            Open to senior DevOps / Data Engineering roles, cloud architecture
            consulting, and Agentic AI projects. Drop me a message and I'll
            respond within 24 hours.
          </p>

          {/* Photo + meta — responsive via CSS class */}
          <div className="contact-photo-meta">
            {/* Photo — on mobile/tablet sits on the RIGHT via order */}
            <div style={{ order: 2 }}>
              <ProfilePhoto size={130} />
            </div>

            {/* Meta — on mobile/tablet sits on the LEFT */}
            <div className="contact-meta-list" style={{ order: 1, alignSelf: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {META.map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--color-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      minWidth: "6.5rem",
                      flexShrink: 0,
                    }}>
                      {label}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-text)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column: form ── */}
        <div className="card contact-form-card" style={{ padding: "1.75rem" }}>
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
