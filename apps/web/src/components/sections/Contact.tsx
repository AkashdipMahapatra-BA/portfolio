import { ContactForm } from "@/components/ui/ContactForm";

const contactStyles = `
  @keyframes orbit-spin {
    0%   { transform: rotate(0deg)   translateY(-7px) rotate(0deg); }
    50%  { transform: rotate(180deg) translateY(-7px) rotate(-180deg); }
    100% { transform: rotate(360deg) translateY(-7px) rotate(-360deg); }
  }
  @keyframes orbit-spin-r {
    0%   { transform: rotate(0deg)    translateY(6px) rotate(0deg); }
    50%  { transform: rotate(-180deg) translateY(6px) rotate(180deg); }
    100% { transform: rotate(-360deg) translateY(6px) rotate(360deg); }
  }

  /* ── Desktop: two-column grid ── */
  .contact-outer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: 3rem;
    align-items: start;
  }

  /* ── Mobile (≤ 640px): single column, stacked ── */
  @media (max-width: 640px) {
    .contact-outer {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .contact-photo-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.25rem;
    }
    .contact-meta-list {
      flex: 1;
    }
    .contact-form-card {
      width: 100%;
      box-sizing: border-box;
    }
  }

  /* ── Tablet (641px – 900px): photo left, meta right inline ── */
  @media (min-width: 641px) and (max-width: 900px) {
    .contact-photo-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
    }
    .contact-meta-list {
      flex: 1;
    }
  }

  /* ── Desktop (> 900px): photo below meta, centered ── */
  @media (min-width: 901px) {
    .contact-photo-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
    }
  }
`;

function ProfilePhoto({ size = 140 }: { size?: number }) {
  const r1 = size / 2 + 12;
  const r2 = size / 2 + 20;
  const total = (r2 + 8) * 2;

  return (
    <div style={{ position: "relative", width: total, height: total, flexShrink: 0 }}>
      {/* outer dashed ring */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: r2 * 2, height: r2 * 2,
        marginTop: -r2, marginLeft: -r2,
        borderRadius: "50%",
        border: "1px dashed color-mix(in srgb, var(--color-accent) 30%, transparent)",
        pointerEvents: "none",
      }} />
      {/* inner dashed ring */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: r1 * 2, height: r1 * 2,
        marginTop: -r1, marginLeft: -r1,
        borderRadius: "50%",
        border: "1px dashed color-mix(in srgb, var(--color-accent) 18%, transparent)",
        pointerEvents: "none",
      }} />

      {/* 3 outer orbiting dots */}
      {[0, 1, 2].map((i) => (
        <div key={`o${i}`} style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: r2 * 2, height: r2 * 2,
          marginTop: -r2, marginLeft: -r2,
          borderRadius: "50%",
          animation: `orbit-spin 2.4s ease-in-out ${i * 0.8}s infinite`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "50%",
            width: 8, height: 8,
            marginLeft: -4, marginTop: -4,
            borderRadius: "50%",
            background: "var(--color-accent)",
            boxShadow: "0 0 8px var(--color-accent)",
          }} />
        </div>
      ))}

      {/* 2 inner reverse dots */}
      {[0, 1].map((i) => (
        <div key={`i${i}`} style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: r1 * 2, height: r1 * 2,
          marginTop: -r1, marginLeft: -r1,
          borderRadius: "50%",
          animation: `orbit-spin-r 3.2s ease-in-out ${i * 1.6}s infinite`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "50%",
            width: 6, height: 6,
            marginLeft: -3, marginTop: -3,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-accent) 70%, white)",
            boxShadow: "0 0 6px var(--color-accent)",
          }} />
        </div>
      ))}

      {/* photo */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: size, height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid color-mix(in srgb, var(--color-accent) 50%, transparent)",
        boxShadow: "0 0 24px color-mix(in srgb, var(--color-accent) 20%, transparent), 0 8px 32px rgba(0,0,0,0.4)",
        filter: "saturate(1.1) contrast(1.05)",
      }}>
        <img
          src="/img/akashdip.jpg"
          alt="Akashdip Mahapatra"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
    </div>
  );
}

const META = [
  { label: "Location",      value: "Chennai, India" },
  { label: "Availability",  value: "Open to opportunities" },
  { label: "Response time", value: "< 24 hours" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      style={{ padding: "5rem 1.5rem 6rem", maxWidth: "72rem", margin: "0 auto" }}
    >
      <style>{contactStyles}</style>

      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Get In Touch
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      <div className="contact-outer">

        {/* ── Left column ── */}
        <div>
          {/* Heading + description — always on top */}
          <h2 style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            lineHeight: 1.3,
            marginBottom: "1rem",
          }}>
            Let's build something{" "}
            <span style={{ color: "var(--color-accent)" }}>together.</span>
          </h2>
          <p style={{
            fontSize: "0.9rem",
            color: "var(--color-muted)",
            lineHeight: 1.75,
            marginBottom: "1.75rem",
          }}>
            Open to senior DevOps / Data Engineering roles, cloud architecture
            consulting, and Agentic AI projects. Drop me a message and I'll
            respond within 24 hours.
          </p>

          {/* Photo + meta — responsive via CSS class */}
          <div className="contact-photo-meta">
            {/* Photo — on mobile/tablet sits on the RIGHT via order */}
            <div style={{ order: 2 }}>
              <ProfilePhoto size={130} />
            </div>

            {/* Meta — on mobile/tablet sits on the LEFT */}
            <div className="contact-meta-list" style={{ order: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {META.map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--color-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      minWidth: "6.5rem",
                      flexShrink: 0,
                    }}>
                      {label}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-text)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column: form ── */}
        <div className="card contact-form-card" style={{ padding: "1.75rem" }}>
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
