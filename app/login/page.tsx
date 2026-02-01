import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <Suspense fallback={<div className="mx-auto max-w-md" /> }>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
