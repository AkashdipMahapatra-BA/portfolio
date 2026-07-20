"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const MAIN_NAV = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
];

const COLLEGE_NAV = [
  { label: "Development", href: "#development" },
  { label: "IoT",         href: "#iot"         },
  { label: "Networking",  href: "#networking"  },
  { label: "H@cking",     href: "#hacking"     },
];

export function Navbar() {
  const pathname = usePathname();
  const isCollegePage = pathname === "/college-projects";
  const navLinks = isCollegePage ? COLLEGE_NAV : MAIN_NAV;

  return (
    <header
      className="glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "3.5rem",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          height: "100%",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo — always links back to home */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--color-accent)",
            letterSpacing: "0.05em",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          akashdip<span style={{ color: "var(--color-muted)" }}>.</span>
        </Link>

        {/* Nav links — swap based on current page */}
        <ul
          style={{
            display: "flex",
            gap: "1.75rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <ThemeToggle />
          <a
            href="/Akashdip_Mahapatra_CV.pdf"
            download
            className="btn-accent"
            style={{ textDecoration: "none" }}
          >
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
