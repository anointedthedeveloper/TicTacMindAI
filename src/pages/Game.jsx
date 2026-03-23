import { useState, useEffect, useCallback } from "react";
import Board from "@/components/game/Board";
import StatusBar from "@/components/game/StatusBar";
import ScoreBoard from "@/components/game/ScoreBoard";
import GameSettings from "@/components/game/GameSettings";
import { checkWinner, isBoardFull, getBestMove } from "@/lib/gameEngine";

const emptyBoard = () => Array(9).fill(null);
const emptyScores = () => ({ human: 0, ai: 0, draw: 0, playerX: 0, playerO: 0 });

export default function Game() {
  const [board, setBoard] = useState(emptyBoard());
  const [isHumanTurn, setIsHumanTurn] = useState(true);
  const [winResult, setWinResult] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState(emptyScores());
  const [playAs, setPlayAs] = useState("X");
  const [difficulty, setDifficulty] = useState("hard");
  const [showSettings, setShowSettings] = useState(false);
  const [gameMode, setGameMode] = useState("ai");
  const [currentTurn, setCurrentTurn] = useState("X");

  const humanMark = playAs;
  const aiMark = playAs === "X" ? "O" : "X";
  const humanGoesFirst = playAs === "X";

  const getStatus = () => {
    if (winResult) {
      if (gameMode === "player") return `Player ${winResult.winner} wins!`;
      return winResult.winner === humanMark ? "You win!" : "AI wins!";
    }
    if (isDraw) return "It's a draw!";
    if (gameMode === "player") return `Player ${currentTurn}'s turn`;
    return isHumanTurn ? "Your turn" : "AI is thinking…";
  };

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] || winResult || isDraw) return;

      if (gameMode === "player") {
        const newBoard = [...board];
        newBoard[index] = currentTurn;
        const result = checkWinner(newBoard);
        if (result) {
          setBoard(newBoard);
          setWinResult(result);
          setScores((s) => ({
            ...s,
            [result.winner === "X" ? "playerX" : "playerO"]:
              s[result.winner === "X" ? "playerX" : "playerO"] + 1,
          }));
          return;
        }
        if (isBoardFull(newBoard)) {
          setBoard(newBoard);
          setIsDraw(true);
          setScores((s) => ({ ...s, draw: s.draw + 1 }));
          return;
        }
        setBoard(newBoard);
        setCurrentTurn((t) => (t === "X" ? "O" : "X"));
        return;
      }

      // vs AI
      if (!isHumanTurn) return;
      const newBoard = [...board];
      newBoard[index] = humanMark;
      const result = checkWinner(newBoard);
      if (result) {
        setBoard(newBoard);
        setWinResult(result);
        setScores((s) => ({ ...s, human: s.human + 1 }));
        return;
      }
      if (isBoardFull(newBoard)) {
        setBoard(newBoard);
        setIsDraw(true);
        setScores((s) => ({ ...s, draw: s.draw + 1 }));
        return;
      }
      setBoard(newBoard);
      setIsHumanTurn(false);
    },
    [board, isHumanTurn, winResult, isDraw, humanMark, gameMode, currentTurn]
  );

  // AI move
  useEffect(() => {
    if (gameMode !== "ai" || isHumanTurn || winResult || isDraw) return;
    const timer = setTimeout(() => {
      const newBoard = [...board];
      const move = getBestMove(newBoard, difficulty, aiMark, humanMark);
      if (move === -1) return;
      newBoard[move] = aiMark;
      const result = checkWinner(newBoard);
      if (result) {
        setBoard(newBoard);
        setWinResult(result);
        setScores((s) => ({ ...s, ai: s.ai + 1 }));
        return;
      }
      if (isBoardFull(newBoard)) {
        setBoard(newBoard);
        setIsDraw(true);
        setScores((s) => ({ ...s, draw: s.draw + 1 }));
        return;
      }
      setBoard(newBoard);
      setIsHumanTurn(true);
    }, 450);
    return () => clearTimeout(timer);
  }, [isHumanTurn, board, winResult, isDraw, aiMark, humanMark, difficulty, gameMode]);

  const resetGame = useCallback(() => {
    setBoard(emptyBoard());
    setWinResult(null);
    setIsDraw(false);
    setIsHumanTurn(humanGoesFirst);
    setCurrentTurn("X");
  }, [humanGoesFirst]);

  const handleSetPlayAs = useCallback((sym) => {
    setPlayAs(sym);
    setBoard(emptyBoard());
    setWinResult(null);
    setIsDraw(false);
    setIsHumanTurn(sym === "X");
    setCurrentTurn("X");
  }, []);

  const handleSetDifficulty = useCallback((d) => {
    setDifficulty(d);
    setBoard(emptyBoard());
    setWinResult(null);
    setIsDraw(false);
    setIsHumanTurn(humanGoesFirst);
    setCurrentTurn("X");
  }, [humanGoesFirst]);

  const handleSetGameMode = useCallback((mode) => {
    setGameMode(mode);
    setBoard(emptyBoard());
    setWinResult(null);
    setIsDraw(false);
    setIsHumanTurn(true);
    setCurrentTurn("X");
  }, []);

  const isBoardDisabled =
    !!winResult ||
    isDraw ||
    (gameMode === "ai" && !isHumanTurn);

  return (
    <div
      className="flex flex-col items-center justify-between px-4 py-3 w-full"
      style={{ background: "#0d1117", minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-0.5 pt-1">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          <span style={{ color: "#a855f7", textShadow: "0 0 12px #a855f7" }}>Tic</span>
          <span style={{ color: "#ffffff" }}>Tac</span>
          <span style={{ color: "#22d3ee", textShadow: "0 0 12px #22d3ee" }}>Mind</span>
          <span style={{ color: "#8892a4", fontSize: "1.2rem", fontWeight: 600 }}> AI</span>
        </h1>
        <p style={{ color: "#8892a4", fontSize: "0.72rem" }}>Powered by Minimax Algorithm</p>
      </div>

      {/* Middle content */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm mx-auto flex-1 justify-center">
        <ScoreBoard scores={scores} gameMode={gameMode} />
        <StatusBar status={getStatus()} />

        {/* Board — constrained so it never overflows */}
        <div className="w-full" style={{ maxWidth: "min(320px, 80vw, 55vh)" }}>
          <Board
            board={board}
            winningLine={winResult?.line}
            onCellClick={handleCellClick}
            disabled={isBoardDisabled}
          />
        </div>

        <GameSettings
          onReset={resetGame}
          onResetScores={() => setScores(emptyScores())}
          playAs={playAs}
          onSetPlayAs={handleSetPlayAs}
          difficulty={difficulty}
          onSetDifficulty={handleSetDifficulty}
          gameMode={gameMode}
          onSetGameMode={handleSetGameMode}
          showSettings={showSettings}
          onToggleSettings={() => setShowSettings((s) => !s)}
        />
      </div>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-0.5 pb-1">
        <p style={{ color: "#4a5568", fontSize: "0.7rem" }}>
          Decision-making AI · Recursion · Game Theory
        </p>
        <p style={{ color: "#4a5568", fontSize: "0.7rem" }}>
          Developed by{" "}
          <a
            href="https://github.com/anointedthedeveloper"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#22d3ee", textDecoration: "underline" }}
          >
            anointedthedeveloper
          </a>
        </p>
      </footer>
    </div>
  );
}
