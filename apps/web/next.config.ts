import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["api"],

  // ── Compression ─────────────────────────────────────────────────────────
  compress: true,

  // ── Remove X-Powered-By header (security hardening) ─────────────────────
  poweredByHeader: false,

  // ── Image Optimisation ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
  },

  // ── Security & Performance Headers ──────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy — only send referrer to same origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions Policy — disable unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // DNS prefetch control
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // HSTS — enforce HTTPS for 1 year (only meaningful on prod domain)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Long-cache immutable static assets (fonts, images)
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/img/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // CV PDF — short cache so updates roll out quickly
        source: "/Akashdip_Mahapatra_CV.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Content-Disposition",
            value: "attachment; filename=\"Akashdip_Mahapatra_CV.pdf\"",
          },
        ],
      },
    ];
  },
  // ── Subpath Rewrites (Reverse Proxying External/Hackathon Apps) ─────────
  async rewrites() {
    return [
      {
        source: "/tcs-ai-hackathon",
        destination: "https://ai-assisted-airline-customer-refund.vercel.app/",
      },
      {
        source: "/tcs-ai-hackathon/:path*",
        destination: "https://ai-assisted-airline-customer-refund.vercel.app/:path*",
      },
      {
        source: "/skyassure-ai",
        destination: "https://ai-assisted-airline-customer-refund.vercel.app/",
      },
      {
        source: "/skyassure-ai/:path*",
        destination: "https://ai-assisted-airline-customer-refund.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
