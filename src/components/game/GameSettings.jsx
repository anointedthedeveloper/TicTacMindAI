import { RotateCcw, SlidersHorizontal, Monitor, Users, Zap, Shield, Cpu, X, Circle } from "lucide-react";

const DIFFICULTIES = [
  { key: "easy", label: "Easy", icon: Zap },
  { key: "medium", label: "Medium", icon: Shield },
  { key: "hard", label: "Hard", icon: Cpu },
];

export default function GameSettings({
  onReset,
  onResetScores,
  playAs,
  onSetPlayAs,
  difficulty,
  onSetDifficulty,
  gameMode,
  onSetGameMode,
  showSettings,
  onToggleSettings,
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl btn-inactive font-semibold text-sm transition-all"
        >
          <RotateCcw size={14} /> Restart
        </button>
        <button
          onClick={onToggleSettings}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold text-sm transition-all ${showSettings ? "btn-active" : "btn-inactive"}`}
        >
          <SlidersHorizontal size={14} /> Settings
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="settings-panel px-4 py-3 flex flex-col gap-3">
          {/* Game Mode */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-widest text-center" style={{ color: "#8892a4" }}>GAME MODE</span>
            <div className="flex gap-2">
              {[
                { key: "ai", label: "vs AI", icon: Monitor },
                { key: "player", label: "vs Player", icon: Users },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => onSetGameMode(key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition-all ${gameMode === key ? "btn-active" : "btn-inactive"}`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          {gameMode === "ai" && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold tracking-widest text-center" style={{ color: "#8892a4" }}>DIFFICULTY</span>
              <div className="flex gap-2">
                {DIFFICULTIES.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => onSetDifficulty(key)}
                    className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-xs font-semibold transition-all ${difficulty === key ? "btn-active" : "btn-inactive"}`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Play As */}
          {gameMode === "ai" && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold tracking-widest text-center" style={{ color: "#8892a4" }}>PLAY AS</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onSetPlayAs("X")}
                  className={`flex-1 flex items-center justify-center py-2 rounded-xl font-black transition-all ${playAs === "X" ? "btn-active" : "btn-inactive"}`}
                >
                  <X size={20} strokeWidth={3} />
                </button>
                <button
                  onClick={() => onSetPlayAs("O")}
                  className={`flex-1 flex items-center justify-center py-2 rounded-xl font-black transition-all ${playAs === "O" ? "btn-active" : "btn-inactive"}`}
                >
                  <Circle size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          )}

          {/* Reset Scores */}
          <button
            onClick={onResetScores}
            className="text-xs font-medium text-center transition-colors pt-0.5"
            style={{ color: "#8892a4" }}
            onMouseEnter={(e) => (e.target.style.color = "#c0cad8")}
            onMouseLeave={(e) => (e.target.style.color = "#8892a4")}
          >
            Reset Scores
          </button>
        </div>
      )}
    </div>
  );
}
