"use client";

import React, { useEffect, useRef } from "react";
import { X, Download, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  // ── Keyboard (Escape) & Strict Body Scroll Lock ────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    // Strict background page freeze (prevents mobile background scrolling)
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleScroll = (direction: "up" | "down") => {
    if (viewportRef.current) {
      const scrollAmount = viewportRef.current.clientHeight * 0.75;
      viewportRef.current.scrollBy({
        top: direction === "down" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="cv-modal-backdrop"
      onClick={onClose}
      onTouchMove={(e) => e.preventDefault()} // Block mobile background scroll drag
      aria-modal="true"
      role="dialog"
      aria-label="CV Preview"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        animation: "cvModalFadeIn 0.2s ease-out forwards",
        touchAction: "none",
      }}
    >
      {/* ── Modal Main Container ─────────────────────────────────────────── */}
      <div
        className="cv-modal-container"
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()} // Keep touch events within modal
        style={{
          position: "relative",
          width: "92vw",
          maxWidth: "1080px",
          height: "90vh",
          maxHeight: "900px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          borderRadius: "12px",
          /* Crisp, balanced black border as requested */
          border: "2.5px solid #000000",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          animation: "cvModalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* ── Modal Header / Controls Toolbar ───────────────────────────── */}
        <header
          style={{
            height: "3.5rem",
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
                  fontSize: "0.95rem",
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
                  fontSize: "0.725rem",
                  letterSpacing: "0.02em",
                }}
              >
                Interactive PDF Preview
              </span>
            </div>
          </div>

          {/* Right Controls: Scroll buttons (Mobile) + Download + Close */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {/* Mobile Scroll Helpers */}
            <div className="mobile-scroll-controls" style={{ display: "none", gap: "0.25rem", marginRight: "0.25rem" }}>
              <button
                type="button"
                onClick={() => handleScroll("up")}
                title="Scroll Up"
                aria-label="Scroll Up"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                <ChevronUp size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("down")}
                title="Scroll Down"
                aria-label="Scroll Down"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Direct Open in new tab link (Mobile helper) */}
            <a
              href="/Akashdip_Mahapatra_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Open full PDF in new tab"
              style={{
                display: "none",
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
              href="/Akashdip_Mahapatra_CV.pdf"
              download="Akashdip_Mahapatra_CV.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                backgroundColor: "var(--color-accent, #38bdf8)",
                color: "#020617",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(56, 189, 248, 0.25)",
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
              <Download size={15} />
              <span className="cv-download-btn-text">Download</span>
            </a>

            {/* Close Modal Button */}
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
          ref={viewportRef}
          className="cv-pdf-viewport"
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#020617",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          <object
            data="/Akashdip_Mahapatra_CV.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH"
            type="application/pdf"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              border: "none",
              display: "block",
            }}
          >
            <iframe
              src="/Akashdip_Mahapatra_CV.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH"
              title="Akashdip Mahapatra CV PDF Preview"
              style={{
                width: "100%",
                height: "100%",
                minHeight: "100%",
                border: "none",
                display: "block",
                backgroundColor: "#1e293b",
              }}
            />
          </object>
        </div>

        {/* ── Embedded CSS Animations & Responsive Helpers ───────────────── */}
        <style jsx>{`
          @keyframes cvModalFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes cvModalScaleUp {
            from {
              opacity: 0;
              transform: scale(0.96) translateY(8px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @media (max-width: 640px) {
            .cv-modal-container {
              width: 96vw !important;
              height: 88vh !important;
              border-radius: 10px !important;
            }
            .cv-download-btn-text {
              display: none;
            }
            .show-on-mobile-flex {
              display: flex !important;
            }
            .mobile-scroll-controls {
              display: flex !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
