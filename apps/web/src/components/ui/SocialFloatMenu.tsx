"use client";

import { useState, useEffect } from "react";

const HatIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
  </svg>
);

const BriefcaseIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 2H14C15.1 2 16 2.9 16 4V6H20C21.1 6 22 6.9 22 8V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V8C2 6.9 2.9 6 4 6H8V4C8 2.9 8.9 2 10 2M14 6V4H10V6H14M4 8V19H20V8H4Z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "",
    href: "https://www.linkedin.com/in/akashdip2001",
    ariaLabel: "Akashdip Mahapatra on LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0A66C2",
    floatingIcon: null,
  },
  {
    id: "github-work",
    label: "GitHub · Work",
    sublabel: "Official repos (private)",
    href: "https://github.com/AkashdipMahapatra-BA",
    ariaLabel: "Akashdip Mahapatra official GitHub (current work repos, mostly private)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#e2e8f0",
    lightColor: "#1e293b",
    floatingIcon: BriefcaseIcon,
  },
  {
    id: "github-academic",
    label: "GitHub · Academic",
    sublabel: "Projects 2021 – 25",
    href: "https://github.com/akashdip2001",
    ariaLabel: "Akashdip Mahapatra academic GitHub (college projects 2021–2025)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#e2e8f0",
    lightColor: "#1e293b",
    floatingIcon: HatIcon,
  },
] as const;

export function SocialFloatMenu({ chatIsOpen }: { chatIsOpen: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [threadsActive, setThreadsActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsLight(document.documentElement.dataset.theme === "light");
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("footer-copyright");
      if (el) {
        const rect = el.getBoundingClientRect();
        setIsAtBottom(rect.top <= window.innerHeight + 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onThreadsActive = () => setThreadsActive(true);
    window.addEventListener("heroThreadsActive", onThreadsActive);
    return () => window.removeEventListener("heroThreadsActive", onThreadsActive);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setExpandedId(null);
    }
  }, [menuOpen]);

  const isHidden = chatIsOpen || isAtBottom;
  const opacity = isHidden ? 0 : 1;
  const translateY = isHidden ? "10px" : "0px";

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (expandedId !== id) {
      e.preventDefault();
      setExpandedId(id);
    }
  };

  return (
    <>
      <style>{`
        .social-float-root {
          position: fixed;
          bottom: 5.5rem;
          right: 1.5rem;
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        @media (min-width: 769px) {
          .social-float-root { display: none !important; }
        }

        .social-hamburger-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(30, 41, 59, 0.72);
          backdrop-filter: blur(12px) saturate(1.4);
          color: var(--color-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.35s ease, transform 0.35s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden; /* Ensure the rainbow overlay stays inside the circle */
        }

        .social-float-items {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          padding-right: 2px;
          padding-top: 5px;
          pointer-events: none;
        }

        .social-float-root.open .social-float-items {
          pointer-events: auto;
        }

        .social-float-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          width: 44px;
          padding: 0;
          border-radius: 0.75rem;
          background: rgba(20, 30, 50, 0.88);
          backdrop-filter: blur(12px) saturate(1.4);
          color: var(--color-text);
          text-decoration: none;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 4px 16px rgba(0, 0, 0, 0.40);
          cursor: pointer;
          position: relative;
          
          /* Closed state: absorbed into hamburger */
          opacity: 0;
          transform: translateY(30px) scale(0.5);
          
          /* Closing transition */
          transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s,
                      opacity 0.2s ease 0.2s,
                      background 0.3s ease;
        }

        .social-float-root.open .social-float-item {
          /* Open state */
          opacity: 1;
          transform: translateY(0) scale(1);
          /* Opening transition */
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.3s ease,
                      background 0.3s ease;
        }

        /* Staggered entrance (opening) */
        .social-float-root.open .social-float-item:nth-child(3) { transition-delay: 0s, 0s, 0s, 0s; }
        .social-float-root.open .social-float-item:nth-child(2) { transition-delay: 0s, 0.05s, 0.05s, 0s; }
        .social-float-root.open .social-float-item:nth-child(1) { transition-delay: 0s, 0.1s, 0.1s, 0s; }

        /* Staggered exit (closing - wait for width to collapse (0.2s) + stagger) */
        .social-float-root:not(.open) .social-float-item:nth-child(3) { transition-delay: 0s, 0.2s, 0.2s, 0s; }
        .social-float-root:not(.open) .social-float-item:nth-child(2) { transition-delay: 0s, 0.25s, 0.25s, 0s; }
        .social-float-root:not(.open) .social-float-item:nth-child(1) { transition-delay: 0s, 0.3s, 0.3s, 0s; }

        .social-float-item.expanded {
          width: 230px;
          justify-content: flex-start;
          background: rgba(20, 30, 50, 0.97);
        }

        /* LinkedIn expanded: center icon + text together */
        .social-float-item.expanded.linkedin-item {
          justify-content: center;
        }

        .social-float-item-content-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 12px;
        }

        .social-float-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 20px;
          height: 20px;
        }

        .social-float-item-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 0.5rem;
          width: 0;
          opacity: 0;
          white-space: nowrap;
          overflow: hidden;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .social-float-item.expanded .social-float-item-text {
          width: 160px;
          opacity: 1;
        }

        .social-float-item-title { font-size: 0.75rem; font-weight: 600; line-height: 1.2; }
        .social-float-item-sublabel { font-size: 0.62rem; font-weight: 400; color: var(--color-muted); font-family: var(--font-mono); line-height: 1.2; }

        .social-float-floating-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          color: var(--color-text);
          /* Always visible with smooth wave wiggle */
          animation: badge-wiggle-mobile 4s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .social-float-item.expanded .social-float-floating-badge {
          /* Cool smooth bounce animation when tapped/expanded */
          animation: badge-bounce-mobile 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes badge-wiggle-mobile {
          0% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-2px) rotate(4deg); }
          66% { transform: translateY(-1px) rotate(-3deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes badge-bounce-mobile {
          0% { transform: scale(1) translateY(0) rotate(0deg); }
          30% { transform: scale(1.15) translateY(-5px) rotate(15deg); }
          55% { transform: scale(1.05) translateY(-1px) rotate(-8deg); }
          80% { transform: scale(1.02) translateY(-3px) rotate(4deg); }
          100% { transform: scale(1) translateY(0) rotate(0deg); }
        }

        /* ── Rainbow overlay (both themes) ── */
        .social-float-rainbow-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          overflow: hidden;
          /* Dark theme: subtle cyan → purple → yellow diagonal sweep */
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(6, 182, 212, 0.25) 30%,
            rgba(168, 85, 247, 0.25) 50%,
            rgba(250, 204, 21, 0.2) 70%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 250% 250%;
          background-position: 100% 100%;
        }

        /* Light theme: richer opacity so the sweep is visible on white/beige glass */
        [data-theme="light"] .social-float-rainbow-border {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0) 0%,
            rgba(6, 182, 212, 0.45) 25%,
            rgba(168, 85, 247, 0.45) 50%,
            rgba(234, 88, 12, 0.35) 75%,
            rgba(37, 99, 235, 0) 100%
          );
          background-size: 250% 250%;
          background-position: 100% 100%;
        }

        /* 1. Sync with hero threads loading — fires on both hamburger and all pills */
        .social-float-item.threads-on .social-float-rainbow-border,
        .social-hamburger-btn.threads-on .social-float-rainbow-border {
          animation: hero-social-overlay-sweep 5s ease-in-out 4.2s both;
        }

        /* 2. LinkedIn: periodic sweep since there's no tap-hover on mobile */
        .social-float-item:nth-child(1) .social-float-rainbow-border {
          animation: periodic-overlay-sweep 6s ease-in-out infinite;
        }

        @keyframes periodic-overlay-sweep {
          0%   { opacity: 0; background-position: 100% 100%; }
          15%  { opacity: 1; }
          50%  { background-position: 0% 0%; }
          85%  { opacity: 1; }
          100% { opacity: 0; background-position: 0% 0%; }
        }

        .hamburger-icon { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease; }
        .hamburger-icon.open { transform: rotate(90deg); }

        /* ── Light theme overrides for the mobile float menu ── */
        [data-theme="light"] .social-hamburger-btn {
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(15, 23, 42, 0.14);
          color: var(--color-text);
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
        }

        [data-theme="light"] .social-float-item {
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.10);
          color: var(--color-text);
        }

        [data-theme="light"] .social-float-item.expanded {
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.16), 0 6px 20px rgba(15, 23, 42, 0.14);
        }

        /* Badge: fully transparent so no box appears around the SVG */
        [data-theme="light"] .social-float-floating-badge {
          background: transparent;
          color: var(--color-text);
        }
      `}</style>

      <div
        className={`social-float-root ${menuOpen ? "open" : ""}`}
        style={{ opacity, transform: `translateY(${translateY})`, pointerEvents: isHidden ? "none" : "auto", transition: "all 0.35s ease" }}
        aria-label="Social media links"
      >
        <div className="social-float-items" role="list">
          {SOCIAL_LINKS.map((link, i) => {
              const isExpanded = expandedId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  role="listitem"
                  onClick={(e) => handleItemClick(e, link.id)}
                  className={`social-float-item ${isExpanded ? "expanded" : ""} ${link.id === "linkedin" ? "linkedin-item" : ""} ${threadsActive ? "threads-on" : ""}`}
                >
                  {/* Apply the rainbow border directly so we can reuse the animation logic */}
                  <div className="social-float-rainbow-border" aria-hidden="true" />
                  <span className="social-float-item-content-wrapper">
                    <span className="social-float-item-icon" style={{ color: isLight ? (link.id === "linkedin" ? link.color : (link as { lightColor?: string }).lightColor ?? link.color) : link.color }}>{link.icon}</span>
                    {link.id === "linkedin" ? (
                      <span className="social-float-item-text">
                        <span className="social-float-item-title" style={{ fontSize: "0.85rem", opacity: 0.85 }}>Click to go ↗</span>
                      </span>
                    ) : (
                      link.label && (
                        <span className="social-float-item-text">
                          <span className="social-float-item-title">{link.label}</span>
                          {link.sublabel && <span className="social-float-item-sublabel">{link.sublabel}</span>}
                        </span>
                      )
                    )}
                    {link.floatingIcon && <span className="social-float-floating-badge" aria-hidden="true">{link.floatingIcon}</span>}
                  </span>
                </a>
              );
            })}
          </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close social links menu" : "Open social links menu"}
          aria-expanded={menuOpen}
          className={`social-hamburger-btn${threadsActive ? " threads-on" : ""}`}
        >
          <div className="social-float-rainbow-border" aria-hidden="true" />
          <span className={`hamburger-icon${menuOpen ? " open" : ""}`} aria-hidden="true">
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </>
  );
}
