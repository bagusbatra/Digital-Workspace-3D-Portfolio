// PRD §25 — ambient + directional + point light (monitor glow biru).
// Lampu meja punya point light sendiri di dalam DeskLamp.tsx (nyala saat hover).
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={0.6} castShadow={false} />
      <pointLight position={[0, 1.4, -0.6]} intensity={0.8} color="#2158F5" distance={4} />
    </>
  );
}
