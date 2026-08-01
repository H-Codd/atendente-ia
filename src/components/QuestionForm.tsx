"use client";

import { useState, type FormEvent } from "react";
import type { CourseSlug, QuestionnaireAnswers } from "@/types/user";
import { submitQuestionnaire } from "@/services/api";

const courseOptions: CourseSlug[] = ["Medicina", "Engenharia", "ADS", "Enfermagem"];

const questions: { key: keyof QuestionnaireAnswers; label: string }[] = [
  { key: "biology", label: "Você gosta de biologia?" },
  { key: "math", label: "Prefere cálculos e física?" },
  { key: "helping", label: "Gosta de ajudar pessoas no dia a dia?" },
  { key: "tech", label: "Tem interesse em tecnologia e sistemas?" },
];

export default function QuestionForm() {
  const [name, setName] = useState("");
  const [currentCourse, setCurrentCourse] = useState<CourseSlug>("ADS");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    biology: "no",
    math: "no",
    helping: "no",
    tech: "no",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const user = await submitQuestionnaire({ name: name || "Aluno", currentCourse, answers });
      setStatus("success");
      setMessage(`Sugerido: ${user.suggestedCourse} para ${user.name}`);
      setName("");
      setAnswers({ biology: "no", math: "no", helping: "no", tech: "no" });
    } catch {
      setStatus("error");
      setMessage("Não foi possível enviar o questionário. Tente novamente.");
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/10">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">Questionário Inteligente</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Descubra o melhor ramo</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Responda algumas perguntas rápidas e receba a sugestão de curso mais alinhado com seu perfil.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-white/70">
            Nome
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#030303] px-4 py-3 text-white outline-none transition focus:border-white/20"
            />
          </label>
          <label className="block text-sm font-medium text-white/70">
            Curso informado
            <select
              value={currentCourse}
              onChange={(event) => setCurrentCourse(event.target.value as CourseSlug)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#030303] px-4 py-3 text-white outline-none transition focus:border-white/20"
            >
              {courseOptions.map((course) => (
                <option key={course} value={course} className="bg-[#090909] text-white">
                  {course}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.key} className="rounded-3xl border border-white/10 bg-[#040404]/80 p-4">
              <p className="text-sm font-medium text-white">{question.label}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.key]: option }))}
                    className={`rounded-full px-4 py-2 text-sm transition ${answers[question.key] === option ? "bg-white text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
                  >
                    {option === "yes" ? "Sim" : "Não"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Enviar questionário"}
          </button>
          {message ? (
            <p className={`text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}>{message}</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
