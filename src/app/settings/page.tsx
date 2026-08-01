"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [cursorMode, setCursorMode] = useState<"default" | "pointer">(
    "default",
  );

  return (
    <div className="grid gap-6">
      <section className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10">
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">
          Configurações
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Ajustes do atendente
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/70">
          Personalize informações gerais e controle a forma como o painel exibe
          dados e sugestões.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#070707] p-6 text-white">
          <p className="font-semibold">Tema</p>
          <p className="mt-3 text-sm text-white/70">
            O painel já utiliza um visual escuro para facilitar a leitura e
            reduzir cansaço visual.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#070707] p-6 text-white">
          <p className="font-semibold">Cursor</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCursorMode("default")}
              className={`rounded-full px-4 py-2 text-sm transition ${cursorMode === "default" ? "bg-white text-black" : "bg-white/10 text-white/70"}`}
            >
              Padrão
            </button>
            <button
              type="button"
              onClick={() => setCursorMode("pointer")}
              className={`rounded-full px-4 py-2 text-sm transition ${cursorMode === "pointer" ? "bg-white text-black" : "bg-white/10 text-white/70"}`}
            >
              Ponteiro
            </button>
          </div>
          <p className="mt-4 text-sm text-white/70">
            O cursor atual é{" "}
            {cursorMode === "pointer" ? "mais interativo" : "padrão"}.
          </p>
        </div>
      </div>

      <div
        className="rounded-3xl border border-white/10 bg-[#070707] p-6 text-white"
        style={{ cursor: cursorMode === "pointer" ? "pointer" : "default" }}
      >
        <p className="font-semibold">Dados</p>
        <p className="mt-3 text-sm text-white/70">
          Os usuários e estatísticas são carregados a partir do backend e
          atualizados quando você envia um novo questionário.
        </p>
      </div>
    </div>
  );
}
