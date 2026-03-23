export default function ScoreBoard({ scores, gameMode }) {
  const cols =
    gameMode === "player"
      ? [
          { label: "PLAYER X", key: "playerX", color: "#a855f7", glow: "#a855f7" },
          { label: "DRAW", key: "draw", color: "#8892a4", glow: null },
          { label: "PLAYER O", key: "playerO", color: "#22d3ee", glow: "#22d3ee" },
        ]
      : [
          { label: "YOU", key: "human", color: "#a855f7", glow: "#a855f7" },
          { label: "DRAW", key: "draw", color: "#8892a4", glow: null },
          { label: "AI", key: "ai", color: "#22d3ee", glow: "#22d3ee" },
        ];

  return (
    <div className="flex justify-center gap-4 w-full max-w-sm mx-auto">
      {cols.map(({ label, key, color, glow }) => (
        <div key={key} className="score-box flex flex-col items-center gap-1 flex-1">
          <span className="text-xs font-semibold tracking-widest" style={{ color: "#8892a4" }}>
            {label}
          </span>
          <span
            className="text-3xl font-black"
            style={{ color, textShadow: glow ? `0 0 10px ${glow}, 0 0 20px ${glow}` : "none" }}
          >
            {scores[key]}
          </span>
        </div>
      ))}
    </div>
  );
}
