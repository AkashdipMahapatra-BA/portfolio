import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ChatBot } from "@/components/ui/ChatBot";
import { TRPCProvider } from "@/lib/trpc-client";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/jetbrains-mono-latin-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-mono-code",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akashdipmahapatra.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist",
  description: "Portfolio of Akashdip Mahapatra — Specializing in Data Engineering, Infrastructure Automation, DevOps, Salesforce, AWS, Python, and orchestrating Enterprise Agentic AI.",
  keywords: [
    "Akashdip Mahapatra",
    "Data Engineer",
    "Cloud Automation",
    "DevOps",
    "Salesforce",
    "AWS",
    "Python",
    "Terraform",
    "Agentic AI",
    "Infrastructure Automation",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Akashdip Mahapatra" }],
  creator: "Akashdip Mahapatra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title: "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist",
    description: "Portfolio of Akashdip Mahapatra — Specializing in Data Engineering, Infrastructure Automation, DevOps, Salesforce, AWS, and Python.",
    siteName: "Akashdip Mahapatra Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akashdip Mahapatra - Data Engineer & Cloud Automation Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akashdip Mahapatra | Data Engineer & Cloud Automation Specialist",
    description: "Portfolio of Akashdip Mahapatra — Specializing in Data Engineering, Infrastructure Automation, DevOps, Salesforce, AWS, and Python.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
      </head>
      <body>
        <ThemeProvider>
          <TRPCProvider>
            <Navbar />
            <main style={{ paddingTop: "3.5rem" }}>
              {children}
            </main>
            <ChatBot />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

