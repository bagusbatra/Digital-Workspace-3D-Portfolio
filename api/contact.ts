// Tipe minimal Vercel Node Function (hindari dependency @vercel/node di Iterasi 01 —
// bisa diganti dengan tipe resmi paket tersebut begitu terpasang dengan bersih).
interface VercelRequest {
  method?: string;
  body?: unknown;
}
interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): void;
}

// ITERASI 01 — foundation saja. Belum ada validasi/kirim email (lihat Iterasi 02 & 04
// di 03-BACKEND.md). Response di bawah adalah dummy placeholder yang akan diganti saat
// docs/api-contract.md sudah LOCKED.
export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ success: false, error: "METHOD_NOT_ALLOWED" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    // Jangan bocorkan stack trace/internal detail ke client.
    res.status(500).json({ success: false, error: "INTERNAL_ERROR" });
  }
}
