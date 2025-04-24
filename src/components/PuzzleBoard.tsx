import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import type { Puzzle } from "../types";

interface Props {
  puzzle: Puzzle;
  onSolved: (elapsedSeconds: number) => void;
}

export function PuzzleBoard({ puzzle, onSolved }: Props) {
  const [game] = useState(() => new Chess(puzzle.fen));
  const [moveIndex, setMoveIndex] = useState(0);
  const [position, setPosition] = useState(puzzle.fen);
  const [isSolved, setIsSolved] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number>();

  const startTimer = useCallback(() => {
    window.clearInterval(timerRef.current);
    setSeconds(0);
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => void window.clearInterval(timerRef.current);
  }, [startTimer]);

  const handleSolved = useCallback(() => {
    console.log("Puzzle solved!");
    setIsSolved(true);
    window.clearInterval(timerRef.current);
    onSolved(seconds);
  }, [onSolved, seconds]);

  const onDrop = (from: string, to: string) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return false;

    if (move.san === puzzle.solution[moveIndex]) {
      setMoveIndex((i) => i + 1);
      setPosition(game.fen());

      if (moveIndex + 1 === puzzle.solution.length) {
        handleSolved();
      }
      return true;
    }

    resetPuzzle();
    return false;
  };

  const resetPuzzle = useCallback(() => {
    game.load(puzzle.fen);
    setPosition(puzzle.fen);
    setMoveIndex(0);
    console.log("isSolved? ", isSolved);
    if (isSolved) {
      resetTimer();
      setIsSolved(false);
    }
  }, [game, puzzle.fen]);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, []);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{puzzle.title || "Chess Puzzle"}</h2>
      <div style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>
        ⏱ {minutes}:{secs}
      </div>
      <Chessboard
        position={position}
        onPieceDrop={(from, to) => onDrop(from, to)}
        boardWidth={480}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "480px",
          margin: "1rem auto 0",
        }}
      >
        <p style={{ margin: 0 }}>
          Move {moveIndex + 1} of {puzzle.solution.length}
        </p>
        <button onClick={resetPuzzle} style={{ padding: "0.5rem 1rem" }}>
          🔄 Restart Puzzle
        </button>
      </div>
    </div>
  );
}
