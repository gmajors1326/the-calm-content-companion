import Link from "next/link";
import WeeklyContentReflectionClient from "./WeeklyContentReflectionClient";

export default function WeeklyContentReflectionPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#143226]">Weekly Content Reflection</h1>
              <p className="mt-2 text-sm text-[#475569]">
                A gentle reset so you can keep momentum without burning out.
              </p>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-[#143226] underline">
              Back to tools
            </Link>
          </div>

          <WeeklyContentReflectionClient />
        </div>
      </section>
    </main>
  );
}
