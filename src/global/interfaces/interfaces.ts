export interface Question {
  [questionIdx: string]: {
    topic: string;
    answers: {
      [key: string]: string;
    };
    correctAnswers: string;
  };
}

export interface PreviewExam {
  id: string;
  title: string;
  examContentPath: string;
  commentTotal: string;
  practiceTotal: string;
}

interface Comment {
  userName: string;
  createdAt: {
    seconds: string;
    nanosecond: string;
  };
  content: string;
}

export interface Exam {
  generalInfo: any;
  exam: any;
  history?: any;
  commentTotal: string;
  practiceTotal: string;
  comments: Comment[];
}

export type PartKey =
  | "part1"
  | "part2"
  | "part3"
  | "part4"
  | "part5"
  | "part6"
  | "part7"
  | "All";

export interface UserAnswers {
  [part: string]: {
    [questionNumber: string]: string;
  };
}
