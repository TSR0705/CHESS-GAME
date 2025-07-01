const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "CHESS GAME" });
});

io.on("connection", (uniquesocket) => {
  console.log("Player connected:", uniquesocket.id);

  // Assign role
  if (!players.white) {
    players.white = uniquesocket.id;
    uniquesocket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = uniquesocket.id;
    uniquesocket.emit("playerRole", "b");
  } else {
    uniquesocket.emit("spectatorRole");
  }

  // Sync current position immediately
  io.to(uniquesocket.id).emit("boardState", chess.fen());

  uniquesocket.on("move", (move) => {
    // Turn validation
    if (
      (chess.turn() === "w" && uniquesocket.id !== players.white) ||
      (chess.turn() === "b" && uniquesocket.id !== players.black)
    ) {
      return;
    }

    // Attempt the move, catch invalid ones
    let result;
    try {
      result = chess.move(move);
    } catch (err) {
      // Invalid move format or illegal move
      uniquesocket.emit("invalidMove", move);
      return;
    }

    if (result) {
      // Broadcast updated position
      io.emit("boardState", chess.fen());
    } else {
      // Move was legal in format but not allowed (should be rare)
      uniquesocket.emit("invalidMove", move);
    }
  });

  uniquesocket.on("disconnect", () => {
    console.log("Player disconnected:", uniquesocket.id);
    if (uniquesocket.id === players.white) delete players.white;
    if (uniquesocket.id === players.black) delete players.black;
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
