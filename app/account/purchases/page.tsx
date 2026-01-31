import Link from "next/link";
import { requireSupabaseSession } from "../../../lib/access";

export default function PurchasesPage() {
  requireSupabaseSession("/account/purchases");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Purchases</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-sm font-semibold text-[#143226]">Guide</p>
              <p className="mt-2 text-sm text-[#475569]">Not purchased</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
              <p className="text-sm font-semibold text-[#143226]">Tools</p>
              <p className="mt-2 text-sm text-[#475569]">No active access</p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/account" className="text-sm text-[#143226] underline">
              Back to account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
