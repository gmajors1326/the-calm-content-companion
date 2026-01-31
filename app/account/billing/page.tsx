import Link from "next/link";
import { requireSupabaseSession } from "../../../lib/access";

export default function BillingPage() {
  requireSupabaseSession("/account/billing");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold text-[#143226]">Billing</h1>
          <div className="mt-8 rounded-xl bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-[#143226]">Status</p>
            <p className="mt-2 text-sm text-[#475569]">No active subscription</p>
            <button
              type="button"
              className="mt-4 rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white opacity-70"
              disabled
            >
              Open Stripe portal
            </button>
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
