"use client";

import { useState, useTransition } from "react";
import { analyzeMessagePositioning } from "./actions";
import ToolError from "../../../components/tool/ToolError";
import ToolResultCard from "../../../components/tool/ToolResultCard";

type Analysis = {
  main_message: string;
  supporting_ideas: string[];
  reassurance: string;
};

const SpinnerIcon = ({ className = "h-4 w-4 animate-spin" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

export default function MessagePositioningBuilderClient() {
  const [whatYouDo, setWhatYouDo] = useState("");
  const [whoYouHelp, setWhoYouHelp] = useState("");
  const [problemYouSolve, setProblemYouSolve] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<{ message: string; debugId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const canAnalyze = whatYouDo.trim().length > 0 && !isPending;

  const handleCopy = async (text: string) => {
    if (!text || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // ignore
    }
  };

  const runAnalysis = (payload: {
    what_you_do: string;
    who_you_help?: string;
    problem_you_solve?: string;
  }) => {
    setError(null);
    setAnalysis(null);

    startTransition(async () => {
      try {
        const result = await analyzeMessagePositioning(payload);

        if (result.ok === false) {
          setError({ message: result.message, debugId: result.debugId });
          setAnalysis(null);
          return;
        }

        setAnalysis(result.data as Analysis);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to generate results right now.";
        setError({ message });
      }
    });
  };

  const handleAnalyze = () => {
    runAnalysis({
      what_you_do: whatYouDo,
      who_you_help: whoYouHelp || undefined,
      problem_you_solve: problemYouSolve || undefined
    });
  };

  const handleExample = () => {
    setWhatYouDo("I help creators simplify their content so they can show up consistently without burnout.");
    setWhoYouHelp("Overwhelmed creators and small business owners");
    setProblemYouSolve("Too much advice, not enough clarity");
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="mt-8 grid gap-6">
      <ToolResultCard title="Inputs">
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canAnalyze) {
              setError({ message: "Please tell us what you do." });
              return;
            }
            handleAnalyze();
          }}
        >
          <div>
            <button
              type="button"
              onClick={handleExample}
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd5f5] px-4 py-1.5 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.813 15.904L9 18l-.813-2.096a4.5 4.5 0 00-2.832-2.832L3 12l2.355-.813a4.5 4.5 0 002.832-2.832L9 6l.813 2.355a4.5 4.5 0 002.832 2.832L15 12l-2.355.813a4.5 4.5 0 00-2.832 2.832z" />
                <path d="M18 7l.375 1.08A2.25 2.25 0 0019.92 9.625L21 10l-1.08.375a2.25 2.25 0 00-1.545 1.545L18 13l-.375-1.08a2.25 2.25 0 00-1.545-1.545L15 10l1.08-.375a2.25 2.25 0 001.545-1.545L18 7z" />
              </svg>
              AI Example
            </button>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="what-input">
              What you do (required)
            </label>
            <textarea
              id="what-input"
              className="mt-3 min-h-[120px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              placeholder="Describe what you do in your own words (messy is fine)"
              value={whatYouDo}
              onChange={(event) => setWhatYouDo(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="who-input">
                Who you help (optional)
              </label>
              <input
                id="who-input"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                placeholder="Example: Service-based founders"
                value={whoYouHelp}
                onChange={(event) => setWhoYouHelp(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="problem-input">
                Problem you solve (optional)
              </label>
              <input
                id="problem-input"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                placeholder="Example: Confusing messaging that loses sales"
                value={problemYouSolve}
                onChange={(event) => setProblemYouSolve(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#143226] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f251c] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canAnalyze}
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <SpinnerIcon />
                  Clarifying...
                </span>
              ) : (
                "Clarify my message"
              )}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#143226] transition hover:border-[#143226]"
              onClick={() => {
                setWhatYouDo("");
                setWhoYouHelp("");
                setProblemYouSolve("");
                setAnalysis(null);
                setError(null);
              }}
              disabled={isPending}
            >
              Clear
            </button>
          </div>
        </form>
      </ToolResultCard>

      {error && (
        <ToolError
          message={error.message}
          debugId={error.debugId}
          onRetry={() => setError(null)}
        />
      )}

      {isPending && (
        <ToolResultCard title="Analyzing">
          <div className="flex items-center gap-3 text-sm text-[#475569]">
            <SpinnerIcon className="h-5 w-5 animate-spin" />
            Generating your message...
          </div>
        </ToolResultCard>
      )}

      {analysis && !isPending && (
        <div className="grid gap-6">
          <ToolResultCard
            title="Main message"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.main_message)}
              >
                Copy
              </button>
            }
          >
            <p className="text-base font-semibold text-[#0f172a]">{analysis.main_message}</p>
          </ToolResultCard>

          <ToolResultCard
            title="Supporting ideas"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.supporting_ideas.join("\n"))}
              >
                Copy
              </button>
            }
          >
            <ul className="list-disc pl-5 text-sm text-[#475569]">
              {analysis.supporting_ideas.map((idea, index) => (
                <li key={`${idea}-${index}`}>{idea}</li>
              ))}
            </ul>
          </ToolResultCard>

          <ToolResultCard
            title="Reassurance"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.reassurance)}
              >
                Copy
              </button>
            }
          >
            <p className="text-base font-semibold text-[#0f172a]">{analysis.reassurance}</p>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
}
