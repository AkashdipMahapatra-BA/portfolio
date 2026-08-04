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
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
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
