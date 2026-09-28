import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// Placeholder — menunggu asset resume (PDF) tersedia dari user.
export default function ResumePage() {
  useDocumentTitle("Resume");
  return (
    <section className="flex h-full flex-col items-center justify-center gap-3 bg-background text-text">
      <h1 className="text-xl font-semibold">Resume</h1>
      <p className="font-mono text-sm text-secondary">
        [ Resume PDF belum tersedia — akan ditambahkan sebagai file statis ]
      </p>
    </section>
  );
}
