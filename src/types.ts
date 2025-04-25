export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  title?: string;
  metadata?: Record<string, any>;
}

export type Category = "Mate in 2" | "Mate in 3";
