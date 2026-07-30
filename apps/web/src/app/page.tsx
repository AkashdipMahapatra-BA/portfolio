import { Hero } from "@/components/sections/Hero";
import { ExperienceSkills } from "@/components/sections/ExperienceSkills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { OtherDomains } from "@/components/sections/OtherDomains";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akashdip Mahapatra",
    "url": "https://akashdipmahapatra.in",
    "jobTitle": "Data Engineer & Cloud Automation Specialist",
    "sameAs": [
      "https://github.com/AkashdipMahapatra-BA"
    ],
    "knowsAbout": [
      "Data Engineering",
      "Cloud Automation",
      "Python",
      "DevOps",
      "AWS",
      "Docker",
      "Kubernetes",
      "Salesforce"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Divider />
      <ExperienceSkills />
      <Divider />
      <Projects />
      <Divider />
      <Education />
      <Divider />
      <OtherDomains />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
      <div style={{ height: "1px", background: "var(--color-border)" }} />
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-muted)",
          letterSpacing: "0.06em",
        }}
      >
        © {new Date().getFullYear()} Akashdip Mahapatra — Built with Next.js · tRPC · Tailwind
      </p>
    </footer>
  );
}
