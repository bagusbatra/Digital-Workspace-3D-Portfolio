import { describe, expect, it } from "vitest";
import { validateContactForm } from "./validateContactForm";

const VALID_PAYLOAD = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello",
  message: "This is a valid message body.",
};

describe("validateContactForm", () => {
  it("returns no errors for a fully valid payload", () => {
    expect(validateContactForm(VALID_PAYLOAD)).toEqual({});
  });

  it("rejects a name shorter than 2 characters", () => {
    const errors = validateContactForm({ ...VALID_PAYLOAD, name: "A" });
    expect(errors.name).toBeDefined();
  });

  it("rejects an invalid email format", () => {
    const errors = validateContactForm({ ...VALID_PAYLOAD, email: "not-an-email" });
    expect(errors.email).toBeDefined();
  });

  it("rejects a subject shorter than 2 characters", () => {
    const errors = validateContactForm({ ...VALID_PAYLOAD, subject: "A" });
    expect(errors.subject).toBeDefined();
  });

  it("rejects a message shorter than 10 characters", () => {
    const errors = validateContactForm({ ...VALID_PAYLOAD, message: "short" });
    expect(errors.message).toBeDefined();
  });

  it("rejects a message longer than 2000 characters", () => {
    const errors = validateContactForm({
      ...VALID_PAYLOAD,
      message: "a".repeat(2001),
    });
    expect(errors.message).toBeDefined();
  });
});
