export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: number;
}

export function createFlashcard(question: string, answer: string): Flashcard {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    question: question.trim(),
    answer: answer.trim(),
    createdAt: Date.now(),
  };
}

export function isValidFlashcard(card: Partial<Flashcard>): boolean {
  return Boolean(card.question?.trim() && card.answer?.trim());
}