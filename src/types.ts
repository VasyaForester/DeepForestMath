export type Phase = "school" | "university";

export type Problem =
  | {
      id: string;
      type: "choice";
      prompt: string;
      options: string[];
      answerIndex: number;
      explanation: string;
      /** Подсказки по возрастанию силы; полный разбор — в explanation. */
      hints?: string[];
    }
  | {
      id: string;
      type: "open";
      prompt: string;
      accepted: string[];
      explanation: string;
      hints?: string[];
    };

export interface WorkedExample {
  title: string;
  problem: string;
  solution: string;
}

export interface Source {
  title: string;
  authors: string;
  note?: string;
}

export interface Lesson {
  id: string;
  title: string;
  courseId: string;
  /** Зачем эта тема нужна дальше по программе. */
  purpose?: string;
  /** Что в определение не входит, или типичное ложное обобщение. */
  nonexample?: {
    title: string;
    text: string;
  };
  theory: string;
  examples: WorkedExample[];
  sample: Problem & { solution: string };
  problems: Problem[];
  sources: Source[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  phase: Phase;
  order: number;
  description: string;
  /** Courses that must be fully completed first (in addition to school, for university). */
  requires: string[];
}

export interface LessonRecord {
  grade: number;
  correct: number;
  total: number;
  submittedAt: string;
}

export interface AppState {
  login: string;
  name: string;
  records: Record<string, LessonRecord>;
}
