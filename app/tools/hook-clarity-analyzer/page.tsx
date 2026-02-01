import Link from "next/link";
import { requireSupabaseSession } from "../../../lib/access";
import HookClarityAnalyzerClient from "./HookClarityAnalyzerClient";

export default function HookClarityAnalyzerPage() {
  requireSupabaseSession("/tools/hook-clarity-analyzer");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#143226]">Hook Clarity Analyzer</h1>
              <p className="mt-2 text-sm text-[#475569]">
                Paste a hook or opener to get clarity feedback and rewrite options.
              </p>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-[#143226] underline">
              Back to tools
            </Link>
          </div>

          <HookClarityAnalyzerClient />
        </div>
      </section>
    </main>
  );
}
