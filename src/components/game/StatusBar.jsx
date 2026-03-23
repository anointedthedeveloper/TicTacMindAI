export default function StatusBar({ status }) {
  return (
    <div
      className="text-center text-lg font-bold"
      style={{ color: "#22d3ee", textShadow: "0 0 10px #22d3ee, 0 0 20px #22d3ee" }}
    >
      {status}
    </div>
  );
}
