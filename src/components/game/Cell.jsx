import { X, Circle } from "lucide-react";

export default function Cell({ value, index, onClick, isWinning, disabled }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "100%" }}>
      <button
        onClick={() => onClick(index)}
        disabled={disabled || !!value}
        className={[
          "cell-base absolute inset-0 flex items-center justify-center w-full h-full",
          isWinning ? "cell-winning" : "",
          !value && !disabled ? "cursor-pointer" : "cursor-default",
        ].join(" ")}
      >
        {value === "X" && (
          <X
            className="w-[40%] h-[40%]"
            strokeWidth={3}
            style={{ color: "#a855f7", filter: "drop-shadow(0 0 6px #a855f7) drop-shadow(0 0 14px #a855f7)" }}
          />
        )}
        {value === "O" && (
          <Circle
            className="w-[36%] h-[36%]"
            strokeWidth={3}
            style={{ color: "#22d3ee", filter: "drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 14px #22d3ee)" }}
          />
        )}
      </button>
    </div>
  );
}
