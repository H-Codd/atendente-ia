"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Usuários" },
  { href: "/statistics", label: "Estatísticas" },
  { href: "/settings", label: "Configurações" },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed inset-x-0 top-16 z-20 w-full border-b border-white/10 bg-[#090909]/95 px-4 pb-6 pt-4 backdrop-blur-xl shadow-xl shadow-black/20 md:static md:top-0 md:w-72 md:border-b-0 md:border-r md:pb-0 md:pt-8">
      <div className="flex items-center justify-between md:hidden">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          Menu
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          {open ? "Fechar" : "Abrir"}
        </button>
      </div>

      <div
        className={`${open ? "block" : "hidden"} mt-6 space-y-2 md:block md:mt-0`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
