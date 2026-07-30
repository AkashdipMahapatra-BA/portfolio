import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Allow custom title/description per page via query params
  // e.g. /api/og?title=Projects&description=...
  const title = searchParams.get("title") ?? "Akashdip Mahapatra";
  const description =
    searchParams.get("description") ??
    "Data Engineer & Cloud Automation Specialist";
  const page = searchParams.get("page") ?? "";

  const techStack = [
    "Python",
    "AWS",
    "Terraform",
    "Salesforce",
    "Docker",
    "Neo4j",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Glow orb top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Glow orb bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 60px 0",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
              }}
            >
              A
            </div>
            <span style={{ color: "#94a3b8", fontSize: "16px", letterSpacing: "0.05em" }}>
              akashdipmahapatra.in
            </span>
          </div>

          {/* Page badge */}
          {page && (
            <div
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "20px",
                padding: "6px 16px",
                color: "#a5b4fc",
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {page}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "40px 60px 50px",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#10b981",
                fontSize: "14px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Available for opportunities
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 20 ? "52px" : "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "18px",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {title}
          </div>

          {/* Description / role */}
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              marginBottom: "44px",
              fontWeight: 400,
              display: "flex",
            }}
          >
            {description}
          </div>

          {/* Tech stack pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {techStack.map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  color: "#cbd5e1",
                  fontSize: "14px",
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar with gradient accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
