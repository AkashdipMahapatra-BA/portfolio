import { ContactForm } from "@/components/ui/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "5rem 1.5rem 6rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Get In Touch
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Left: copy */}
        <div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.3,
              marginBottom: "1rem",
            }}
          >
            Let's build something{" "}
            <span style={{ color: "var(--color-accent)" }}>together.</span>
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              marginBottom: "1.75rem",
            }}
          >
            Open to senior DevOps / Data Engineering roles, cloud architecture
            consulting, and Agentic AI projects. Drop me a message and I'll
            respond within 24 hours.
          </p>

          {/* Contact meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Location", value: "Chennai, India" },
              { label: "Availability", value: "Open to opportunities" },
              { label: "Response time", value: "< 24 hours" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    minWidth: "7rem",
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-text)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
