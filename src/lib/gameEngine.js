export const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

function score(board, depth, aiMark, humanMark) {
  const result = checkWinner(board);
  if (result?.winner === aiMark) return 10 - depth;
  if (result?.winner === humanMark) return depth - 10;
  return 0;
}

function minimax(board, depth, isMaximizing, aiMark, humanMark) {
  const s = score(board, depth, aiMark, humanMark);
  if (s !== 0 || isBoardFull(board)) return s;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = aiMark;
        best = Math.max(best, minimax(board, depth + 1, false, aiMark, humanMark));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = humanMark;
        best = Math.min(best, minimax(board, depth + 1, true, aiMark, humanMark));
        board[i] = null;
      }
    }
    return best;
  }
}

function getRandomMove(board) {
  const empty = board.map((v, i) => (!v ? i : null)).filter((v) => v !== null);
  return empty[Math.floor(Math.random() * empty.length)] ?? -1;
}

export function getBestMove(board, difficulty = "hard", aiMark = "O", humanMark = "X") {
  if (difficulty === "easy") return getRandomMove(board);

  if (difficulty === "medium") {
    // 30% random, 70% optimal — feels beatable but not trivial
    if (Math.random() < 0.3) return getRandomMove(board);
  }

  let bestVal = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = aiMark;
      const moveVal = minimax(board, 0, false, aiMark, humanMark);
      board[i] = null;
      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }
  return bestMove;
}
