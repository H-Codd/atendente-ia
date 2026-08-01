"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { logout, user } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#070707]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-8xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold">
            AV
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Atendente Virtual
            </p>
            <p className="text-base font-semibold text-white">
              Orientador de Cursos
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            {user?.name ?? "Admin"}
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
