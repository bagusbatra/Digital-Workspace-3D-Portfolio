import { useParams } from "react-router-dom";

// Placeholder — menunggu Data Contract LOCKED (lihat docs/database-contract.md, Iterasi 04).
export default function ProjectDetailPage() {
  const { id } = useParams();
  return (
    <section className="flex h-full items-center justify-center bg-background text-text">
      <p className="font-mono text-sm text-secondary">
        [ PROJECT DETAIL "{id}" — WAITING FOR DATA CONTRACT ]
      </p>
    </section>
  );
}
