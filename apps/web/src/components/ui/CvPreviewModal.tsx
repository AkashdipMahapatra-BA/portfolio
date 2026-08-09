"use client";

import React, { useEffect, useRef } from "react";
import { X, Download, FileText, ExternalLink } from "lucide-react";

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // ── Keyboard (Escape) & Body Scroll Lock ───────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock ONLY the background page scroll — do NOT use touchAction:none
    // (that would swallow touch events going into the iframe too)
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // iOS-safe background scroll lock: freeze body in place
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
      // Restore scroll position after body unfreeze
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Intercept touches on the backdrop (but NOT inside the modal) to close
  const handleBackdropTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="cv-modal-backdrop"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      onTouchEnd={handleBackdropTouch}
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
        // Do NOT set touchAction or overflow here — that blocks scroll inside iframe
      }}
    >
      {/* ── Modal Main Container ─────────────────────────────────────────── */}
      <div
        className="cv-modal-container"
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

          {/* Right Controls: Download + Open in Tab (mobile) + Close */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            {/* Open in new tab — useful on mobile where iframe PDF scroll is limited */}
            <a
              href="/Akashdip_Mahapatra_CV.pdf"
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
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#020617",
          }}
        >
          <iframe
            src="/Akashdip_Mahapatra_CV.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH"
            title="Akashdip Mahapatra CV PDF Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              backgroundColor: "#1e293b",
            }}
          />
        </div>

        {/* ── Embedded CSS Animations & Responsive Helpers ───────────────── */}
        <style jsx>{`
          @keyframes cvModalFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cvModalScaleUp {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
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
          }
        `}</style>
      </div>
    </div>
  );
}
