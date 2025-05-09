import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard, CustomSquareStyles } from "react-chessboard";
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
  const [showHintSAN, setShowHintSAN] = useState(false);
  const [highlightSquares, setHighlightSquares] = useState<CustomSquareStyles>(
    {}
  );

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
    setShowHintSAN(false);
    setIsSolved(true);
    window.clearInterval(timerRef.current);
    onSolved(seconds);
  }, [onSolved, seconds]);

  const giveHint = () => {
    setShowHintSAN(true);
    const san = puzzle.solution[moveIndex];
    const tempGame = new Chess(position);
    const verboseMoves = tempGame.moves({ verbose: true });
    const moveObj = verboseMoves.find((m) => m.san === san);
    if (moveObj) {
      setHighlightSquares({
        [moveObj.from]: { background: "rgba(255, 255, 0, 0.6)" },
        [moveObj.to]: { background: "rgba(255, 255, 0, 0.6)" },
      });
      setTimeout(() => {
        setHighlightSquares({});
      }, 2000);
    }
  };

  const onDrop = (from: string, to: string) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return false;
    setShowHintSAN(false);
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
    setShowHintSAN(false);
    game.load(puzzle.fen);
    setPosition(puzzle.fen);
    setMoveIndex(0);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "480px",
          marginInline: "auto",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>{puzzle.title || "Chess Puzzle"}</h2>
        <div style={{ fontSize: "1.25rem" }}>
          ⏱ {minutes}:{secs}
        </div>
      </div>
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        customSquareStyles={highlightSquares}
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
        <button
          onClick={giveHint}
          disabled={showHintSAN}
          style={{ marginRight: "1rem" }}
        >
          💡 Hint
        </button>
        <button onClick={resetPuzzle} style={{ padding: "0.5rem 1rem" }}>
          🔄 Restart Puzzle
        </button>
      </div>
    </div>
  );
}
