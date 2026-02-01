import type { ReactNode } from "react";

type ToolResultCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function ToolResultCard({
  title,
  description,
  action,
  children
}: ToolResultCardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#143226]">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-[#64748b]">{description}</p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
