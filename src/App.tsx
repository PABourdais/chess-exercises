import React from "react";
import { PuzzleBoard } from "./components/PuzzleBoard";
import type { Puzzle } from "./types";

const demoPuzzle: Puzzle = {
  id: "1",
  fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3",
  solution: ["O-O", "Nf6", "Re1", "Be7"],
  title: "Simple Development Puzzle",
};

function App() {
  const handleSolved = () => alert("Well done! Puzzle solved.");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      <PuzzleBoard puzzle={demoPuzzle} onSolved={handleSolved} />
    </div>
  );
}

export default App;
