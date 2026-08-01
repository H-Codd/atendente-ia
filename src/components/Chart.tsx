import { ChartProps } from "@/types/chartProps";
import type { ReactNode } from "react";

export default function Chart({ title, caption, items, footer }: ChartProps) {
  const total = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/10">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/50">{title}</p>
          {caption ? <p className="mt-2 text-sm text-white/70">{caption}</p> : null}
        </div>
        <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/80">Total: {total}</div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${percent}%`, backgroundColor: item.color ?? "#ffffff" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {footer ? <div className="mt-6 text-sm text-white/60">{footer}</div> : null}
    </section>
  );
}
