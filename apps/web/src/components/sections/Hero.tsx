"use client";

import { useState, useEffect, useRef } from "react";
import InitialLoader from "@/components/ui/InitialLoader";
import { HeroThreads } from "@/components/ui/HeroThreads";
import {
  SolidWorksLogo,
  FigmaLogo,
  GimpLogo,
  SalesforceLogo,
  JiraLogo,
  ConfluenceLogo,
  ServiceNowLogo,
  GitLogo,
  GithubLogo,
  JenkinsLogo,
  DatadogLogo,
  GrafanaLogo,
  WiresharkLogo,
  TerraformLogo,
  DockerLogo,
  KubernetesLogo,
  LinuxLogo,
  UbuntuLogo,
  FedoraLogo,
  KaliLinuxLogo,
  MsDosLogo,
  AwsLogo,
  AwsLambdaLogo,
  FirebaseLogo,
  GcpLogo,
  AzureLogo,
  VercelLogo,
  NetlifyLogo,
  PythonLogo,
  NodeJsLogo,
  FastApiLogo,
  PostmanLogo,
  NginxLogo,
  ApacheKafkaLogo,
  Auth0Logo,
  OllamaLogo,
  HuggingFaceLogo,
  QdrantLogo,
  Neo4jLogo,
  RedisLogo,
  PostgreSqlLogo,
  MySqlLogo,
  MongoDbLogo,
  SqLiteLogo,
} from "@/components/ui/BrandLogos";

const FULL_TEXT = "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist";

/* ─── Desktop hero social glass buttons ─────────────────────────────────── */
const GitHubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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

const HERO_SOCIAL_LINKS = [
  {
    id: "github-academic",
    label: "GitHub · Academic",
    sublabel: "Projects 2021 – 25",
    href: "https://github.com/akashdip2001",
    ariaLabel: "Akashdip Mahapatra academic GitHub — college projects 2021 to 2025",
    icon: GitHubIcon,
    iconColor: "var(--color-text)",
    floatingIcon: HatIcon,
  },
  {
    id: "github-work",
    label: "GitHub · Work",
    sublabel: "Official repos (private)",
    href: "https://github.com/AkashdipMahapatra-BA",
    ariaLabel: "Akashdip Mahapatra official work GitHub — current repos (mostly private)",
    icon: GitHubIcon,
    iconColor: "var(--color-text)",
    floatingIcon: BriefcaseIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "",
    href: "https://www.linkedin.com/in/akashdip2001",
    ariaLabel: "Akashdip Mahapatra on LinkedIn",
    icon: LinkedInIcon,
    iconColor: "#0A66C2",
    floatingIcon: null,
  },
];

const TECH_STACK = [
  // ⚙️ Design & CAD
  { name: "SolidWorks", icon: SolidWorksLogo },
  { name: "Figma", icon: FigmaLogo },
  { name: "GIMP", icon: GimpLogo },
  { name: "Salesforce", icon: SalesforceLogo },

  // 🛠️ CI/CD, Agile & Observability
  { name: "Jira", icon: JiraLogo },
  { name: "Confluence", icon: ConfluenceLogo },
  { name: "ServiceNow", icon: ServiceNowLogo },
  { name: "Git", icon: GitLogo },
  { name: "GitHub Actions", icon: GithubLogo },
  { name: "Jenkins", icon: JenkinsLogo },
  { name: "Datadog", icon: DatadogLogo },
  { name: "Grafana", icon: GrafanaLogo },
  { name: "Wireshark", icon: WiresharkLogo },

  // 🧱 IaC, Containers & OS
  { name: "Terraform", icon: TerraformLogo },
  { name: "Docker", icon: DockerLogo },
  { name: "Kubernetes", icon: KubernetesLogo },
  { name: "Linux (Ubuntu/RHEL)", icon: LinuxLogo },
  { name: "Ubuntu", icon: UbuntuLogo },
  { name: "Fedora", icon: FedoraLogo },
  { name: "Kali Linux", icon: KaliLinuxLogo },
  { name: "MS-DOS", icon: MsDosLogo },

  // ☁️ Cloud Platforms & Serverless
  { name: "AWS", icon: AwsLogo },
  // { name: "AWS Lambda", icon: AwsLambdaLogo },
  { name: "Firebase", icon: FirebaseLogo },
  { name: "GCP", icon: GcpLogo },
  { name: "Azure", icon: AzureLogo },
  { name: "Vercel", icon: VercelLogo },
  { name: "Netlify", icon: NetlifyLogo },

  // 🐍 Backend, APIs, Streaming & Identity
  { name: "Python (Boto3)", icon: PythonLogo },
  { name: "Node.js", icon: NodeJsLogo },
  { name: "FastAPI", icon: FastApiLogo },
  { name: "Postman", icon: PostmanLogo },
  { name: "Nginx", icon: NginxLogo },
  { name: "Apache Kafka", icon: ApacheKafkaLogo },
  { name: "Auth0", icon: Auth0Logo },

  // 🤖 AI / LLMs & Vector / Graph / SQL / NoSQL Databases
  { name: "Ollama", icon: OllamaLogo },
  { name: "Hugging Face", icon: HuggingFaceLogo },
  { name: "Qdrant", icon: QdrantLogo },
  { name: "Neo4j", icon: Neo4jLogo },
  { name: "Redis / Valkey", icon: RedisLogo },
  { name: "PostgreSQL", icon: PostgreSqlLogo },
  { name: "MySQL", icon: MySqlLogo },
  { name: "MongoDB", icon: MongoDbLogo },
  { name: "SQLite", icon: SqLiteLogo },
];

// Duplicate the array so the marquee seamlessly loops without snapping
const LOOPED_STACK = [...TECH_STACK, ...TECH_STACK];

export function Hero() {
  const [startTyping, setStartTyping] = useState(false);
  const [threadsActive, setThreadsActive] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const typedRef = useRef<HTMLSpanElement>(null);

  // Ribbon interactive state
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);
  const ribbonContentRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef(0);
  const speedRef = useRef(-1.7); // Default right-to-left
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ribbon animation loop
  useEffect(() => {
    let animationFrameId: number;
    const content = ribbonContentRef.current;
    if (!content) return;
    
    const loop = () => {
      if (!isDraggingRef.current) {
        xPosRef.current += speedRef.current;
      }
      
      const contentWidth = content.scrollWidth / 2;
      
      if (contentWidth > 0) {
        if (xPosRef.current <= -contentWidth) {
          xPosRef.current += contentWidth;
        } else if (xPosRef.current > 0) {
          xPosRef.current -= contentWidth;
        }
      }
      
      content.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  const handleRibbonPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    
    // Change cursor
    if (ribbonWrapperRef.current) {
      ribbonWrapperRef.current.style.cursor = "grabbing";
    }
  };

  const handleRibbonPointerMove = (e: React.PointerEvent) => {
    const wrapper = ribbonWrapperRef.current;
    if (!wrapper) return;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartXRef.current;
      xPosRef.current += deltaX;
      dragStartXRef.current = e.clientX;
    } else if (e.pointerType === "mouse") {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      const rect = wrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const normalizedX = mouseX / rect.width;
      
      if (normalizedX < 0.4) {
        speedRef.current = ((0.4 - normalizedX) / 0.4) * 2.5;
      } else if (normalizedX > 0.6) {
        speedRef.current = -(((normalizedX - 0.6) / 0.4) * 2.5);
      } else {
        speedRef.current = 0;
      }
    }
  };

  const handleRibbonPointerUpOrLeave = () => {
    isDraggingRef.current = false;
    if (ribbonWrapperRef.current) {
      ribbonWrapperRef.current.style.cursor = "grab";
    }
    
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      speedRef.current = -1.7;
    }, 800);
  };

  const handleLoaderComplete = () => {
    setThreadsActive(true);
    // Let sibling components (e.g. SocialFloatMenu) know threads are active
    // so they can apply the matching rainbow reflection animation.
    window.dispatchEvent(new CustomEvent("heroThreadsActive"));
    setTimeout(() => setStartTyping(true), 1000);
  };

  const replay = () => {
    setStartTyping(false);
    setTimeout(() => {
      setPlayKey((k) => k + 1);
      setStartTyping(true);
    }, 50);
  };

  useEffect(() => {
    if (!startTyping) return;
    const el = typedRef.current;
    if (!el) return;
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      el.textContent = FULL_TEXT.slice(0, i + 1);
      i++;
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [startTyping, playKey]);

  return (
    <>
      <InitialLoader onComplete={handleLoaderComplete} />

      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 3.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
        }}
      >
        <HeroThreads active={threadsActive} />
        <div style={{ maxWidth: "52rem", width: "100%", position: "relative", zIndex: 2 }}>

          {/* Terminal window chrome */}
          <div className="card" style={{ overflow: "hidden", position: "relative" }}>
            {/* Desktop Top-Left Glass Edge Reflection (Point 2) */}
            {threadsActive && <div className="terminal-glass-edge-top" aria-hidden="true" />}
            {/* Desktop Bottom Glass Edge Reflection (Point 3) */}
            {threadsActive && <div className="terminal-glass-edge-bottom" aria-hidden="true" />}
            {/* Mobile Top Edge Glass Reflection (Point 2) */}
            {threadsActive && <div className="terminal-glass-edge-top-mobile" aria-hidden="true" />}
            {/* Mobile Bottom Edge Glass Reflection (Point 3) */}
            {threadsActive && <div className="terminal-glass-edge-bottom-mobile" aria-hidden="true" />}

            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                borderBottom: "1px solid var(--color-border)",
                background: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
              <span
                style={{
                  marginLeft: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                }}
              >
                ~/portfolio — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div className="hero-body" style={{ padding: "1.75rem 1.75rem 2rem" }}>

              {/* Prompt line */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                  marginBottom: "1.25rem",
                  overflowWrap: "anywhere",
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>akashdip@cloud</span>
                <span style={{ color: "var(--color-muted)" }}>:</span>
                <span style={{ color: "#818CF8" }}>~</span>
                <span style={{ color: "var(--color-muted)" }}> $ </span>
                <span>whoami</span>
              </p>

              {/* Typewriter name */}
              <h1
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(1rem, 4vw, 1.5rem)",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.4,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  position: "relative",
                }}
              >
                {/* Phantom layer: This renders invisibly to force the h1 to take up the full final height across all responsive breakpoints immediately, preventing any layout snapping. */}
                <div aria-hidden="true" style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>
                  <span style={{ display: "inline-block", marginRight: "0.4rem" }}>▶</span>
                  {FULL_TEXT}
                </div>

                {/* Actual typing layer */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                  {/* ▶ replay button — inline so text wraps naturally beside it */}
                  <button
                    onClick={replay}
                    title="Replay animation"
                    style={{
                      display: "inline",
                      background: "none",
                      border: "none",
                      padding: 0,
                      marginRight: "0.4rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      lineHeight: "inherit",
                      color: "var(--color-accent)",
                      cursor: "pointer",
                      verticalAlign: "baseline",
                      transition: "transform 0.15s ease, opacity 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    ▶
                  </button>
                  {/* Typed text + cursor — inline, wraps naturally with the ▶ */}
                  <span key={playKey}>
                    <span ref={typedRef} />
                    <span
                      style={{
                        display: "inline-block",
                        width: "3px",
                        height: "1.1em",
                        background: startTyping ? "var(--color-accent)" : "transparent",
                        marginLeft: "4px",
                        verticalAlign: "text-bottom",
                        transformOrigin: "center",
                        borderRadius: "1px",
                        animation: startTyping ? "cursor-blink 1s ease-in-out infinite" : "none",
                      }}
                    />
                  </span>
                </div>
              </h1>

              {/* Subtext */}
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  maxWidth: "44rem",
                  marginBottom: "2rem",
                }}
              >
                Building unbreakable, scalable cloud systems. Specializing in infrastructure automation, deep-stack observability, and orchestrating Enterprise Agentic AI.
              </p>

              {/* Infinite Tech Stack Ribbon */}
              <div 
                className="hero-ribbon-wrapper"
                ref={ribbonWrapperRef}
                style={{ cursor: "grab" }}
                onPointerDown={handleRibbonPointerDown}
                onPointerMove={handleRibbonPointerMove}
                onPointerUp={handleRibbonPointerUpOrLeave}
                onPointerLeave={handleRibbonPointerUpOrLeave}
                onPointerCancel={handleRibbonPointerUpOrLeave}
              >
                <div className="hero-ribbon-content" ref={ribbonContentRef}>
                  {LOOPED_STACK.map((tech, i) => (
                    <div 
                      key={i} 
                      className="hero-ribbon-item"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.65rem", 
                        transition: "color 0.3s ease",
                      }}
                    >
                      <tech.icon size={24} />
                      <span style={{ 
                        fontFamily: "var(--font-mono)", 
                        fontSize: "0.95rem", 
                        fontWeight: 700, 
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap"
                      }}>
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                {/* Left: existing action buttons */}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  <a href="/Akashdip_Mahapatra_CV.pdf" download className="btn-accent" style={{ textDecoration: "none" }}>
                    ↓ Download CV
                  </a>
                  <a
                    href="#experience"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                      paddingBottom: "1px",
                      transition: "opacity 0.2s",
                    }}
                  >
                    View Experience →
                  </a>
                </div>

                {/* Right: glass social buttons — desktop only, hidden on mobile */}
                <div className="hero-social-btns-desktop" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {HERO_SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className={`hero-social-btn${threadsActive ? " threads-on" : ""} ${link.id === "linkedin" ? "linkedin-btn" : ""}`}
                    >
                      <div className="hero-social-rainbow-border" aria-hidden="true" />
                      <span className="hero-social-btn-content-wrapper">
                        <span className="hero-social-btn-icon" style={{ color: link.iconColor }}>
                          {link.icon}
                        </span>
                        {link.label && link.id !== "linkedin" && (
                          <span className="hero-social-btn-text">
                            <span className="hero-social-btn-title">{link.label}</span>
                            {link.sublabel && <span className="hero-social-btn-subtitle">{link.sublabel}</span>}
                          </span>
                        )}
                        {link.floatingIcon && (
                          <span className="hero-social-floating-badge" aria-hidden="true">
                            {link.floatingIcon}
                          </span>
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Scroll hint */}
          <p
            style={{
              textAlign: "center",
              marginTop: "2.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              letterSpacing: "0.1em",
              opacity: 0.6,
            }}
          >
            scroll to explore ↓
          </p>
        </div>

        <style>{`
          @keyframes cursor-blink {
            0%, 100% { 
              opacity: 1; 
              transform: scaleY(1); 
              box-shadow: 0 0 10px var(--color-accent), 0 0 4px var(--color-accent);
            }
            50% { 
              opacity: 0; 
              transform: scaleY(0.3); 
              box-shadow: 0 0 0px transparent;
            }
          }
        `}</style>
      </section>
    </>
  );
}
