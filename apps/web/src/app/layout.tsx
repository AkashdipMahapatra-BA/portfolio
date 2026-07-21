import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
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

export const metadata: Metadata = {
  title: "Akashdip | DevOps & Data Engineer",
  description: "Portfolio of Akashdip — DevOps, Data Engineering, AWS, Python, Terraform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <TRPCProvider>
            <Navbar />
            <main style={{ paddingTop: "3.5rem" }}>
              {children}
            </main>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
