"use client";

import { useState, useEffect, useRef } from "react";
import InitialLoader from "@/components/ui/InitialLoader";
import {
  SolidWorksLogo,
  JenkinsLogo,
  GithubLogo,
  DatadogLogo,
  WiresharkLogo,
  TerraformLogo,
  DockerLogo,
  LinuxLogo,
  KaliLinuxLogo,
  AwsLogo,
  AwsLambdaLogo,
  GcpLogo,
  AzureLogo,
  VercelLogo,
  NetlifyLogo,
  PythonLogo,
  FastApiLogo,
  NginxLogo,
  ApacheKafkaLogo,
  Auth0Logo,
  SalesforceLogo,
  OllamaLogo,
  HuggingFaceLogo,
  QdrantLogo,
  Neo4jLogo,
  RedisLogo,
  SqLiteLogo,
} from "@/components/ui/BrandLogos";

const FULL_TEXT = "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist";

const TECH_STACK = [
  // ⚙️ CAD & Design - not related to cloud but have knowledge
  { name: "SolidWorks", icon: SolidWorksLogo },
  { name: "Salesforce", icon: SalesforceLogo },

  // 🛠️ CI/CD, Observability & Networking
  { name: "Jenkins", icon: JenkinsLogo },
  { name: "GitHub Actions", icon: GithubLogo },
  { name: "Datadog", icon: DatadogLogo },
  { name: "Wireshark", icon: WiresharkLogo },

  // 🧱 IaC, Containers & Operating Systems
  { name: "Terraform", icon: TerraformLogo },
  { name: "Docker", icon: DockerLogo },
  { name: "Linux (Ubuntu/RHEL)", icon: LinuxLogo },
  { name: "Kali Linux", icon: KaliLinuxLogo },

  // ☁️ Cloud Platforms & Serverless
  { name: "AWS", icon: AwsLogo },
  // { name: "AWS Lambda", icon: AwsLambdaLogo },
  { name: "GCP", icon: GcpLogo },
  { name: "Azure", icon: AzureLogo },
  { name: "Vercel", icon: VercelLogo },
  { name: "Netlify", icon: NetlifyLogo },

  // 🐍 Backend, APIs, Streaming & Enterprise
  { name: "Python (Boto3)", icon: PythonLogo },
  { name: "FastAPI", icon: FastApiLogo },
  { name: "Nginx", icon: NginxLogo },
  { name: "Apache Kafka", icon: ApacheKafkaLogo },
  { name: "Auth0", icon: Auth0Logo },

  // 🤖 AI/LLMs & Vector/Graph/SQL Databases
  { name: "Ollama", icon: OllamaLogo },
  { name: "Hugging Face", icon: HuggingFaceLogo },
  { name: "Qdrant", icon: QdrantLogo },
  { name: "Neo4j", icon: Neo4jLogo },
  { name: "Redis / Valkey", icon: RedisLogo },
  { name: "SQLite", icon: SqLiteLogo },
];

// Duplicate the array so the marquee seamlessly loops without snapping
const LOOPED_STACK = [...TECH_STACK, ...TECH_STACK];

export function Hero() {
  const [startTyping, setStartTyping] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const typedRef = useRef<HTMLSpanElement>(null);

  const handleLoaderComplete = () => {
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
          minHeight: "calc(100vh - 3.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "52rem", width: "100%" }}>

          {/* Terminal window chrome */}
          <div className="card" style={{ overflow: "hidden" }}>

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
                }}
              >
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
                      width: "2px",
                      height: "1.1em",
                      background: startTyping ? "var(--color-accent)" : "transparent",
                      marginLeft: "2px",
                      verticalAlign: "text-bottom",
                      animation: startTyping ? "blink 1s step-end infinite" : "none",
                    }}
                  />
                </span>
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
              <div className="hero-ribbon-wrapper">
                <div className="hero-ribbon-content">
                  {LOOPED_STACK.map((tech, i) => (
                    <div 
                      key={i} 
                      className="hero-ribbon-item"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.65rem", 
                        transition: "color 0.3s ease",
                        cursor: "default"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-muted)"}
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
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
        `}</style>
      </section>
    </>
  );
}
