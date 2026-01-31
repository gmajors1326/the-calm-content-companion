"use client";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#2f5d46] text-center">
            Checkout
          </h1>
          <div className="mt-8 rounded-xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-lg font-semibold text-[#1f2937]">
              The Calm Content Companion Guide
            </p>
            <p className="mt-2 text-base text-[#374151]">$27 — one-time purchase</p>
            <ul className="mt-4 space-y-2 text-sm text-[#374151]">
              <li>• Instant download (PDF)</li>
              <li>• Calm posting rhythm</li>
              <li>• Clear messaging foundation</li>
            </ul>
            <button
              type="button"
              className="mt-6 w-full rounded-md bg-[#1c3125] px-6 py-3 text-white font-semibold"
              onClick={() => alert('Stripe checkout next')}
            >
              Pay $27
            </button>
            <a
              href="/guide"
              className="mt-3 block text-center text-sm text-[#2f5d46] underline"
            >
              Back to the Guide
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
