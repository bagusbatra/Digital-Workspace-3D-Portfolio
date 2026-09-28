import { useEffect } from "react";

// PRD §30 — SEO tetap harus lewat HTML biasa (document.title), meski tanpa SSR.
// Dependency tunggal (bukan react-helmet) karena kebutuhannya sesederhana ini (§29).
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Bagus Batra`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
