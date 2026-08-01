"use client";

import { useEffect, useMemo, useState } from "react";
import Chart from "@/components/Chart";
import UseCard from "@/components/UseCard";
import { fetchUsers } from "@/services/api";
import type { User } from "@/types/user";

export default function DashboardPage() {
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

  const total = users.length;
  const counts = useMemo(() => {
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

  const distribution = Object.entries(counts).map(([label, value]) => ({
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

  const recentUsers = users.slice(0, 3);
  const lastUpdate = users[0]?.createdAt
    ? new Date(users[0].createdAt).toLocaleDateString("pt-BR")
    : "Sem registros";

  if (loading) {
    return (
      <div className="rounded-4xl border border-white/10 bg-white/5 p-8 text-white/70">
        Carregando dados…
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10">
          <p className="text-sm uppercase tracking-[0.24em] text-white/50">
            Resumo rápido
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Visão geral do atendente
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Monitoramento de usuários e indicações de cursos com base no
            comportamento de escolha.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#070707] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-white/50">
                Usuários cadastrados
              </p>
              <p className="mt-4 text-4xl font-semibold text-white">{total}</p>
            </div>
            <div className="rounded-3xl bg-[#070707] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-white/50">
                Última atualização
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                {lastUpdate}
              </p>
            </div>
          </div>
        </div>

        <Chart
          title="Distribuição de cursos sugeridos"
          items={distribution}
          caption="Quantidade de pessoas por curso sugerido."
        />
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {recentUsers.map((user) => (
          <UseCard key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}
