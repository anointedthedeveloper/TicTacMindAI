import Cell from "./Cell";

export default function Board({ board, winningLine, onCellClick, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      {board.map((value, i) => (
        <Cell
          key={i}
          value={value}
          index={i}
          onClick={onCellClick}
          isWinning={winningLine?.includes(i)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
