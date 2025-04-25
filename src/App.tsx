import React, { useState } from "react";
import { PuzzleBoard } from "./components/PuzzleBoard";
import { checkmatePuzzles } from "./data/puzzles";

function App() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const handleSolved = (elapsedSeconds: number) => {
    const minutes = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
    alert(`✅ Well done! You solved it in ${minutes}:${seconds} (mm:ss).`);

    if (currentPuzzleIndex < checkmatePuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      alert("Congratulations! You've completed all puzzles!");
      setCurrentPuzzleIndex(0);
    }
  };
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
      <h1>Checkmate in 2 Moves Puzzles</h1>
      <p>
        Puzzle {currentPuzzleIndex + 1} of {checkmatePuzzles.length}
      </p>
      <PuzzleBoard
        key={checkmatePuzzles[currentPuzzleIndex].id}
        puzzle={checkmatePuzzles[currentPuzzleIndex]}
        onSolved={handleSolved}
      />
    </div>
  );
}

export default App;
