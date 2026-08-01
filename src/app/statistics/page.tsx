"use client";

import { useEffect, useMemo, useState } from "react";
import Chart from "@/components/Chart";
import { fetchUsers } from "@/services/api";
import type { User } from "@/types/user";

export default function StatisticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const courseCount = useMemo(() => {
    const initial = {
      Medicina: 0,
      Engenharia: 0,
      ADS: 0,
      Enfermagem: 0,
    } as Record<string, number>;
    return users.reduce((acc, user) => {
      const course = user.suggestedCourse || "ADS";
      acc[course] = (acc[course] ?? 0) + 1;
      return acc;
    }, initial);
  }, [users]);

  const answerCount = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc.biology += user.answers?.biology === "yes" ? 1 : 0;
        acc.math += user.answers?.math === "yes" ? 1 : 0;
        acc.helping += user.answers?.helping === "yes" ? 1 : 0;
        acc.tech += user.answers?.tech === "yes" ? 1 : 0;
        return acc;
      },
      { biology: 0, math: 0, helping: 0, tech: 0 },
    );
  }, [users]);

  const distribution = Object.entries(courseCount).map(([label, value]) => ({
    label,
    value,
    color:
      label === "Medicina"
        ? "#38bdf8"
        : label === "Engenharia"
          ? "#fbbf24"
          : label === "ADS"
            ? "#a78bfa"
            : "#f472b6",
  }));

  const answerStats = [
    { label: "Biologia", value: answerCount.biology, color: "#38bdf8" },
    { label: "Matemática", value: answerCount.math, color: "#fbbf24" },
    { label: "Ajudar", value: answerCount.helping, color: "#34d399" },
    { label: "Tecnologia", value: answerCount.tech, color: "#a78bfa" },
  ];

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/70">
        Carregando estatísticas…
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10">
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">
          Estatísticas
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Tendências do questionário
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/70">
          Os números mostram como os estudantes têm sido direcionados pela
          atendente e quais áreas recebem maior afinidade.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Chart
          title="Cursos sugeridos"
          items={distribution}
          caption="Participação de cada curso entre os usuários cadastrados."
        />
        <Chart
          title="Respostas positivas"
          items={answerStats}
          caption="Frequência de respostas sim para cada área de interesse."
        />
      </div>
    </div>
  );
}
