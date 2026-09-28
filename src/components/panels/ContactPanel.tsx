import { useState, type ChangeEvent, type FormEvent } from "react";
import PanelShell from "./PanelShell";
import { submitContactForm, type ContactErrorCode } from "@/lib/api";
import { validateContactForm, type ContactFormErrors } from "@/lib/validateContactForm";

type Status = "idle" | "submitting" | "success" | "error";

const ERROR_MESSAGES: Record<ContactErrorCode, string> = {
  VALIDATION_ERROR: "Please check the highlighted fields.",
  METHOD_NOT_ALLOWED: "Unexpected error. Please try again.",
  RATE_LIMITED: "Too many requests. Please try again in a moment.",
  SEND_FAILED: "Message could not be sent. Please try again.",
  INTERNAL_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Network error. Check your connection and try again.",
};

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

// PRD §15 — "Communication Center". Contact link placeholder menunggu data asli
// dari user (lihat docs/requirements.md > Assumptions).
export default function ContactPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateContactForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitContactForm(form);

    if (result.success) {
      setStatus("success");
      setForm(EMPTY_FORM);
      return;
    }

    setStatus("error");
    setErrorMessage(ERROR_MESSAGES[result.error]);
    if (result.error === "VALIDATION_ERROR" && result.details) {
      setFieldErrors(result.details as ContactFormErrors);
    }
  };

  if (status === "success") {
    return (
      <PanelShell title="Contact" onClose={onClose}>
        <div className="py-6 text-center">
          <p className="text-sm font-medium">Message sent.</p>
          <p className="mt-1 text-sm text-secondary">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-xs text-secondary hover:text-text"
          >
            Send another message
          </button>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell title="Contact" onClose={onClose}>
      <p className="text-sm text-secondary">Interested in working together?</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <dt className="text-secondary">EMAIL</dt>
          <dd className="mt-0.5">hello@example.com</dd>
        </div>
        <div>
          <dt className="text-secondary">LINKEDIN</dt>
          <dd className="mt-0.5">—</dd>
        </div>
        <div>
          <dt className="text-secondary">GITHUB</dt>
          <dd className="mt-0.5">—</dd>
        </div>
        <div>
          <dt className="text-secondary">WHATSAPP</dt>
          <dd className="mt-0.5">—</dd>
        </div>
      </dl>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
        <Field
          id="contact-name"
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          error={fieldErrors.name}
        />
        <Field
          id="contact-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={fieldErrors.email}
        />
        <Field
          id="contact-subject"
          label="Subject"
          value={form.subject}
          onChange={handleChange("subject")}
          error={fieldErrors.subject}
        />
        <Field
          id="contact-message"
          label="Message"
          as="textarea"
          value={form.message}
          onChange={handleChange("message")}
          error={fieldErrors.message}
        />

        {status === "error" && errorMessage && (
          <p role="alert" className="text-xs text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>
    </PanelShell>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
}

function Field({ id, label, value, onChange, error, type = "text", as = "input" }: FieldProps) {
  const inputClass =
    "w-full rounded border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary " +
    (error ? "border-red-400" : "border-surface");

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-secondary">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={4}
          className={`mt-1 ${inputClass}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`mt-1 ${inputClass}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
