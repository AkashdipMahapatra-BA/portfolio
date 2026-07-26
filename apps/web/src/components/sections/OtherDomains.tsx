"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

/* =============================================================================
   DATA CONFIGURATION — add / reorder YouTube Shorts IDs here easily
   Extract the ID from: https://www.youtube.com/shorts/<ID>
   ============================================================================= */

const YOUTUBE_SHORTS: Record<string, string[]> = {
  // Mechanical Engineering
  mechanical: [
    "Hjyq4SfOk-U", // Plummer block in SolidWorks & 3D print
    "pUlICwIoOtQ", // V8 engine
    "q-xmJgt8BNI", // Blower assembly
    "ONkDHn3DzHc", // Make your imagination into reality
    "HwnFRO1-HXs", // Radical engine
  ],
  // Electrical & Electronics
  electrical: [
    "HLpzubZdVOU", // DIY high AMP
    "LesyLWiLKqs", // Testing homemade 300W power supply
  ],
  // IoT & Networking
  iot: [
    "f-ynrKfCTic", // Public IP cloud server using ESP32
    "HGp5vdLBLj8", // Electromagnetic noise detected by Arduino
    "UEg8rNhrdyY", // Play games with Arduino
    "ey0tqEoZGdE", // Boot up Kali Linux
  ],
  // Painting & Arts (National Award) — hidden on mobile
  painting: [
    "IkcPfEoTvcs", // President Mukherjee — National Energy Conservation Day 2012
  ],
};

/* =============================================================================
   SOLIDWORKS BADGES
   ============================================================================= */

interface SWBadge {
  id: string;
  title: string;
  shortTitle: string;
  img: string;
  credlyUrl: string;
}

const SOLIDWORKS_BADGES: SWBadge[] = [
  {
    id: "cswa",
    title: "SOLIDWORKS Design Associate (CSWA)",
    shortTitle: "CSWA",
    img: "/badges/solidworks cad design associate certification.jpg",
    credlyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-ME4NJVYF5R",
  },
  {
    id: "xdesign",
    title: "Certified SOLIDWORKS xDesign Associate",
    shortTitle: "xDesign Associate",
    img: "/badges/certified-solidworks-xdesign-associate.png",
    credlyUrl: "https://www.credly.com/earner/earned/badge/1bd37313-fa7f-48a0-9562-cf0d37347b1c",
  },
  {
    id: "xmold",
    title: "Certified SOLIDWORKS xMold Associate",
    shortTitle: "xMold Associate",
    img: "/badges/certified-solidworks-xmold-associate.png",
    credlyUrl: "https://www.credly.com/earner/earned/badge/e91c80d5-6955-4612-a80a-64f56b2ca7e0",
  },
  {
    id: "3dswymer",
    title: "Certified 3DEXPERIENCE 3DSwymer — Associate",
    shortTitle: "3DSwymer",
    img: "/badges/certified-3dexperience-3dswymer-associate.png",
    credlyUrl: "https://www.credly.com/earner/earned/badge/5eb5f0ea-2961-483b-93c6-7bdd930b6c80",
  },
  {
    id: "draftsight",
    title: "Certified DraftSight Associate — 2D Design & Drafting",
    shortTitle: "DraftSight",
    img: "/badges/certified-draftsight-associate-2d-design-and-drafti.png",
    credlyUrl: "https://www.credly.com/earner/earned/badge/0abce572-16b2-42ca-ac00-9e0e723b09ac",
  },
];

/* =============================================================================
   COLUMN META — title, icon, accent colour
   ============================================================================= */

interface ColMeta {
  key: string;
  title: string;
  icon: string;
  accentColor: string;
}

const COLUMNS: ColMeta[] = [
  { key: "mechanical", title: "Mechanical Systems",       icon: "⚙️", accentColor: "#f97316" },
  { key: "electrical", title: "Electrical & Electronics", icon: "⚡", accentColor: "#eab308" },
  { key: "iot",        title: "IoT & Networking",         icon: "🌐", accentColor: "#06b6d4" },
  { key: "painting",   title: "Painting & Arts",          icon: "🎨", accentColor: "#a855f7" },
];

/* =============================================================================
   HELPER — YouTube embed URL builder
   ============================================================================= */

function buildEmbedUrl(videoId: string, isAutoPlay: boolean, isMuted: boolean): string {
  const params = new URLSearchParams({
    autoplay:       isAutoPlay ? "1" : "0",
    mute:           isMuted ? "1" : "0",
    controls:       "1",
    rel:            "0",
    modestbranding: "1",
    enablejsapi:    "1",
    playsinline:    "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/* =============================================================================
   VIDEO COLUMN
   ============================================================================= */

function VideoColumn({
  meta,
  videos,
  globalMuted,
  setGlobalMuted,
  activeColumnKey,
  setActiveColumnKey,
}: {
  meta: ColMeta;
  videos: string[];
  globalMuted: boolean;
  setGlobalMuted: (muted: boolean) => void;
  activeColumnKey: string | null;
  setActiveColumnKey: (key: string) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const touchStartX = useRef<number | null>(null);
  const total = videos.length;

  const isActive = activeColumnKey === meta.key;

  // Auto-pause when another column becomes active
  useEffect(() => {
    if (!isActive && isPlaying && iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
          "*"
        );
      } catch { /* ignore */ }
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  // Sync mute state via postMessage when globalMuted changes
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: globalMuted ? "mute" : "unMute",
            args: "",
          }),
          "*"
        );
      } catch { /* ignore */ }
    }
  }, [globalMuted]);

  const handleNext = useCallback(() => {
    setActiveColumnKey(meta.key);
    setIsPlaying(true);
    setCurrentIdx((i) => (i + 1) % total);
  }, [meta.key, setActiveColumnKey, total]);

  const handlePrev = useCallback(() => {
    setActiveColumnKey(meta.key);
    setIsPlaying(true);
    setCurrentIdx((i) => (i - 1 + total) % total);
  }, [meta.key, setActiveColumnKey, total]);

  // Auto-advance via YouTube postMessage when video ends (info === 0)
  // Also detect play (info === 1), pause (info === 2), volume/mute updates
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (iframeRef.current && e.source === iframeRef.current.contentWindow) {
          if (data?.event === "onStateChange") {
            // State 0 = ended -> auto-advance
            if (data?.info === 0) {
              handleNext();
            }
            // State 1 = playing -> set active column & update playing state
            else if (data?.info === 1) {
              setActiveColumnKey(meta.key);
              setIsPlaying(true);
            }
            // State 2 = paused -> update playing state
            else if (data?.info === 2) {
              setIsPlaying(false);
            }
          }
          // Catch volume change / mute events from YouTube native controls
          if (data?.event === "infoDelivery" && data?.info) {
            if (typeof data.info.muted === "boolean") {
              if (data.info.muted !== globalMuted) {
                setGlobalMuted(data.info.muted);
              }
            }
          }
        }
      } catch { /* ignore unrelated messages */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [handleNext, meta.key, setActiveColumnKey, globalMuted, setGlobalMuted]);

  // Swipe gesture support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  const videoId = videos[currentIdx] ?? "";
  const embedUrl = buildEmbedUrl(videoId, isPlaying, globalMuted);

  return (
    <div
      className="domain-col"
      style={{
        display:       "flex",
        flexDirection: "column",
        gap:           "0.75rem",
        background:    "var(--color-surface)",
        border:        `1px solid color-mix(in srgb, ${meta.accentColor} 25%, var(--color-border))`,
        borderRadius:  "1rem",
        padding:       "1rem",
        boxShadow:     `0 0 24px color-mix(in srgb, ${meta.accentColor} 6%, transparent)`,
        transition:    "box-shadow 0.25s ease",
        flexShrink:    0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 40px color-mix(in srgb, ${meta.accentColor} 14%, transparent)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 24px color-mix(in srgb, ${meta.accentColor} 6%, transparent)`;
      }}
    >
      {/* Column header — clean title without redundant top mute button */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", height: "1.75rem" }}>
        <span style={{ fontSize: "1rem" }}>{meta.icon}</span>
        <h3 style={{
          margin: 0, fontSize: "0.85rem", fontWeight: 700,
          color: "var(--color-text)", fontFamily: "var(--font-sans)",
        }}>
          {meta.title}
        </h3>
      </div>

      {/* Video area with Prev / Next buttons */}
      <div style={{ position: "relative" }}>
        {/* Prev */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous video"
            style={{
              position:  "absolute", left: "-0.6rem", top: "50%",
              transform: "translateY(-50%)", zIndex: 10,
              background: "var(--color-surface)",
              border:    `1px solid color-mix(in srgb, ${meta.accentColor} 40%, transparent)`,
              borderRadius: "9999px", width: "2rem", height: "2rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: meta.accentColor,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              transition: "transform 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* iframe container — 9:16 Shorts aspect ratio */}
        <div
          style={{
            position: "relative", width: "100%", aspectRatio: "9/16",
            borderRadius: "0.75rem", overflow: "hidden", background: "#000",
            userSelect: "none",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <iframe
            key={`${meta.key}-${currentIdx}`}
            ref={iframeRef}
            src={embedUrl}
            title={`${meta.title} — video ${currentIdx + 1}`}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* Swipe hint — fades in then out once */}
          {total > 1 && (
            <div style={{
              position: "absolute", bottom: "3.5rem", left: 0, right: 0,
              display: "flex", justifyContent: "center", pointerEvents: "none",
              opacity: 0, animation: "swipeHint 2.5s ease-in-out 1s forwards",
            }}>
              <span style={{
                fontSize: "0.65rem", color: "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.45)", padding: "0.2rem 0.6rem",
                borderRadius: "9999px", fontFamily: "var(--font-mono)",
                backdropFilter: "blur(4px)",
              }}>
                ← swipe →
              </span>
            </div>
          )}
        </div>

        {/* Next */}
        {total > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next video"
            style={{
              position:  "absolute", right: "-0.6rem", top: "50%",
              transform: "translateY(-50%)", zIndex: 10,
              background: meta.accentColor, border: "none",
              borderRadius: "9999px", width: "2rem", height: "2rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff",
              boxShadow: `0 2px 12px color-mix(in srgb, ${meta.accentColor} 50%, transparent)`,
              transition: "transform 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Dot indicators + counter */}
      {total > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveColumnKey(meta.key);
                setIsPlaying(true);
                setCurrentIdx(i);
              }}
              aria-label={`Go to video ${i + 1}`}
              style={{
                width:        i === currentIdx ? "1.4rem" : "0.4rem",
                height:       "0.4rem",
                borderRadius: "9999px",
                border:       "none",
                background:   i === currentIdx ? meta.accentColor : "var(--color-border)",
                cursor:       "pointer",
                padding:      0,
                transition:   "width 0.25s ease, background 0.25s ease",
                flexShrink:   0,
              }}
            />
          ))}
          <span style={{
            marginLeft: "0.25rem", fontSize: "0.65rem",
            color: "var(--color-muted)", fontFamily: "var(--font-mono)",
          }}>
            {currentIdx + 1}/{total}
          </span>
        </div>
      )}
    </div>
  );
}

/* =============================================================================
   SOLIDWORKS BADGE CARD
   ============================================================================= */

function SWBadgeCard({ badge }: { badge: SWBadge }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={badge.credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={badge.title}
      style={{
        textDecoration: "none",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            "0.6rem",
        background:     hovered ? "color-mix(in srgb, #e63329 14%, var(--color-surface))" : "var(--color-surface)",
        border:         `1px solid ${hovered ? "rgba(230,51,41,0.45)" : "var(--color-border)"}`,
        borderRadius:   "0.75rem",
        padding:        "1rem 0.75rem",
        width:          "100%",
        boxSizing:      "border-box",
        cursor:         "pointer",
        transition:     "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
        transform:      hovered ? "translateY(-3px)" : "none",
        boxShadow:      hovered ? "0 8px 24px rgba(230,51,41,0.18)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: "4.5rem", height: "4.5rem", borderRadius: "50%", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "color-mix(in srgb, #e63329 10%, transparent)",
        border: "1px solid color-mix(in srgb, #e63329 22%, transparent)",
        flexShrink: 0,
      }}>
        {!imgFailed ? (
          <img
            src={badge.img} alt={badge.title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#e63329" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </div>
      <span style={{
        fontSize: "0.68rem", fontWeight: 600,
        color: hovered ? "#f8fafc" : "var(--color-text)",
        textAlign: "center", lineHeight: 1.35, transition: "color 0.2s ease",
      }}>
        {badge.shortTitle}
      </span>
      <span style={{
        fontSize: "0.58rem", color: "#e63329",
        fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
      }}>
        Dassault ↗
      </span>
    </a>
  );
}

/* =============================================================================
   MAIN EXPORT
   ============================================================================= */

const sectionStyles = `
  @keyframes swipeHint {
    0%   { opacity: 0; }
    15%  { opacity: 1; }
    75%  { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export function OtherDomains() {
  const [globalMuted, setGlobalMuted] = useState(true);
  const [activeColumnKey, setActiveColumnKey] = useState<string | null>(null);

  return (
    <section
      id="other-domains"
      style={{ padding: "5rem 1.5rem", maxWidth: "1600px", margin: "0 auto" }}
    >
      <style>{sectionStyles}</style>

      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          color: "var(--color-accent)", letterSpacing: "0.1em",
          textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          Expertise in Other Domains
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      {/* Heading + playlist note */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 800,
          color: "var(--color-text)", margin: "0 0 0.6rem 0", lineHeight: 1.2,
        }}>
          Beyond the{" "}
          <span style={{ color: "var(--color-accent)" }}>Terminal</span>
        </h2>
        <p style={{
          fontSize: "0.85rem", color: "var(--color-muted)",
          margin: 0, lineHeight: 1.6, maxWidth: "55ch",
        }}>
          Mechanical engineer by degree, cloud engineer by passion.{" "}
          <span style={{ fontStyle: "italic", color: "color-mix(in srgb, var(--color-accent) 80%, var(--color-muted))" }}>
            For complete long-form project playlists, explore the video buttons inside the{" "}
            <a href="#education" style={{
              color: "var(--color-accent)", textDecoration: "underline",
              textDecorationStyle: "dotted", textUnderlineOffset: "3px",
            }}>
              Education section ↑
            </a>.
          </span>
        </p>
      </div>

      {/* All 4 video columns — always in the scroll container, swipe on mobile */}
      <div className="domains-scroll-container">
        {COLUMNS.map((meta) => (
          <VideoColumn
            key={meta.key}
            meta={meta}
            videos={YOUTUBE_SHORTS[meta.key] ?? []}
            globalMuted={globalMuted}
            setGlobalMuted={setGlobalMuted}
            activeColumnKey={activeColumnKey}
            setActiveColumnKey={setActiveColumnKey}
          />
        ))}
      </div>

      {/* Scroll hint — shown only on mobile so users know to swipe */}
      <p style={{
        marginTop:  "0.5rem",
        fontSize:   "0.7rem",
        color:      "var(--color-muted)",
        fontFamily: "var(--font-mono)",
        textAlign:  "center",
        letterSpacing: "0.04em",
      }}
        className="domains-scroll-hint"
      >
        ← swipe to see all columns including 🎨 Painting &amp; National Award →
      </p>

      {/* SolidWorks / Dassault Certifications */}
      <div style={{ marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--color-border)" }}>
        
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                margin: "0 0 0.25rem 0",
              }}
            >
              Mechanical Certifications
            </p>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              Dassault Systèmes
            </h3>
          </div>

          <a
            href="https://www.credly.com/users/akashdip2001"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "#e63329",
              textDecoration: "none",
              whiteSpace: "nowrap",
              border: "1px solid rgba(230,51,41,0.35)",
              background: "rgba(230,51,41,0.08)",
              padding: "0.4rem 0.85rem",
              borderRadius: "9999px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(230,51,41,0.18)";
              el.style.borderColor = "rgba(230,51,41,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(230,51,41,0.08)";
              el.style.borderColor = "rgba(230,51,41,0.35)";
            }}
          >
            Verify on Credly ↗
          </a>
        </div>

        {/* Badge cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 7.5rem), 1fr))",
            gap: "0.875rem",
          }}
        >
          {SOLIDWORKS_BADGES.map((badge) => (
            <SWBadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        <p style={{
          marginTop: "1.25rem", fontSize: "0.7rem",
          color: "var(--color-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6,
        }}>
          * SOLIDWORKS Design Associate (CSWA) — issued July 16, 2025 · Verified July 26, 2026.{" "}
          <a
            href="https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-ME4NJVYF5R"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
          >
            Validate certificate ↗
          </a>
        </p>
      </div>
    </section>
  );
}
