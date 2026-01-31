export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#2f5d46]">
            The Calm Content Companion Guide
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#374151]">
            This is the guide page. Add the full guide content here when it is ready.
          </p>
          <p className="mt-4 text-base font-medium text-[#374151]">$27 — one-time purchase</p>
          <a
            href="/checkout"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#1c3125] px-6 py-3 text-white font-semibold"
          >
            Get the Guide — $27
          </a>
        </div>
      </section>
    </main>
  );
}
