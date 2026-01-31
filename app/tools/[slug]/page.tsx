import Link from "next/link";
import { requireSupabaseSession } from "../../../lib/access";

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export default function ToolPage({ params }: ToolPageProps) {
  requireSupabaseSession(`/tools/${params.slug}`);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold text-[#143226]">{params.slug}</h1>
          <p className="mt-2 text-sm text-[#475569]">
            This tool requires an active session. Tool UI will render here.
          </p>
          <div className="mt-6">
            <Link href="/tools" className="text-sm text-[#143226] underline">
              Back to tools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
