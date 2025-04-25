import React, { useState } from "react";
import { PuzzleBoard } from "./components/PuzzleBoard";
import { puzzles2, puzzles3 } from "./data/puzzles";
import type { Category } from "./types";

function App() {
  const [category, setCategory] = useState<Category>("Mate in 2");
  const [index, setIndex] = useState(0);

  const currentList = category === "Mate in 2" ? puzzles2 : puzzles3;
  const puzzle = currentList[index];

  const handleSolved = (elapsedSeconds: number) => {
    const minutes = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
    alert(`✅ Well done! You solved it in ${minutes}:${seconds} (mm:ss).`);

    if (index < currentList.length - 1) {
      setIndex(index + 1);
    } else {
      alert("Congratulations! You've completed all puzzles in this category!");
      setIndex(0);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category);
    setIndex(0);
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
      <h1>{category} Puzzles</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="category" style={{ marginRight: "0.5rem" }}>
          Choose category:
        </label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option>Mate in 2</option>
          <option>Mate in 3</option>
        </select>
      </div>

      <PuzzleBoard key={puzzle.id} puzzle={puzzle} onSolved={handleSolved} />
    </div>
  );
}

export default App;
