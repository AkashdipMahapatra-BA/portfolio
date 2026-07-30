"use client";

import { useEffect, useState, useRef } from "react";

import { THREAD_COLORS } from "@/lib/theme";

export function EducationThreads({
  onAbsorption,
}: {
  onAbsorption?: () => void;
}) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setInView(true);
          // Trigger Agentic Conic Rotating Border Glow right when thread heads absorb into IT button (~4.5s)
          const t = setTimeout(() => {
            if (onAbsorption) onAbsorption();
          }, 4500);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0, rootMargin: "250px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onAbsorption]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "visible",
      }}
    >
      {/* Reduced Intensity Glass Edge Reflection for Point 6 (Top Border Edge) */}
      {inView && <div className="edu-glass-edge-point6" aria-hidden="true" />}
      {/* Reduced Intensity Glass Edge Reflection for Point 7 (Left Border Wall) */}
      {inView && <div className="edu-glass-edge-point7" aria-hidden="true" />}

      {/* ── DESKTOP THREADS (Point 5 -> 6, Point 7 -> 8 Curved Loop with Hero Levitation & Speed) ── */}
      <svg
        className="edu-threads-desktop"
        viewBox="0 0 1150 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
        }}
      >
        {/* 1. Point 5 -> Point 6 Stream: 15 dense randomized color threads with longer tails starting deep in Showcase section (y=-180) & terminating at top border edge of card (y=0, wide 300px gap x=420..720) */}
        <g className={`edu-grp1-container ${inView ? "animate" : ""}`}>
          <path d="M 100,-180 C 180,-100 420,-40 420,0" stroke="#FACC15" strokeWidth="2.6" strokeLinecap="round" className="edu-path thread-glow-path string-indep-1" />
          <path d="M 140,-180 C 210,-100 440,-40 440,0" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" className="edu-path thread-glow-path string-indep-2" />
          <path d="M 180,-180 C 240,-100 460,-40 460,0" stroke="#10B981" strokeWidth="2.4" strokeLinecap="round" className="edu-path thread-glow-path string-indep-3" />

          <path d="M 280,-180 C 330,-100 480,-40 480,0" stroke="#EF4444" strokeWidth="2.7" strokeLinecap="round" className="edu-path thread-glow-path string-indep-4" />
          <path d="M 320,-180 C 360,-100 500,-40 500,0" stroke="#FACC15" strokeWidth="2.9" strokeLinecap="round" className="edu-path thread-glow-path string-indep-5" />
          <path d="M 360,-180 C 390,-100 520,-40 520,0" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" className="edu-path thread-glow-path string-indep-6" />
          <path d="M 400,-180 C 420,-100 540,-40 540,0" stroke="#06B6D4" strokeWidth="2.3" strokeLinecap="round" className="edu-path thread-glow-path string-indep-7" />

          <path d="M 540,-180 C 545,-100 560,-40 560,0" stroke="#F97316" strokeWidth="2.6" strokeLinecap="round" className="edu-path thread-glow-path string-indep-1" />
          <path d="M 580,-180 C 580,-100 585,-40 585,0" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" className="edu-path thread-glow-path string-indep-2" />
          <path d="M 620,-180 C 615,-100 610,-40 610,0" stroke="#10B981" strokeWidth="2.4" strokeLinecap="round" className="edu-path thread-glow-path string-indep-3" />
          <path d="M 660,-180 C 640,-100 630,-40 630,0" stroke="#FACC15" strokeWidth="2.7" strokeLinecap="round" className="edu-path thread-glow-path string-indep-4" />

          <path d="M 800,-180 C 760,-100 660,-40 660,0" stroke="#A855F7" strokeWidth="2.8" strokeLinecap="round" className="edu-path thread-glow-path string-indep-5" />
          <path d="M 860,-180 C 800,-100 680,-40 680,0" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" className="edu-path thread-glow-path string-indep-6" />
          <path d="M 920,-180 C 850,-100 700,-40 700,0" stroke="#06B6D4" strokeWidth="2.6" strokeLinecap="round" className="edu-path thread-glow-path string-indep-7" />
          <path d="M 980,-180 C 900,-100 720,-40 720,0" stroke="#EF4444" strokeWidth="2.3" strokeLinecap="round" className="edu-path thread-glow-path string-indep-1" />
        </g>

        {/* 2. Point 7 -> Point 8 Stream: Re-emerges from behind left border wall at Point 7 (x=0) with organic random gaps (y=295..415), looping in a single ultra-smooth continuous arc into IT Button left edge (x=60, y=195) */}
        <g className={`edu-grp2-container ${inView ? "animate" : ""}`}>
          <path d="M 0,295 C -100,295 -40,140 60,195" stroke={THREAD_COLORS[0]} strokeWidth="2.5" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-1" />
          <path d="M 0,302 C -105,302 -38,142 62,195" stroke={THREAD_COLORS[1]} strokeWidth="2.8" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-2" />
          <path d="M 0,322 C -110,322 -36,144 64,195" stroke={THREAD_COLORS[2]} strokeWidth="2.5" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-3" />
          <path d="M 0,328 C -115,328 -34,146 66,195" stroke={THREAD_COLORS[3]} strokeWidth="2.6" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-4" />
          <path d="M 0,355 C -120,355 -32,148 68,195" stroke={THREAD_COLORS[4]} strokeWidth="2.4" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-5" />
          <path d="M 0,385 C -125,385 -30,150 70,195" stroke={THREAD_COLORS[5]} strokeWidth="2.7" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-6" />
          <path d="M 0,392 C -130,392 -28,152 72,195" stroke={THREAD_COLORS[6]} strokeWidth="2.3" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-7" />
          <path d="M 0,415 C -135,415 -26,154 74,195" stroke={THREAD_COLORS[1]} strokeWidth="2.6" strokeLinecap="round" className="edu-path-grp2 thread-glow-path string-indep-1" />
        </g>
      </svg>

      {/* ── MOBILE THREADS (Point 5 -> Point 6: S-curve from Showcase into IT button top-right, replicating desktop Point 8 absorption) ── */}
      <svg
        className="edu-threads-mobile"
        viewBox="0 0 380 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
        }}
      >
        <g className={`edu-grp1-container-mobile ${inView ? "animate" : ""}`}>
          {/* 7 threads: wide spread at top (Point 5), sweep right, converge exactly at 1st IT button top-right (x~260, y~118) */}
          <path d="M 30,-100 C 120,-20 320,30 260,118" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-1" />
          <path d="M 80,-100 C 160,-10 330,40 261,119" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-2" />
          <path d="M 140,-100 C 200,0 340,50 262,120" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-3" />
          <path d="M 200,-100 C 240,10 350,60 263,121" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-4" />
          <path d="M 260,-100 C 280,20 360,70 264,122" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-5" />
          <path d="M 310,-100 C 310,30 370,80 265,123" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-6" />
          <path d="M 355,-100 C 340,40 380,90 266,124" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" className="edu-path-mob thread-glow-path-sm string-indep-7" />
        </g>
      </svg>

      <style>{`
        .edu-threads-desktop { display: block; }
        .edu-threads-mobile { display: none; }

        @media (max-width: 640px), (pointer: coarse) and (orientation: portrait) {
          .edu-threads-desktop { display: none; }
          .edu-threads-mobile { display: block; }
        }

        /* ── PHASE 1: POINT 5 -> POINT 6 (Draws, Holds & Levitates in Air - Same smooth 9s speed as Hero) ── */
        @keyframes draw-hold-vanish-edu-grp1 {
          0% {
            stroke-dasharray: 750;
            stroke-dashoffset: 750;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          30% {
            stroke-dasharray: 750;
            stroke-dashoffset: 0;
            opacity: 1;
          }
          75% {
            stroke-dasharray: 750;
            stroke-dashoffset: 0;
            opacity: 1;
          }
          95%, 100% {
            stroke-dasharray: 750;
            stroke-dashoffset: -750;
            opacity: 0;
          }
        }

        /* ── PHASE 2: POINT 7 -> POINT 8 (Curved Loop into IT Button, Continuous Slow Drift & Absorption) ── */
        @keyframes draw-vanish-edu-grp2 {
          0%, 35% {
            stroke-dasharray: 850;
            stroke-dashoffset: 850;
            opacity: 0;
          }
          42% {
            opacity: 1;
          }
          65% {
            stroke-dasharray: 850;
            stroke-dashoffset: 80;
            opacity: 1;
          }
          85% {
            stroke-dasharray: 850;
            stroke-dashoffset: -200;
            opacity: 0.9;
          }
          100% {
            stroke-dasharray: 850;
            stroke-dashoffset: -850;
            opacity: 0;
          }
        }

        /* ── INDEPENDENT LEVITATING / FLOATING MOTIONS ── */
        .edu-path {
          stroke-dasharray: 750;
          stroke-dashoffset: 750;
          opacity: 0;
          transform-origin: 575px 0px;
        }

        .edu-path-grp2 {
          stroke-dasharray: 850;
          stroke-dashoffset: 850;
          opacity: 0;
          transform-origin: 0px 340px;
        }

        .edu-path-mob {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          opacity: 0;
        }

        /* ── MOBILE ANIMATION: Replicates desktop Point 8 absorption ── */
        /* Thread draws forward, reaches button, then slides THROUGH into button (negative dashoffset = absorption) */
        @keyframes draw-absorb-edu-mob {
          0% {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          50% {
            stroke-dasharray: 600;
            stroke-dashoffset: 80;
            opacity: 1;
          }
          75% {
            stroke-dasharray: 600;
            stroke-dashoffset: -180;
            opacity: 0.85;
          }
          100% {
            stroke-dasharray: 600;
            stroke-dashoffset: -600;
            opacity: 0;
          }
        }

        .edu-grp1-container-mobile.animate .string-indep-1 { animation: draw-absorb-edu-mob 8s ease-in-out 0.05s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-2 { animation: draw-absorb-edu-mob 8s ease-in-out 0.10s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-3 { animation: draw-absorb-edu-mob 8s ease-in-out 0.15s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-4 { animation: draw-absorb-edu-mob 8s ease-in-out 0.20s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-5 { animation: draw-absorb-edu-mob 8s ease-in-out 0.25s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-6 { animation: draw-absorb-edu-mob 8s ease-in-out 0.30s forwards; }
        .edu-grp1-container-mobile.animate .string-indep-7 { animation: draw-absorb-edu-mob 8s ease-in-out 0.35s forwards; }

        .edu-grp1-container.animate .string-indep-1 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.05s forwards, float-string-up-1 3.4s ease-in-out 1.5s infinite; }
        .edu-grp1-container.animate .string-indep-2 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.08s forwards, float-string-down-2 4.2s ease-in-out 1.6s infinite; }
        .edu-grp1-container.animate .string-indep-3 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.11s forwards, float-string-up-3 5.1s ease-in-out 1.7s infinite; }
        .edu-grp1-container.animate .string-indep-4 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.14s forwards, float-string-down-4 3.1s ease-in-out 1.5s infinite; }
        .edu-grp1-container.animate .string-indep-5 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.17s forwards, float-string-up-5 4.6s ease-in-out 1.8s infinite; }
        .edu-grp1-container.animate .string-indep-6 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.20s forwards, float-string-down-6 5.5s ease-in-out 1.6s infinite; }
        .edu-grp1-container.animate .string-indep-7 { animation: draw-hold-vanish-edu-grp1 9s ease-in-out 0.23s forwards, float-string-up-7 3.8s ease-in-out 1.9s infinite; }

        .edu-grp2-container.animate .string-indep-1 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.05s forwards, float-string-down-2 3.8s ease-in-out 3.5s infinite; }
        .edu-grp2-container.animate .string-indep-2 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.08s forwards, float-string-up-1 4.5s ease-in-out 3.6s infinite; }
        .edu-grp2-container.animate .string-indep-3 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.11s forwards, float-string-down-6 5.3s ease-in-out 3.4s infinite; }
        .edu-grp2-container.animate .string-indep-4 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.14s forwards, float-string-up-3 3.3s ease-in-out 3.7s infinite; }
        .edu-grp2-container.animate .string-indep-5 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.17s forwards, float-string-down-4 4.8s ease-in-out 3.5s infinite; }
        .edu-grp2-container.animate .string-indep-6 { animation: draw-vanish-edu-grp2 9s ease-in-out 0.20s forwards, float-string-up-5 5.0s ease-in-out 3.8s infinite; }
        .edu-grp2-container.animate .string-indep-7 { animation: draw-vanish-grp2 9s ease-in-out 0.23s forwards, float-string-up-7 3.6s ease-in-out 3.3s infinite; }

        /* ── REDUCED INTENSITY GLASS EDGE REFLECTIONS (POINT 6 & POINT 7) ── */
        @keyframes glass-reflection-point6 {
          0% { opacity: 0; filter: blur(4px); }
          20%, 75% { opacity: 0.45; filter: blur(0px); }
          95%, 100% { opacity: 0; filter: blur(6px); }
        }

        @keyframes glass-reflection-point7 {
          0%, 35% { opacity: 0; filter: blur(4px); }
          45%, 85% { opacity: 0.45; filter: blur(0px); }
          95%, 100% { opacity: 0; filter: blur(6px); }
        }

        .edu-glass-edge-point6 {
          position: absolute;
          top: 0;
          left: 35%;
          width: 360px;
          height: 45px;
          pointer-events: none;
          z-index: 12;
          opacity: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(250, 204, 21, 0.35) 0%, rgba(239, 68, 68, 0.25) 30%, rgba(168, 85, 247, 0.15) 60%, transparent 85%);
          box-shadow: inset 0px 2px 8px rgba(250, 204, 21, 0.25);
          -webkit-mask: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%);
          mask: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%);
          animation: glass-reflection-point6 6.5s ease-in-out 1.1s both;
        }

        .edu-glass-edge-point7 {
          position: absolute;
          top: 270px;
          left: 0;
          width: 45px;
          height: 150px;
          pointer-events: none;
          z-index: 12;
          opacity: 0;
          background: radial-gradient(ellipse at 0% 50%, rgba(6, 182, 212, 0.35) 0%, rgba(16, 185, 129, 0.25) 35%, rgba(249, 115, 22, 0.2) 70%, transparent 100%);
          box-shadow: inset 2px 0px 8px rgba(6, 182, 212, 0.3);
          -webkit-mask: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
          mask: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
          animation: glass-reflection-point7 5.5s ease-in-out 2.9s both;
        }
      `}</style>
    </div>
  );
}
