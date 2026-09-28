// Objek non-interaktif — hanya permukaan meja tempat objek lain diletakkan.
export default function Desk() {
  return (
    <mesh position={[0, 0.4, 0]} receiveShadow>
      <boxGeometry args={[3.4, 0.08, 1.6]} />
      <meshStandardMaterial color="#252B33" />
    </mesh>
  );
}
