"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function getSafeNext(nextParam: string | null) {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return "/";
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const nextPath = useMemo(
    () => getSafeNext(searchParams.get("next")),
    [searchParams]
  );

  const handleMagicLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/verify?next=${encodeURIComponent(nextPath)}`);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-semibold text-[#143226]">Sign in</h1>
          <p className="mt-2 text-sm text-[#475569]">
            Enter your email to receive a magic link.
          </p>

          <form onSubmit={handleMagicLink} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#143226]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-[#d8e1d5] bg-white px-3 py-2 text-sm text-[#143226] focus:outline-none focus:ring-2 focus:ring-[#143226]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Send magic link
            </button>
          </form>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => router.push(`/verify?next=${encodeURIComponent(nextPath)}`)}
              className="w-full rounded-md border border-[#d8e1d5] bg-white px-4 py-3 text-sm font-semibold text-[#143226] transition hover:bg-[#f2f5f1]"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => router.push(`/verify?next=${encodeURIComponent(nextPath)}`)}
              className="w-full rounded-md border border-[#d8e1d5] bg-white px-4 py-3 text-sm font-semibold text-[#143226] transition hover:bg-[#f2f5f1]"
            >
              Continue with GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-[#64748b]">
            <Link href={nextPath}>Back to site</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
