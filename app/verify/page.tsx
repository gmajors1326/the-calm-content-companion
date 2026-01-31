import Link from "next/link";
import { redirect } from "next/navigation";
import { hasSupabaseSession, safeNextPath } from "../../lib/access";

type VerifyPageProps = {
  searchParams?: {
    next?: string;
  };
};

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const nextPath = safeNextPath(searchParams?.next);

  if (hasSupabaseSession()) {
    redirect(nextPath);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-semibold text-[#143226]">Check your email</h1>
          <p className="mt-3 text-sm text-[#475569]">
            Open the magic link to confirm your session. If the link has expired,
            return to login and request a new one.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={nextPath}
              className="rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white"
            >
              Continue
            </Link>
            <Link href="/login" className="text-sm text-[#143226] underline">
              Back to login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
