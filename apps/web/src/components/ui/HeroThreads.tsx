"use client";

import { useEffect, useState } from "react";

import { THREAD_COLORS } from "@/lib/theme";

export function HeroThreads({ active }: { active: boolean }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.7;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollProgress * 1.3, 0);
  const blurAmount = scrollProgress * 10;

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        opacity,
        filter: `blur(${blurAmount}px)`,
        transition: "filter 0.3s ease-out, opacity 0.3s ease-out",
      }}
    >
      {/* ── DESKTOP THREADS (Reduced gap at Point 2 & matching tight gap at Point 3) ── */}
      <svg
        className="hero-threads-desktop"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* ── SEGMENT 1 (Point 1 -> Point 2): Tight 1cm origin at Point 1, bulging middle belly, sleek reduced gap at Point 2 (y=210..250) ── */}
        <g className="hero-grp1-container">
          {/* Thread 1 - Cyan */}
          <path
            d="M 0,195 C 130,90 230,120 360,210"
            stroke={THREAD_COLORS[0]}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-1"
          />
          {/* Thread 2 - Yellow */}
          <path
            d="M 0,200 C 120,290 240,240 360,218"
            stroke={THREAD_COLORS[1]}
            strokeWidth="3.0"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-2"
          />
          {/* Thread 3 - Red */}
          <path
            d="M 0,205 C 140,110 220,310 360,225"
            stroke={THREAD_COLORS[2]}
            strokeWidth="2.6"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-3"
          />
          {/* Thread 4 - Green */}
          <path
            d="M 0,202 C 150,160 210,250 360,232"
            stroke={THREAD_COLORS[3]}
            strokeWidth="2.8"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-4"
          />
          {/* Thread 5 - Orange */}
          <path
            d="M 0,208 C 110,310 250,190 360,238"
            stroke={THREAD_COLORS[4]}
            strokeWidth="2.4"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-5"
          />
          {/* Thread 6 - Purple */}
          <path
            d="M 0,198 C 160,70 230,330 360,244"
            stroke={THREAD_COLORS[5]}
            strokeWidth="2.9"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-6"
          />
          {/* Thread 7 - Blue */}
          <path
            d="M 0,212 C 120,240 230,140 360,250"
            stroke={THREAD_COLORS[6]}
            strokeWidth="2.2"
            strokeLinecap="round"
            className="grp1-path thread-glow-path string-indep-7"
          />
        </g>

        {/* ── SEGMENT 2 (Point 3 -> Point 4): Matching sleek tight gap at Point 3 (x=680..720), wide fanned-out spread at Point 4 ── */}
        <g className="hero-grp2-container">
          {/* Thread 1 - Cyan */}
          <path
            d="M 680,660 C 600,740 520,800 420,870"
            stroke={THREAD_COLORS[0]}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="grp2-path string-indep-1"
          />
          {/* Thread 2 - Yellow */}
          <path
            d="M 687,660 C 640,750 610,810 560,875"
            stroke={THREAD_COLORS[1]}
            strokeWidth="3.0"
            strokeLinecap="round"
            className="grp2-path thread-glow-path string-indep-2"
          />
          {/* Thread 3 - Red */}
          <path
            d="M 693,660 C 670,745 680,815 690,880"
            stroke={THREAD_COLORS[2]}
            strokeWidth="2.6"
            strokeLinecap="round"
            className="grp2-path thread-glow-path string-indep-3"
          />
          {/* Thread 4 - Green */}
          <path
            d="M 700,660 C 730,750 780,815 820,882"
            stroke={THREAD_COLORS[3]}
            strokeWidth="2.8"
            strokeLinecap="round"
            className="grp2-path thread-glow-path string-indep-4"
          />
          {/* Thread 5 - Orange */}
          <path
            d="M 707,660 C 780,740 850,815 940,885"
            stroke={THREAD_COLORS[4]}
            strokeWidth="2.4"
            strokeLinecap="round"
            className="grp2-path thread-glow-path string-indep-5"
          />
          {/* Thread 6 - Purple */}
          <path
            d="M 713,660 C 820,745 920,820 1060,888"
            stroke={THREAD_COLORS[5]}
            strokeWidth="2.9"
            strokeLinecap="round"
            className="grp2-path thread-glow-path string-indep-6"
          />
          {/* Thread 7 - Blue */}
          <path d="M 720,660 C 860,735 980,815 1180,892" stroke={THREAD_COLORS[6]} strokeWidth="2.2" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-7" />
        </g>
      </svg>

      {/* ── MOBILE THREADS (Thinner 1.5-1.8px stroke width, exact container attachment at Point 2 & Point 3) ── */}
      <svg
        className="hero-threads-mobile"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Segment 1 (Point 1 -> Point 2): Tight 1cm origin at top screen edge (y=0), attaching to top border of terminal card (y=210) */}
        <g className="hero-grp1-container">
          <path d="M 194,0 C 150,70 140,140 188,210" stroke={THREAD_COLORS[3]} strokeWidth="1.5" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-1" />
          <path d="M 197,0 C 170,70 180,140 193,210" stroke={THREAD_COLORS[5]} strokeWidth="1.8" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-2" />
          <path d="M 200,0 C 190,70 210,140 198,210" stroke={THREAD_COLORS[2]} strokeWidth="1.6" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-3" />
          <path d="M 203,0 C 220,70 195,140 203,210" stroke={THREAD_COLORS[1]} strokeWidth="1.7" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-4" />
          <path d="M 206,0 C 235,70 240,140 208,210" stroke={THREAD_COLORS[3]} strokeWidth="1.5" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-5" />
          <path d="M 209,0 C 250,70 260,140 212,210" stroke={THREAD_COLORS[0]} strokeWidth="1.6" strokeLinecap="round" className="grp1-path thread-glow-path string-indep-6" />
        </g>

        {/* Segment 2 (Point 3 -> Point 4): Starts INSIDE bottom border of terminal card (y=560) to guarantee 100% attachment with zero gap! */}
        <g className="hero-grp2-container">
          <path d="M 188,560 C 140,640 80,720 60,800" stroke={THREAD_COLORS[5]} strokeWidth="1.5" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-1" />
          <path d="M 192,560 C 160,640 120,720 100,800" stroke={THREAD_COLORS[0]} strokeWidth="1.7" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-2" />
          <path d="M 196,560 C 180,640 150,720 140,800" stroke={THREAD_COLORS[2]} strokeWidth="1.6" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-3" />
          <path d="M 200,560 C 200,640 185,720 180,800" stroke={THREAD_COLORS[3]} strokeWidth="1.8" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-4" />
          <path d="M 204,560 C 220,640 225,720 230,800" stroke={THREAD_COLORS[1]} strokeWidth="1.6" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-5" />
          <path d="M 208,560 C 245,640 270,720 285,800" stroke={THREAD_COLORS[2]} strokeWidth="1.5" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-6" />
          <path d="M 212,560 C 270,640 320,720 350,800" stroke={THREAD_COLORS[6]} strokeWidth="1.6" strokeLinecap="round" className="grp2-path thread-glow-path string-indep-7" />
        </g>
      </svg>

      <style>{`
        .hero-threads-desktop { display: block; }
        .hero-threads-mobile { display: none; }

        @media (max-width: 768px), (pointer: coarse) and (orientation: portrait) {
          .hero-threads-desktop { display: none; }
          .hero-threads-mobile { display: block; }
        }

        @keyframes draw-hold-vanish-grp1 {
          0% { stroke-dasharray: 650; stroke-dashoffset: 650; opacity: 0; }
          15% { opacity: 1; }
          30% { stroke-dasharray: 650; stroke-dashoffset: 0; opacity: 1; }
          75% { stroke-dasharray: 650; stroke-dashoffset: 0; opacity: 1; }
          95%, 100% { stroke-dasharray: 650; stroke-dashoffset: -650; opacity: 0; }
        }

        @keyframes draw-vanish-grp2 {
          0%, 35% { stroke-dasharray: 750; stroke-dashoffset: 750; opacity: 0; }
          42% { opacity: 1; }
          65% { stroke-dasharray: 750; stroke-dashoffset: 80; opacity: 1; }
          85% { stroke-dasharray: 750; stroke-dashoffset: -200; opacity: 0.9; }
          100% { stroke-dasharray: 750; stroke-dashoffset: -750; opacity: 0; }
        }

        .grp1-path {
          stroke-dasharray: 650;
          stroke-dashoffset: 650;
          opacity: 0;
          transform-origin: 0px 200px;
        }

        .grp2-path {
          stroke-dasharray: 750;
          stroke-dashoffset: 750;
          opacity: 0;
          transform-origin: 700px 660px;
        }

        .hero-grp1-container .string-indep-1 { animation: draw-hold-vanish-grp1 9s ease-in-out 0.6s forwards, float-string-up-1 3.4s ease-in-out 2.0s infinite; }
        .hero-grp1-container .string-indep-2 { animation: draw-hold-vanish-grp1 9s ease-in-out 0.7s forwards, float-string-down-2 4.2s ease-in-out 2.2s infinite; }
        .hero-grp1-container .string-indep-3 { animation: draw-hold-vanish-grp1 9s ease-in-out 0.8s forwards, float-string-up-3 5.1s ease-in-out 2.4s infinite; }
        .hero-grp1-container .string-indep-4 { animation: draw-hold-vanish-grp1 9s ease-in-out 0.9s forwards, float-string-down-4 3.1s ease-in-out 2.1s infinite; }
        .hero-grp1-container .string-indep-5 { animation: draw-hold-vanish-grp1 9s ease-in-out 1.0s forwards, float-string-up-5 4.6s ease-in-out 2.5s infinite; }
        .hero-grp1-container .string-indep-6 { animation: draw-hold-vanish-grp1 9s ease-in-out 1.1s forwards, float-string-down-6 5.5s ease-in-out 2.3s infinite; }
        .hero-grp1-container .string-indep-7 { animation: draw-hold-vanish-grp1 9s ease-in-out 1.2s forwards, float-string-up-7 3.8s ease-in-out 2.6s infinite; }

        .hero-grp2-container .string-indep-1 { animation: draw-vanish-grp2 9s ease-in-out 0.6s forwards, float-string-down-2 3.8s ease-in-out 4.2s infinite; }
        .hero-grp2-container .string-indep-2 { animation: draw-vanish-grp2 9s ease-in-out 0.7s forwards, float-string-up-1 4.5s ease-in-out 4.4s infinite; }
        .hero-grp2-container .string-indep-3 { animation: draw-vanish-grp2 9s ease-in-out 0.8s forwards, float-string-down-6 5.3s ease-in-out 4.1s infinite; }
        .hero-grp2-container .string-indep-4 { animation: draw-vanish-grp2 9s ease-in-out 0.9s forwards, float-string-up-3 3.3s ease-in-out 4.5s infinite; }
        .hero-grp2-container .string-indep-5 { animation: draw-vanish-grp2 9s ease-in-out 1.0s forwards, float-string-down-4 4.8s ease-in-out 4.3s infinite; }
        .hero-grp2-container .string-indep-6 { animation: draw-vanish-grp2 9s ease-in-out 1.1s forwards, float-string-up-5 5.0s ease-in-out 4.6s infinite; }
        .hero-grp2-container .string-indep-7 { animation: draw-vanish-grp2 9s ease-in-out 1.2s forwards, float-string-up-7 3.6s ease-in-out 4.0s infinite; }

        @keyframes glass-reflection-top { 0% { opacity: 0; filter: blur(4px); } 20%, 75% { opacity: 0.95; filter: blur(0px); } 95%, 100% { opacity: 0; filter: blur(6px); } }
        @keyframes glass-reflection-bottom { 0% { opacity: 0; filter: blur(4px); } 20%, 80% { opacity: 0.95; filter: blur(0px); } 95%, 100% { opacity: 0; filter: blur(6px); } }

        .terminal-glass-edge-top {
          position: absolute; top: 0; left: 0; width: 320px; height: 220px; pointer-events: none; z-index: 12; border-top-left-radius: 0.75rem; opacity: 0;
          background: radial-gradient(circle at 0% 50%, rgba(6, 182, 212, 0.45) 0%, rgba(250, 204, 21, 0.35) 25%, rgba(239, 68, 68, 0.3) 50%, rgba(168, 85, 247, 0.25) 75%, transparent 100%);
          box-shadow: inset 2px 2px 14px rgba(6, 182, 212, 0.5);
          -webkit-mask: linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%);
          mask: linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%);
          animation: glass-reflection-top 7s ease-in-out 1.8s both;
        }

        .terminal-glass-edge-bottom {
          position: absolute; bottom: 0; right: 10%; width: 480px; height: 140px; pointer-events: none; z-index: 12; border-bottom-right-radius: 0.75rem; opacity: 0;
          background: radial-gradient(circle at 75% 100%, rgba(6, 182, 212, 0.35) 0%, rgba(249, 115, 22, 0.45) 30%, rgba(16, 185, 129, 0.35) 60%, rgba(168, 85, 247, 0.3) 80%, transparent 100%);
          box-shadow: inset -2px -2px 14px rgba(249, 115, 22, 0.45);
          -webkit-mask: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 90%);
          mask: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 90%);
          animation: glass-reflection-bottom 5s ease-in-out 4.2s both;
        }

        @media (max-width: 768px), (pointer: coarse) and (orientation: portrait) {
          .terminal-glass-edge-top-mobile {
            display: block; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 35px; pointer-events: none; z-index: 12; opacity: 0; border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem;
            background: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.45) 0%, rgba(250, 204, 21, 0.35) 30%, rgba(239, 68, 68, 0.3) 60%, rgba(168, 85, 247, 0.25) 85%, transparent 100%);
            box-shadow: inset 0px 2px 10px rgba(6, 182, 212, 0.5);
            -webkit-mask: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            mask: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            animation: glass-reflection-top 7s ease-in-out 1.8s both;
          }

          .terminal-glass-edge-bottom-mobile {
            display: block; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 160px; height: 35px; pointer-events: none; z-index: 12; opacity: 0; border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem;
            background: radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.35) 0%, rgba(249, 115, 22, 0.45) 35%, rgba(16, 185, 129, 0.35) 70%, rgba(168, 85, 247, 0.3) 90%, transparent 100%);
            box-shadow: inset 0px -2px 10px rgba(249, 115, 22, 0.45);
            -webkit-mask: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            mask: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            animation: glass-reflection-bottom 5s ease-in-out 4.2s both;
          }
        }
      `}</style>
    </div>
  );
}
