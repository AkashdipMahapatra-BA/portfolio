"use client";

import { useState, useEffect } from "react";

/* ─── Social link definitions ───────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "Connect with me",
    href: "https://www.linkedin.com/in/akashdip2001",
    ariaLabel: "Akashdip Mahapatra on LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0A66C2",
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
    badge: "🔒",
    color: "#e2e8f0",
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
    badge: "🎓",
    color: "#e2e8f0",
  },
] as const;

/* ─── Component ─────────────────────────────────────────────────────────── */
export function SocialFloatMenu({ chatIsOpen }: { chatIsOpen: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [threadsActive, setThreadsActive] = useState(false);

  /* Sync bottom-of-page detection with ChatBot logic */
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("footer-copyright");
      if (el) {
        const rect = el.getBoundingClientRect();
        setIsAtBottom(rect.top <= window.innerHeight - 20);
      } else {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight - 100;
        setIsAtBottom(scrollPosition >= threshold);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* Listen for the hero threads becoming active — used to trigger the
     rainbow reflection. The Hero sets threadsActive after the InitialLoader
     completes, then fires a custom event so sibling components can react. */
  useEffect(() => {
    const handleThreads = () => setThreadsActive(true);
    window.addEventListener("heroThreadsActive", handleThreads);
    return () => window.removeEventListener("heroThreadsActive", handleThreads);
  }, []);

  /* Close menu when chatbot opens */
  useEffect(() => {
    if (chatIsOpen) setMenuOpen(false);
  }, [chatIsOpen]);

  /* Computed visibility flags */
  const isHidden = isAtBottom || chatIsOpen;
  const translateY = isHidden ? "24px" : "0px";
  const opacity = isHidden ? 0 : 1;

  return (
    <>
      <style>{`
        /* ── Social float menu container ─────────────────────────── */
        .social-float-root {
          position: fixed;
          /* sit directly above the ChatBot button height (≈ 48px button + 1.5rem gap + 1.5rem bottom) */
          bottom: calc(1.5rem + 48px + 0.75rem);
          right: 1.5rem;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          /* Only visible on mobile */
          display: none;
        }

        @media (max-width: 768px), (pointer: coarse) and (orientation: portrait) {
          .social-float-root {
            display: flex;
          }
        }

        /* ── Hamburger / X toggle button ─────────────────────────── */
        .social-hamburger-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(30, 41, 59, 0.72);
          backdrop-filter: blur(12px) saturate(1.4);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          color: var(--color-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.2s ease,
            color 0.2s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .social-hamburger-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        /* Rainbow reflection on hamburger button — left-to-right gradient
           (mobile: threads enter from top of terminal card, spread down-left) */
        .social-hamburger-btn.threads-on::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at 0% 50%,
            rgba(6, 182, 212, 0.35) 0%,
            rgba(250, 204, 21, 0.25) 30%,
            rgba(239, 68, 68, 0.2) 55%,
            rgba(168, 85, 247, 0.18) 75%,
            transparent 100%
          );
          pointer-events: none;
          animation: social-btn-reflection-mobile 5s ease-in-out 4.2s both;
        }

        /* ── Expandable menu items ───────────────────────────────── */
        .social-float-items {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          overflow: hidden;
        }

        .social-float-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.9rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(30, 41, 59, 0.72);
          backdrop-filter: blur(12px) saturate(1.4);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: var(--font-sans);
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .social-float-item:hover {
          border-color: rgba(255, 255, 255, 0.28);
          transform: translateX(-3px);
        }

        /* Rainbow reflection on expanded mobile buttons — left-side gradient */
        .social-float-item.threads-on::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            rgba(6, 182, 212, 0.35) 0%,
            rgba(250, 204, 21, 0.25) 20%,
            rgba(239, 68, 68, 0.18) 40%,
            rgba(168, 85, 247, 0.12) 60%,
            transparent 80%
          );
          pointer-events: none;
          animation: social-btn-reflection-mobile 5s ease-in-out 4.2s both;
        }

        .social-float-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .social-float-item-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .social-float-item-sublabel {
          font-size: 0.62rem;
          font-weight: 400;
          color: var(--color-muted);
          font-family: var(--font-mono);
        }

        .social-float-badge {
          font-size: 0.7rem;
          margin-left: 0.15rem;
        }

        /* ── Slide-up animation for menu items ───────────────────── */
        @keyframes social-slide-up {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .social-float-item-enter-0 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.00s both; }
        .social-float-item-enter-1 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.06s both; }
        .social-float-item-enter-2 { animation: social-slide-up 0.22s cubic-bezier(0.16,1,0.3,1) 0.12s both; }

        /* ── Rainbow reflection keyframe (mobile) ────────────────── */
        @keyframes social-btn-reflection-mobile {
          0%   { opacity: 0; }
          15%, 70% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ── X icon rotation ─────────────────────────────────────── */
        .hamburger-icon {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        }
        .hamburger-icon.open {
          transform: rotate(90deg);
        }
      `}</style>

      <div
        className="social-float-root"
        style={{
          opacity,
          transform: `translateY(${translateY})`,
          pointerEvents: isHidden ? "none" : "auto",
          transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-label="Social media links"
      >
        {/* Expanded items — render only when open */}
        {menuOpen && (
          <div className="social-float-items" role="list">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                role="listitem"
                className={`social-float-item social-float-item-enter-${i}${threadsActive ? " threads-on" : ""}`}
              >
                <span className="social-float-item-icon" style={{ color: link.color }}>
                  {link.icon}
                </span>
                <span className="social-float-item-text">
                  <span>
                    {link.label}
                    {"badge" in link && (
                      <span className="social-float-badge" aria-hidden="true">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <span className="social-float-item-sublabel">{link.sublabel}</span>
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Hamburger / X toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close social links menu" : "Open social links menu"}
          aria-expanded={menuOpen}
          className={`social-hamburger-btn${threadsActive ? " threads-on" : ""}`}
        >
          <span className={`hamburger-icon${menuOpen ? " open" : ""}`} aria-hidden="true">
            {menuOpen ? (
              /* X icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* ☰ hamburger icon */
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
