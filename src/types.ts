export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  title?: string;
  metadata?: Record<string, any>;
}
