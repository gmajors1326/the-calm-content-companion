import Link from "next/link";
import MessagePositioningBuilderClient from "./MessagePositioningBuilderClient";

export default function MessagePositioningBuilderPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#143226]">Your Main Instagram Message</h1>
              <p className="mt-2 text-sm text-[#475569]">Clarify the main message your posts return to.</p>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-[#143226] underline">
              Back to tools
            </Link>
          </div>

          <div className="mt-6 max-w-3xl space-y-3 text-sm text-[#475569]">
            <p>Before you worry about what to post, it helps to know what your posts are about.</p>
            <p>
              This tool helps you put words to your main Instagram message — the idea your content can return to again
              and again, without feeling repetitive or forced.
            </p>
            <p>You don’t need a niche statement.</p>
            <p>You don’t need a brand framework.</p>
            <p>Just clarity.</p>
          </div>

          <MessagePositioningBuilderClient />
        </div>
      </section>
    </main>
  );
}
