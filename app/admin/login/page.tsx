import Link from "next/link";

type AdminLoginPageProps = {
  searchParams?: {
    reason?: string;
  };
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const showNotAllowlisted = searchParams?.reason === "not-allowlisted";

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-semibold text-[#143226]">Admin access</h1>
          <p className="mt-2 text-sm text-[#475569]">
            Admin access requires allowlist approval.
          </p>
          {showNotAllowlisted && (
            <p className="mt-4 text-sm font-semibold text-[#b45309]">
              Your account is not allowlisted for admin access.
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/verify?next=/admin"
              className="rounded-md bg-[#143226] px-4 py-3 text-sm font-semibold text-white"
            >
              Continue to admin sign-in
            </Link>
            <Link href="/" className="text-sm text-[#143226] underline">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
