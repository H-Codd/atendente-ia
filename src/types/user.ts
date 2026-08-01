export type AnswerValue = "yes" | "no";
export type CourseSlug = "Medicina" | "Engenharia" | "ADS" | "Enfermagem";

export type QuestionnaireAnswers = {
  biology: AnswerValue;
  math: AnswerValue;
  helping: AnswerValue;
  tech: AnswerValue;
};

export type User = {
  id: string;
  name: string;
  informedCourse: CourseSlug;
  suggestedCourse: CourseSlug;
  answers: QuestionnaireAnswers;
  createdAt: string;
  email?: string;
  role?: "admin" | "user";
};
