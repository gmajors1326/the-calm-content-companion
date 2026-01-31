"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-semibold text-[#143226]">Signing you out</h1>
          <p className="mt-3 text-sm text-[#475569]">
            You will be redirected to the login page.
          </p>
        </div>
      </section>
    </main>
  );
}
