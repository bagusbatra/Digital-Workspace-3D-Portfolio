import type { ContactFormPayload } from "./api";

// Validasi client HARUS sama persis dengan rule di docs/api-contract.md (LOCKED),
// karena server melakukan validasi ulang yang identik — frontend validation di sini
// hanya untuk feedback cepat, BUKAN security boundary (REQ-047).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormErrors = Partial<Record<keyof ContactFormPayload, string>>;

export function validateContactForm(payload: ContactFormPayload): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (payload.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!EMAIL_REGEX.test(payload.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (payload.subject.trim().length < 2) {
    errors.subject = "Subject must be at least 2 characters.";
  }
  if (payload.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (payload.message.length > 2000) {
    errors.message = "Message must be at most 2000 characters.";
  }

  return errors;
}
