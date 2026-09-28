// Klien API kecil untuk satu-satunya endpoint di project ini.
// Bentuk request/response HARUS persis mengikuti docs/api-contract.md (LOCKED) —
// jangan mengubah shape ini berdasarkan asumsi frontend (lihat 02-FRONTEND.md §5).

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrorCode =
  | "VALIDATION_ERROR"
  | "METHOD_NOT_ALLOWED"
  | "RATE_LIMITED"
  | "SEND_FAILED"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR";

export type ContactApiResult =
  | { success: true }
  | { success: false; error: ContactErrorCode; details?: Record<string, string> };

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactApiResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as ContactApiResult;
    return data;
  } catch {
    // Kegagalan network (bukan response dari server) — bentuk tetap konsisten
    // dengan ContactApiResult agar UI tidak perlu menangani dua bentuk error.
    return { success: false, error: "NETWORK_ERROR" };
  }
}
