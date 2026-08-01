import type { CourseSlug, QuestionnaireAnswers, User } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar os usuários do backend.");
  }

  const data = await response.json();
  return (data.users as User[]).map((user) => ({
    ...user,
    createdAt: user.createdAt || new Date().toISOString(),
  }));
}

export async function submitQuestionnaire(payload: {
  name: string;
  currentCourse: CourseSlug;
  answers: QuestionnaireAnswers;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o questionário ao backend.");
  }

  const data = await response.json();
  return {
    ...(data.user as User),
    createdAt: (data.user as User).createdAt || new Date().toISOString(),
  };
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  currentCourse?: CourseSlug;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Não foi possível criar a conta.");
  }

  return data.user as User;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Não foi possível entrar.");
  }

  return data.user as User;
}
