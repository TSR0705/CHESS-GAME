const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

// Render the board from the chess.js instance
const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";

  board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      const squareEl = document.createElement("div");
      squareEl.classList.add(
        "square",
        (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
      );
      squareEl.dataset.row = rowIndex;
      squareEl.dataset.col = colIndex;

      if (square) {
        const pieceEl = document.createElement("div");
        pieceEl.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );
        pieceEl.innerText = getPieceUnicode(square);
        const isMyTurnPawn = playerRole === square.color && playerRole === chess.turn();
        pieceEl.draggable = !!isMyTurnPawn;
        if (isMyTurnPawn) pieceEl.classList.add("draggable");

        pieceEl.addEventListener("dragstart", () => {
          if (pieceEl.draggable) {
            draggedPiece = pieceEl;
            sourceSquare = { row: rowIndex, col: colIndex };
            pieceEl.classList.add("dragging");
          }
        });
        pieceEl.addEventListener("dragend", () => {
          draggedPiece = null;
          sourceSquare = null;
          pieceEl.classList.remove("dragging");
        });

        squareEl.appendChild(pieceEl);
      }

      squareEl.addEventListener("dragover", (e) => e.preventDefault());
      squareEl.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece && sourceSquare) {
          const target = {
            row: +squareEl.dataset.row,
            col: +squareEl.dataset.col,
          };
          const move = {
            from: String.fromCharCode(97 + sourceSquare.col) + (8 - sourceSquare.row),
            to: String.fromCharCode(97 + target.col) + (8 - target.row),
            promotion: "q",
          };
          socket.emit("move", move);
        }
      });

      boardElement.appendChild(squareEl);
    });
  });

  // Flip board if you're black
  boardElement.classList.toggle("flipped", playerRole === "b");
};

const getPieceUnicode = (piece) => {
  const map = {
  p: "♟", r: "♜", n: "♞", b: "♝",
  q: "♛", k: "♚", P: "♙", R: "♖",
  N: "♘", B: "♗", Q: "♕", K: "♔",
};

  return map[piece.type] || "?";
};

// Socket listeners
socket.on("playerRole", (role) => {
  playerRole = role;
  renderBoard();
});
socket.on("spectatorRole", () => {
  playerRole = null;
  renderBoard();
});
socket.on("boardState", (fen) => {
  chess.load(fen);
  renderBoard();
});

// Initial render (empty board until first boardState arrives)
renderBoard();


