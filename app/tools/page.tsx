import Link from "next/link";

const TOOLS = [
  { slug: "hook-clarity-analyzer", name: "Hook Clarity Analyzer", locked: true },
  { slug: "message-positioning-builder", name: "Message Positioning Builder", locked: true },
  { slug: "content-direction-planner", name: "Content Direction Planner", locked: false },
  { slug: "engagement-signal", name: "Engagement Signal Interpreter", locked: true },
  { slug: "weekly-reflection", name: "Weekly Content Reflection", locked: true },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Tools</h1>
          <p className="mt-2 text-sm text-[#475569]">
            Sign in to unlock tools and start a focused workflow.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TOOLS.map((tool) => (
              <div
                key={tool.slug}
                className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
              >
                <p className="text-base font-semibold text-[#143226]">
                  {tool.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-[#94a3b8]">
                  {tool.locked ? "Locked" : "Available"}
                </p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-[#143226] underline"
                >
                  View details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
