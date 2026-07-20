export default function CollegeProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This nested layout intentionally renders children with no wrapper.
  // The root layout's <Navbar> and <main style={{ paddingTop: "3.5rem" }}>
  // still apply — but we counteract the padding inside college-projects.css
  // using a negative margin on .college-projects-root so the legacy page
  // owns its own full-bleed layout from the very top of the viewport.
  return <>{children}</>;
}
