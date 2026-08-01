import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col gap-8 px-4 py-10 text-white sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">
          Bem-vindo
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
          Atendente Virtual de Cursos
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
          Armazene usuários em cursos como Medicina, Engenharia, ADS e
          Enfermagem e aplique um questionário inteligente para sugerir o melhor
          ramo.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Ver Dashboard
          </Link>
          <Link
            href="/users"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Gerenciar Usuários
          </Link>
        </div>
      </section>
    </div>
  );
}
