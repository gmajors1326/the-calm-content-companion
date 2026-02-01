"use client";

import { useRef, useState, useTransition } from "react";
import { analyzeWeeklyContentReflection } from "./actions";
import ToolError from "../../../components/tool/ToolError";
import ToolResultCard from "../../../components/tool/ToolResultCard";

type Analysis = {
  week_summary: string;
  did_well: string[];
  adjustments: string[];
  next_week_focus: string;
  momentum_check: string;
  encouragement: string;
};

const PLATFORM_OPTIONS = ["IG", "TikTok", "YouTube"] as const;
const WEEK_OPTIONS = ["great", "okay", "rough"] as const;
const ENERGY_OPTIONS = ["low", "medium", "high"] as const;
const CONFIDENCE_OPTIONS = ["low", "medium", "high"] as const;

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

const parseNumber = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const numberValue = Number(trimmed);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

export default function WeeklyContentReflectionClient() {
  const [platform, setPlatform] = useState<(typeof PLATFORM_OPTIONS)[number] | "">("");
  const [howTheWeekFelt, setHowTheWeekFelt] = useState<(typeof WEEK_OPTIONS)[number] | "">("");
  const [energyLevel, setEnergyLevel] = useState<(typeof ENERGY_OPTIONS)[number] | "">("");
  const [postsPublished, setPostsPublished] = useState("");
  const [whatWorked, setWhatWorked] = useState("");
  const [whatFeltHard, setWhatFeltHard] = useState("");
  const [surprises, setSurprises] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState<(typeof CONFIDENCE_OPTIONS)[number] | "">("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<{ message: string; debugId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const workedRef = useRef<HTMLTextAreaElement | null>(null);

  const canAnalyze = platform && howTheWeekFelt && energyLevel && !isPending;

  const handleCopy = async (text: string) => {
    if (!text || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // ignore
    }
  };

  const runAnalysis = (payload: {
    platform: (typeof PLATFORM_OPTIONS)[number];
    how_the_week_felt: (typeof WEEK_OPTIONS)[number];
    energy_level: (typeof ENERGY_OPTIONS)[number];
    posts_published?: number;
    what_worked?: string;
    what_felt_hard?: string;
    surprises?: string;
    confidence_level?: (typeof CONFIDENCE_OPTIONS)[number];
  }) => {
    setError(null);
    setAnalysis(null);

    startTransition(async () => {
      try {
        const result = await analyzeWeeklyContentReflection(payload);

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
    if (!platform || !howTheWeekFelt || !energyLevel) {
      setError({ message: "Please complete the required fields." });
      return;
    }

    runAnalysis({
      platform,
      how_the_week_felt: howTheWeekFelt,
      energy_level: energyLevel,
      posts_published: parseNumber(postsPublished),
      what_worked: whatWorked || undefined,
      what_felt_hard: whatFeltHard || undefined,
      surprises: surprises || undefined,
      confidence_level: confidenceLevel || undefined
    });
  };

  const handleExample = () => {
    setPlatform("IG");
    setHowTheWeekFelt("okay");
    setEnergyLevel("low");
    setPostsPublished("2");
    setWhatWorked("I showed up even when I didn’t feel motivated.");
    setWhatFeltHard("Overthinking hooks and comparing myself.");
    setSurprises("People saved my post more than I expected.");
    setConfidenceLevel("medium");
    setAnalysis(null);
    setError(null);

    requestAnimationFrame(() => {
      workedRef.current?.focus();
    });
  };

  return (
    <div className="mt-8 grid gap-6">
      <ToolResultCard title="Inputs">
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canAnalyze) {
              setError({ message: "Please complete the required fields." });
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

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="platform-select">
                Platform (required)
              </label>
              <select
                id="platform-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={platform}
                onChange={(event) => setPlatform(event.target.value as (typeof PLATFORM_OPTIONS)[number])}
                required
              >
                <option value="">Select platform</option>
                {PLATFORM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="week-select">
                How the week felt (required)
              </label>
              <select
                id="week-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={howTheWeekFelt}
                onChange={(event) => setHowTheWeekFelt(event.target.value as (typeof WEEK_OPTIONS)[number])}
                required
              >
                <option value="">Select</option>
                {WEEK_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="energy-select">
                Energy level (required)
              </label>
              <select
                id="energy-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={energyLevel}
                onChange={(event) => setEnergyLevel(event.target.value as (typeof ENERGY_OPTIONS)[number])}
                required
              >
                <option value="">Select energy</option>
                {ENERGY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="posts-input">
                Posts published
              </label>
              <input
                id="posts-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={postsPublished}
                onChange={(event) => setPostsPublished(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="confidence-select">
                Confidence level
              </label>
              <select
                id="confidence-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={confidenceLevel}
                onChange={(event) => setConfidenceLevel(event.target.value as (typeof CONFIDENCE_OPTIONS)[number])}
              >
                <option value="">Select confidence</option>
                {CONFIDENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="worked-input">
              What worked
            </label>
            <textarea
              ref={workedRef}
              id="worked-input"
              className="mt-3 min-h-[110px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              value={whatWorked}
              onChange={(event) => setWhatWorked(event.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="hard-input">
              What felt hard
            </label>
            <textarea
              id="hard-input"
              className="mt-3 min-h-[110px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              value={whatFeltHard}
              onChange={(event) => setWhatFeltHard(event.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="surprises-input">
              Surprises
            </label>
            <textarea
              id="surprises-input"
              className="mt-3 min-h-[110px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              value={surprises}
              onChange={(event) => setSurprises(event.target.value)}
            />
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
                  Reflecting...
                </span>
              ) : (
                "Reflect on my week"
              )}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#143226] transition hover:border-[#143226]"
              onClick={() => {
                setPlatform("");
                setHowTheWeekFelt("");
                setEnergyLevel("");
                setPostsPublished("");
                setWhatWorked("");
                setWhatFeltHard("");
                setSurprises("");
                setConfidenceLevel("");
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
        <ToolResultCard title="Reflecting">
          <div className="flex items-center gap-3 text-sm text-[#475569]">
            <SpinnerIcon className="h-5 w-5 animate-spin" />
            Writing your reflection...
          </div>
        </ToolResultCard>
      )}

      {analysis && !isPending && (
        <div className="grid gap-6">
          <ToolResultCard title="Week summary">
            <p className="text-sm text-[#475569]">{analysis.week_summary}</p>
          </ToolResultCard>

          <ToolResultCard title="What you did well">
            <ul className="list-disc pl-5 text-sm text-[#475569]">
              {analysis.did_well.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </ToolResultCard>

          <ToolResultCard title="What to gently adjust">
            <ul className="list-disc pl-5 text-sm text-[#475569]">
              {analysis.adjustments.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </ToolResultCard>

          <ToolResultCard
            title="One focus for next week"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-3 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.next_week_focus)}
              >
                Copy
              </button>
            }
          >
            <p className="text-sm text-[#475569]">{analysis.next_week_focus}</p>
          </ToolResultCard>

          <ToolResultCard title="Momentum check">
            <p className="text-sm text-[#475569]">{analysis.momentum_check}</p>
          </ToolResultCard>

          <ToolResultCard title="Closing encouragement">
            <p className="text-sm text-[#475569]">{analysis.encouragement}</p>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
}
