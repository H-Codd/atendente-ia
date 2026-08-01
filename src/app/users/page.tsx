"use client";

import { useEffect, useState } from "react";
import QuestionForm from "@/components/QuestionForm";
import UseCard from "@/components/UseCard";
import { fetchUsers } from "@/services/api";
import type { User } from "@/types/user";

export default function UsersPage() {
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

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_0.65fr]">
      <section className="space-y-6">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10">
          <p className="text-sm uppercase tracking-[0.24em] text-white/50">
            Usuários
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Lista de alunos
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Aqui estão os usuários que já responderam ao questionário e
            receberem uma sugestão de curso.
          </p>
        </div>

        {loading ? (
          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 text-white/70">
            Carregando usuários…
          </div>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <UseCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      <div className="space-y-6">
        <QuestionForm />
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
          <p className="text-sm uppercase tracking-[0.24em] text-white/50">
            Dicas
          </p>
          <h2 className="mt-3 text-xl font-semibold text-white">
            Como funciona
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            O questionário processa suas respostas para sugerir um ramo com base
            em interesses reais. Ele utiliza critérios de biologia, matemática,
            ajuda ao próximo e tecnologia.
          </p>
        </div>
      </div>
    </div>
  );
}
