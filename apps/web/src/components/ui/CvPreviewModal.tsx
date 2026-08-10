"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Download, FileText, ExternalLink } from "lucide-react";

// Public URL of the CV PDF — required for Google Docs Viewer (needs an absolute URL)
const CV_PATH = "/Akashdip_Mahapatra_CV.pdf";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://akashdipmahapatra.in";
const CV_ABSOLUTE_URL = `${SITE_URL}${CV_PATH}`;

/**
 * Google Docs Viewer renders the PDF as HTML+images, so it works on any
 * mobile browser (Android Chrome, iOS Safari) without needing a PDF extension.
 */
const GOOGLE_DOCS_VIEWER_URL = `https://docs.google.com/viewer?url=${encodeURIComponent(CV_ABSOLUTE_URL)}&embedded=true`;

/** Gap (px) to keep between the modal edges and the real visible viewport edge */
const VIEWPORT_GAP = 16;

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // ── PDF viewer source (desktop = direct iframe, mobile = Google Docs) ──────
  const [iframeSrc, setIframeSrc] = useState<string>(
    `${CV_PATH}#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH`
  );
  const [usingGoogleViewer, setUsingGoogleViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ── Real visible viewport height ─────────────────────────────────────────
  // window.innerHeight = actual visible height excluding mobile browser chrome
  // (unlike 'vh' which includes the browser address bar on some mobile browsers)
  const [innerH, setInnerH] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const update = () => setInnerH(window.innerHeight);
    update(); // immediately correct on mount
    window.addEventListener("resize", update);
    // Also update when orientation changes on mobile
    window.addEventListener("orientationchange", () => setTimeout(update, 200));
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // ── Detect mobile & choose viewer ────────────────────────────────────────
  useEffect(() => {
    const canInlinePDF =
      typeof navigator !== "undefined" &&
      (navigator as Navigator & { pdfViewerEnabled?: boolean })
        .pdfViewerEnabled === true;

    if (!canInlinePDF) {
      setIframeSrc(GOOGLE_DOCS_VIEWER_URL);
      setUsingGoogleViewer(true);
    }
  }, []);

  // ── Keyboard (Escape) & Body Scroll Lock ─────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // iOS-safe scroll lock: freeze body in place so background doesn't scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = "";
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Intercept touches/clicks on backdrop only (not inside the modal)
  const handleBackdropInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  if (!isOpen) return null;

  // Max height = visible viewport minus top+bottom gap (never clips top or bottom)
  const modalMaxHeight = innerH - VIEWPORT_GAP * 2;
  // Cap at 900px on large desktop screens
  const modalHeight = Math.min(modalMaxHeight, 900);

  return (
    <div
      ref={backdropRef}
      className="cv-modal-backdrop"
      onClick={handleBackdropInteraction}
      onTouchEnd={handleBackdropInteraction as React.TouchEventHandler}
      aria-modal="true"
      role="dialog"
      aria-label="CV Preview"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        // flex-start + paddingTop ensures the top of the modal is ALWAYS visible
        alignItems: "flex-start",
        justifyContent: "center",
        // Centre vertically by distributing space: padding = (innerH - modalHeight) / 2
        // clamped to VIEWPORT_GAP so the top never goes off-screen
        paddingTop: `${Math.max(VIEWPORT_GAP, Math.floor((innerH - modalHeight) / 2))}px`,
        paddingBottom: `${VIEWPORT_GAP}px`,
        paddingLeft: `${VIEWPORT_GAP}px`,
        paddingRight: `${VIEWPORT_GAP}px`,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        animation: "cvModalFadeIn 0.2s ease-out forwards",
        boxSizing: "border-box",
      }}
    >
      {/* ── Modal Main Container ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1080px",
          // Use the JS-computed height so it NEVER overflows top or bottom
          height: `${modalHeight}px`,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          borderRadius: "12px",
          border: "2.5px solid #000000",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          animation: "cvModalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* ── Modal Header / Controls Toolbar ───────────────────────────── */}
        <header
          style={{
            height: "3.5rem",
            minHeight: "3.5rem",
            padding: "0 1.25rem",
            backgroundColor: "#090d16",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          {/* Left: Document Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "6px",
                backgroundColor: "rgba(56, 189, 248, 0.12)",
                color: "#38bdf8",
                flexShrink: 0,
              }}
            >
              <FileText size={18} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span
                style={{
                  color: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Akashdip Mahapatra — CV
              </span>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "0.7rem",
                  letterSpacing: "0.02em",
                }}
              >
                {usingGoogleViewer ? "via Google Docs Viewer" : "Interactive PDF Preview"}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {/* Open in new tab — shown on mobile */}
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full PDF in new tab"
              style={{
                display: "none", // shown via CSS on mobile
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#94a3b8",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              className="show-on-mobile-flex"
            >
              <ExternalLink size={16} />
            </a>

            {/* Download CV Button */}
            <a
              href={CV_PATH}
              download="Akashdip_Mahapatra_CV.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "var(--color-accent, #38bdf8)",
                color: "#020617",
                fontWeight: 600,
                fontSize: "0.825rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(56, 189, 248, 0.25)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Download size={14} />
              <span className="cv-download-btn-text">Download</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                e.currentTarget.style.color = "#fca5a5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              <X size={19} />
            </button>
          </div>
        </header>

        {/* ── PDF Preview Viewport ────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#020617",
          }}
        >
          {/* Loading spinner — visible until iframe fires onLoad */}
          {isLoading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                backgroundColor: "#020617",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  border: "3px solid rgba(56,189,248,0.2)",
                  borderTopColor: "#38bdf8",
                  borderRadius: "50%",
                  animation: "cvSpinner 0.8s linear infinite",
                }}
              />
              <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                {usingGoogleViewer ? "Loading via Google Docs Viewer…" : "Loading PDF…"}
              </span>
            </div>
          )}

          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="Akashdip Mahapatra CV PDF Preview"
            onLoad={() => setIsLoading(false)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              backgroundColor: "#1e293b",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>

        {/* ── Animations & Mobile Helpers ───────────────────────────────── */}
        <style jsx>{`
          @keyframes cvModalFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cvModalScaleUp {
            from { opacity: 0; transform: scale(0.96) translateY(6px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes cvSpinner {
            to { transform: rotate(360deg); }
          }
          /* Hide "Download" text label on small screens to save header space */
          @media (max-width: 480px) {
            .cv-download-btn-text { display: none; }
            .show-on-mobile-flex  { display: flex !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
