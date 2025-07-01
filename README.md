# ♔ Real-Time Multiplayer Chess Game

A fully functional, real-time multiplayer chess game built with **Node.js**, **Express**, **Socket.IO**, and **chess.js**. This project features clean drag-and-drop piece movement, automatic board orientation for Black, robust move validation, and spectator support—all within a lightweight, responsive interface.


<div align="center">

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)](https://nodejs.org/)
  [![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-blue)](https://socket.io/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  [![Contributors](https://img.shields.io/github/contributors/TSR0705/CHESS-GAME)](https://github.com/TSR0705/CHESS-GAME/graphs/contributors)

</div>

---

## ⚡ Quick Start (TL;DR)

```bash
git clone https://github.com/TSR0705/CHESS-GAME.git
cd CHESS-GAME
npm install
npx nodemon
```

Visit [http://localhost:3000](http://localhost:3000) in two browser tabs to play.

---

## 🏗️ Project Architecture

**Simple Real-Time Client-Server Flow:**

```
Browser (Player 1)   <--Socket.IO-->   Server (Express + Chess.js)   <--Socket.IO-->   Browser (Player 2)
```

- Server maintains authoritative game state.
- Client sends move requests.
- Server validates, updates state, broadcasts FEN.

*Note: Adding a visual diagram (Coming Soon) enhances clarity for new contributors.*

---

## 🚀 Features

✅ Real-time multiplayer gameplay with WebSocket communication  
✅ Automatic role assignment: White, Black, or Spectator  
✅ Smooth drag-and-drop interaction using native browser APIs  
✅ Server-side move validation powered by [chess.js](https://github.com/jhlywa/chess.js)  
✅ Automatic board flipping for Black players  
✅ Fully responsive design with clean, modern styling  
✅ Lightweight architecture: no heavy frameworks on the frontend  


---

## 🛠 Tech Stack

| Layer         | Technology                                |
|---------------|-------------------------------------------|
| **Backend**   | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Socket.IO](https://socket.io/) |
| **Game Logic**| [chess.js](https://github.com/jhlywa/chess.js) |
| **Frontend**  | HTML, Vanilla JS, CSS, [EJS](https://ejs.co/) |
| **WebSockets**| [Socket.IO](https://socket.io/) |
| **Styling**   | Utility-first custom CSS |

---

## 🧩 Project Structure

```bash
.
├── app.js               # Express server & Socket.IO logic
├── package.json
├── public/              # Static frontend files
│   ├── css/
│   │   └── style.css    # Chessboard & piece styling
│   ├── js/
│   │   └── chessGame.js # Client-side game logic
├── views/
│   └── index.ejs        # Game interface (renders chessboard)
```

---

## 🧠 How It Works — Technical Overview



## 🔒 Security Considerations

- Move validation occurs exclusively on the server.  
- Clients cannot bypass turn order or perform illegal moves.  
- Simple but effective protection against basic client-side tampering.  

---

## 🧰 Development Notes

- Hot reloading with [nodemon](https://www.npmjs.com/package/nodemon).  
- CSS & JS kept modular for easy enhancement.  
- Potential future refactor:  
  - Board as reusable component  
  - WebSocket room support for multiple games  
  - Game history tracking  

---

## 🚀 Future Improvements

- Move history sidebar  
- Timer for timed games  
- Chat integration  
- Restart & rematch options  
- Mobile responsiveness optimization  

---

## 📸 Screenshots

*Coming soon...*

---

## 🤝 Contribution

Contributions welcome! Please open Issues or PRs to suggest improvements.  

---

## 📖 License & Credits

MIT License.  

**Credits:**  
- [chess.js](https://github.com/jhlywa/chess.js) — Game logic  
- [Socket.IO](https://socket.io/) — Real-time communication  
- [EJS](https://ejs.co/) — Templating engine  
- [MDN Web Docs](https://developer.mozilla.org/) — Reference for browser APIs  

---
## 👤 About the Creator

<div align="center">
  <img src="https://avatars.githubusercontent.com/TSR0705" alt="Tanmay Singh" width="100" style="border-radius:50%;" />
  <h3>Tanmay Singh</h3>
<p>
  <em>Rising Full-Stack Innovator Shaping Next-Gen Web Experiences</em><br/>
  Cloud-First Mindset | UI/UX-Driven | JavaScript at the Core
</p>


  <p>
    📫 <a href="mailto:tanmaysingh8246@gmail.com">tanmaysingh8246@gmail.com</a><br/>
    🔗 <a href="https://github.com/TSR0705">github.com/TSR0705</a><br/>
    🔗 <a href="https://www.linkedin.com/in/tanmay-singh-28395b345/">linkedin.com/in/tanmay-singh-28395b345/</a>
