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
    floatingIcon: HatIcon,
  },
] as const;

export function SocialFloatMenu({ chatIsOpen }: { chatIsOpen: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [threadsActive, setThreadsActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          display: none;
        }

        @media (max-width: 768px), (pointer: coarse) and (orientation: portrait) {
          .social-float-root { display: flex; }
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
        }

        .social-float-items {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          padding-right: 2px;
          padding-top: 5px;
        }

        .social-float-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          width: 44px;
          padding: 0;
          border-radius: 0.75rem;
          background: rgba(30, 41, 59, 0.72);
          backdrop-filter: blur(12px) saturate(1.4);
          color: var(--color-text);
          text-decoration: none;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 4px 16px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          position: relative;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
        }

        .social-float-item.expanded {
          width: 200px;
          justify-content: flex-start;
          background: rgba(30, 41, 59, 0.95);
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
          width: 140px;
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
          border-radius: 50%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .social-float-item.expanded .social-float-floating-badge {
          opacity: 1;
          transform: scale(1);
          animation: badge-wiggle-mobile 1s ease-in-out infinite alternate;
        }

        @keyframes badge-wiggle-mobile {
          0% { transform: translateY(0) rotate(-5deg) scale(1); }
          100% { transform: translateY(-3px) rotate(5deg) scale(1.05); }
        }

        .social-float-rainbow-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          overflow: hidden;
          animation: periodic-rainbow-fade 6s ease-in-out infinite;
        }

        .social-float-rainbow-border::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent 0deg, transparent 90deg, rgba(6, 182, 212, 1) 120deg, rgba(168, 85, 247, 1) 180deg, rgba(239, 68, 68, 1) 240deg, rgba(250, 204, 21, 1) 300deg, transparent 360deg);
          animation: rainbow-spin-360-mobile 2.5s linear infinite;
        }

        @keyframes rainbow-spin-360-mobile { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes periodic-rainbow-fade { 0%, 60%, 100% { opacity: 0; } 70%, 90% { opacity: 1; } }

        @keyframes social-slide-up {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .social-float-item-enter-0 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.00s both; }
        .social-float-item-enter-1 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.06s both; }
        .social-float-item-enter-2 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.12s both; }

        .hamburger-icon { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease; }
        .hamburger-icon.open { transform: rotate(90deg); }
      `}</style>

      <div
        className="social-float-root"
        style={{ opacity, transform: `translateY(${translateY})`, pointerEvents: isHidden ? "none" : "auto", transition: "all 0.35s ease" }}
        aria-label="Social media links"
      >
        {menuOpen && (
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
                  className={`social-float-item social-float-item-enter-${i} ${isExpanded ? "expanded" : ""}`}
                >
                  {link.id === "linkedin" && <div className="social-float-rainbow-border" aria-hidden="true" />}
                  <span className="social-float-item-content-wrapper">
                    <span className="social-float-item-icon" style={{ color: link.color }}>{link.icon}</span>
                    {link.label && (
                      <span className="social-float-item-text">
                        <span className="social-float-item-title">{link.label}</span>
                        {link.sublabel && <span className="social-float-item-sublabel">{link.sublabel}</span>}
                      </span>
                    )}
                    {link.floatingIcon && <span className="social-float-floating-badge" aria-hidden="true">{link.floatingIcon}</span>}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close social links menu" : "Open social links menu"}
          aria-expanded={menuOpen}
          className={`social-hamburger-btn${threadsActive ? " threads-on" : ""}`}
        >
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
