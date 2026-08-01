import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge Middleware — Vanity URL redirects
 *
 * Runs at the edge before any request is processed.
 * Maps short portfolio URLs → real destinations.
 *
 * Usage examples:
 *   akashdipmahapatra.in/github   → GitHub profile
 *   akashdipmahapatra.in/linkedin → LinkedIn profile
 *   akashdipmahapatra.in/cv       → Resume PDF
 *   akashdipmahapatra.in/email    → mailto link
 *   akashdipmahapatra.in/twitter  → Twitter/X profile
 */

const VANITY_REDIRECTS: Record<string, string> = {
  "/github": "https://github.com/AkashdipMahapatra-BA",
  "/linkedin": "https://www.linkedin.com/in/akashdip2001",
  "/cv": "/Akashdip_Mahapatra_CV.pdf",
  "/resume": "/Akashdip_Mahapatra_CV.pdf",
  "/email": "mailto:contact@akashdipmahapatra.in",
  "/twitter": "https://twitter.com/AkashdipM",
  "/x": "https://twitter.com/AkashdipM",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();

  const destination = VANITY_REDIRECTS[pathname];

  if (destination) {
    // Use 307 (temporary) so social crawlers always re-check
    // Switch to 308 (permanent) once URLs are finalised
    return NextResponse.redirect(
      destination.startsWith("http")
        ? destination
        : new URL(destination, request.url),
      { status: 307 }
    );
  }

  return NextResponse.next();
}

/**
 * Only run middleware on vanity paths — never on API routes,
 * static files, or Next.js internals.
 */
export const config = {
  matcher: [
    "/github",
    "/linkedin",
    "/cv",
    "/resume",
    "/email",
    "/twitter",
    "/x",
  ],
};
