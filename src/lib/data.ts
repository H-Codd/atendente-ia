import type { User } from "@/types/user";

export const users: User[] = [
  {
    id: "1",
    name: "Ana Beatriz",
    informedCourse: "Medicina",
    suggestedCourse: "Medicina",
    answers: {
      biology: "yes",
      math: "yes",
      helping: "yes",
      tech: "no",
    },
    createdAt: "2026-07-15T09:30:00.000Z",
  },
  {
    id: "2",
    name: "Bruno Silva",
    informedCourse: "Engenharia",
    suggestedCourse: "Engenharia",
    answers: {
      biology: "no",
      math: "yes",
      helping: "no",
      tech: "yes",
    },
    createdAt: "2026-07-18T15:45:00.000Z",
  },
  {
    id: "3",
    name: "Carla Mendes",
    informedCourse: "ADS",
    suggestedCourse: "ADS",
    answers: {
      biology: "no",
      math: "yes",
      helping: "yes",
      tech: "yes",
    },
    createdAt: "2026-07-20T11:10:00.000Z",
  },
  {
    id: "4",
    name: "Daniela Rocha",
    informedCourse: "Enfermagem",
    suggestedCourse: "Enfermagem",
    answers: {
      biology: "yes",
      math: "no",
      helping: "yes",
      tech: "no",
    },
    createdAt: "2026-07-22T17:20:00.000Z",
  },
];
