import type { User } from "@/types/user";

type UserCardProps = {
  user: User;
  onEdit?: () => void;
  onRemove?: () => void;
};

export default function UseCard({ user, onEdit, onRemove }: UserCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-xl shadow-black/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Nome</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{user.name}</h3>
        </div>
        <div className="rounded-2xl bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
          {user.suggestedCourse}
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-white/70">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-[0.8rem] uppercase tracking-[0.18em] text-white/50">Curso informado</p>
          <p className="mt-2 font-medium text-white">{user.informedCourse}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-[0.8rem] uppercase tracking-[0.18em] text-white/50">Status</p>
          <p className="mt-2 text-white/70">Registro sincronizado com o backend</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
        >
          Remover
        </button>
      </div>
    </article>
  );
}
