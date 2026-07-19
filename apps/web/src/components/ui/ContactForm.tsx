"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc-client";
import { contactSchema, type ContactInput } from "validators";

/* ─── Shared input style ─────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.875rem",
  borderRadius: "0.375rem",
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
  color: "var(--color-text)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-sans)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--color-muted)",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: "0.72rem", color: "#F87171", margin: 0 }}>{error}</p>
      )}
    </div>
  );
}

/* ─── Focus ring via inline event handlers (no Tailwind needed) ─────────── */
function focusOn(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "var(--color-accent)";
  e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)";
}
function focusOff(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "var(--color-border)";
  e.currentTarget.style.boxShadow = "none";
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const mutation = trpc.contact.send.useMutation();

  const onSubmit = (data: ContactInput) => {
    mutation.mutate(data, { onSuccess: () => reset() });
  };

  /* ── Success state ── */
  if (mutation.isSuccess) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "2.5rem" }}>✓</span>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)" }}>
          Message sent!
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
          Thanks for reaching out — I'll get back to you shortly.
        </p>
        <button
          onClick={() => mutation.reset()}
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            color: "var(--color-accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
    >
      {/* Row: Name + Email */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
          gap: "1.1rem",
        }}
      >
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Your name"
            style={inputStyle}
            onFocus={focusOn}
            onBlur={focusOff}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={focusOn}
            onBlur={focusOff}
          />
        </Field>
      </div>

      {/* Subject */}
      <Field label="Subject" error={errors.subject?.message}>
        <input
          {...register("subject")}
          placeholder="What's this about?"
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      {/* Message */}
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      {/* Error banner */}
      {mutation.isError && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#F87171",
            padding: "0.6rem 0.875rem",
            borderRadius: "0.375rem",
            background: "color-mix(in srgb, #F87171 10%, transparent)",
            border: "1px solid color-mix(in srgb, #F87171 25%, transparent)",
          }}
        >
          {mutation.error.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn-accent"
        style={{
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          opacity: mutation.isPending ? 0.7 : 1,
          cursor: mutation.isPending ? "not-allowed" : "pointer",
          border: "none",
        }}
      >
        {mutation.isPending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          "Send Message →"
        )}
      </button>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
