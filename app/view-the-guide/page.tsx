import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Calm Content Guide",
  description:
    "A gentle guide to simplify your content, find a sustainable posting rhythm, and grow without burnout.",
  alternates: { canonical: "/view-the-guide" },
  openGraph: {
    title: "The Calm Content Guide",
    description:
      "A gentle guide to simplify your content, find a sustainable posting rhythm, and grow without burnout.",
    url: "https://the-calm-content-companion.vercel.app/view-the-guide",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ViewTheGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section
        aria-labelledby="guide-intro-title"
        className="w-full py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[680px]">
                <Image
                  src="/images/guide-laptop.png"
                  alt="The Calm Content Guide displayed on a laptop screen"
                  width={1040}
                  height={780}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-left">
              <header className="space-y-3">
                <h1
                  id="guide-intro-title"
                  className="text-3xl font-semibold tracking-tight text-[#143226] sm:text-4xl"
                >
                  Welcome to The Calm Content Guide
                </h1>

                <h2 className="text-lg font-medium text-[#143226]/80">
                  Welcome
                </h2>
              </header>

              <div className="mt-6 space-y-4 text-base leading-7 text-[#143226]/85">
                <p>
                  If you’re here, there’s a good chance content has started to
                  feel heavier than it should.
                </p>

                <p>
                  Maybe you know you want to show up — but every time you open
                  your phone, you feel overwhelmed by advice, trends, and
                  pressure to do more.
                </p>

                <p>
                  I created <em>The Calm Content Guide</em> because I’ve been
                  there too.
                </p>

                <p>
                  I didn’t struggle because I wasn’t capable. I struggled
                  because content had become noisy, complicated, and exhausting.
                </p>

                <p>
                  What changed everything wasn’t learning more.{" "}
                  <strong>It was learning how to simplify.</strong>
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href="https://the-calm-content-companion.vercel.app/view-the-guide"
                  className="inline-flex w-full max-w-md items-center justify-center rounded-md bg-[#143226] px-6 py-3 text-base font-medium text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#143226] focus:ring-offset-2 sm:w-auto sm:max-w-sm"
                >
                  Continue reading
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
