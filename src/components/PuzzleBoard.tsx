import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import type { Puzzle } from "../types";

interface Props {
  puzzle: Puzzle;
  onSolved: () => void;
}

export function PuzzleBoard({ puzzle, onSolved }: Props) {
  const [game] = useState(() => new Chess(puzzle.fen));
  const [moveIndex, setMoveIndex] = useState(0);
  const [position, setPosition] = useState(puzzle.fen);

  const onDrop = (source: string, target: string) => {
    const san = game.move({ from: source, to: target, promotion: "q" })?.san;
    if (!san) return false; // illegal move
    if (san === puzzle.solution[moveIndex]) {
      setMoveIndex(moveIndex + 1);
      setPosition(game.fen());
      if (moveIndex + 1 === puzzle.solution.length) {
        onSolved();
      }
      return true;
    } else {
      // reset on mistake
      game.load(puzzle.fen);
      setPosition(puzzle.fen);
      setMoveIndex(0);
      return false;
    }
  };

  return (
    <div>
      <h2>{puzzle.title || "Chess Puzzle"}</h2>
      <Chessboard
        position={position}
        onPieceDrop={(from, to) => onDrop(from, to)}
        boardWidth={480}
      />
      <p>
        Move {moveIndex + 1} of {puzzle.solution.length}
      </p>
    </div>
  );
}
