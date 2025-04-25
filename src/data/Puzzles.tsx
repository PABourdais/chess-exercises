import { Puzzle } from "../types";

export const puzzles2: Puzzle[] = [
  {
    id: "mate2-1",
    title: "Mate in 2",
    fen: "6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
    solution: ["f4", "g5"],
  },
  {
    id: "mate2-2",
    title: "Mate in 2",
    fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4",
    solution: ["Bb5", "O-O"],
  },
  {
    id: "mate2-3",
    title: "Mate in 2",
    fen: "r1bq1rk1/ppp2ppp/2np1n2/8/2B1P3/2N2N2/PPPQ1PPP/R1B2RK1 w - - 0 1",
    solution: ["Nd5", "Be6"],
  },
  {
    id: "mate2-4",
    title: "Mate in 2",
    fen: "r3r1k1/pp1b1ppp/2n1pn2/2q5/4P3/2N1BN2/PPPQ1PPP/R3R1K1 w - - 0 1",
    solution: ["Bxc5", "Qxc5+"],
  },
  {
    id: "mate2-5",
    title: "Mate in 2",
    fen: "2r3k1/5ppp/p1n5/1p1b1B2/3P4/2P5/P1PN1PPP/R2R2K1 w - - 0 1",
    solution: ["Re1", "Nxd4"],
  },
];

export const puzzles3: Puzzle[] = [
  {
    id: "mate3-1",
    title: "Mate in 3",
    fen: "3r2k1/5ppp/p7/1p6/1P6/P4Q2/1B3PPP/3R2K1 w - - 0 1",
    solution: ["Qg4", "f5", "Qxg7#"],
  },
  {
    id: "mate3-2",
    title: "Mate in 3",
    fen: "r4rk1/ppp1bppp/2n1pn2/3q4/1b1P4/2N2N2/PPPBQPPP/R3R1K1 w - - 0 1",
    solution: ["Nxd5", "Qxd5", "Bh6#"],
  },
  {
    id: "mate3-3",
    title: "Mate in 3",
    fen: "6k1/5ppp/8/8/8/3B4/5PPP/3Q2K1 w - - 0 1",
    solution: ["Bxh7+", "Kxh7", "Qd3+"],
  },
  {
    id: "mate3-4",
    title: "Mate in 3",
    fen: "r1bq1rk1/pp1n1ppp/2pbpn2/8/3P4/2N1PN2/PPQB1PPP/R3R1K1 w - - 0 1",
    solution: ["e4", "Nb6", "Bxh7#"],
  },
  {
    id: "mate3-5",
    title: "Mate in 3",
    fen: "3r2k1/5ppp/8/1B6/8/3Q4/5PPP/3R2K1 w - - 0 1",
    solution: ["Qc3", "Rc8", "Qxc8#"],
  },
];
