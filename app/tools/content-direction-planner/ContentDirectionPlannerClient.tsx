"use client";

import { useState, useTransition } from "react";
import { analyzeContentDirection } from "./actions";
import ToolError from "../../../components/tool/ToolError";
import ToolResultCard from "../../../components/tool/ToolResultCard";

type ContentIdea = {
  title: string;
  format: string;
  effort: "low" | "medium";
};

type Analysis = {
  weekly_direction: string;
  posting_rhythm: {
    posts: number;
    note: string;
  };
  ideas: ContentIdea[];
  one_post_fallback: string;
  encouragement: string;
};

const GOAL_OPTIONS = [
  "grow audience",
  "build trust",
  "sell softly",
  "stay consistent"
] as const;
const ENERGY_OPTIONS = ["low", "medium", "high"] as const;
const PLATFORM_OPTIONS = ["IG Reels", "TikTok", "YouTube Shorts"] as const;
const DAYS_OPTIONS = ["1–2 days", "3–4 days", "5+ days"] as const;
const TONE_OPTIONS = ["calm", "direct", "playful", "premium"] as const;

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

export default function ContentDirectionPlannerClient() {
  const [niche, setNiche] = useState("");
  const [mainGoal, setMainGoal] = useState<(typeof GOAL_OPTIONS)[number] | "">("");
  const [energyLevel, setEnergyLevel] = useState<(typeof ENERGY_OPTIONS)[number] | "">("");
  const [platform, setPlatform] = useState<(typeof PLATFORM_OPTIONS)[number] | "">("");
  const [postingDays, setPostingDays] = useState<(typeof DAYS_OPTIONS)[number] | "">("");
  const [tone, setTone] = useState<(typeof TONE_OPTIONS)[number] | "">("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<{ message: string; debugId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const canAnalyze =
    mainGoal &&
    energyLevel &&
    platform &&
    postingDays &&
    tone &&
    !isPending;

  const handleCopy = async (text: string) => {
    if (!text || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // ignore
    }
  };

  const runAnalysis = (payload: {
    niche?: string;
    main_goal: (typeof GOAL_OPTIONS)[number];
    energy_level: (typeof ENERGY_OPTIONS)[number];
    platform: (typeof PLATFORM_OPTIONS)[number];
    posting_days: (typeof DAYS_OPTIONS)[number];
    tone: (typeof TONE_OPTIONS)[number];
  }) => {
    setError(null);
    setAnalysis(null);

    startTransition(async () => {
      try {
        const result = await analyzeContentDirection(payload);

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
    if (!mainGoal || !energyLevel || !platform || !postingDays || !tone) {
      setError({ message: "Please complete the required fields." });
      return;
    }

    runAnalysis({
      niche: niche || undefined,
      main_goal: mainGoal,
      energy_level: energyLevel,
      platform,
      posting_days: postingDays,
      tone
    });
  };

  const handleExample = () => {
    setNiche("Digital creators and coaches");
    setMainGoal("stay consistent");
    setEnergyLevel("low");
    setPlatform("IG Reels");
    setPostingDays("3–4 days");
    setTone("calm");
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

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="niche-input">
              Niche (optional)
            </label>
            <input
              id="niche-input"
              className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              placeholder="Example: Social media coaches"
              value={niche}
              onChange={(event) => setNiche(event.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="goal-select">
                Main goal (required)
              </label>
              <select
                id="goal-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={mainGoal}
                onChange={(event) => setMainGoal(event.target.value as (typeof GOAL_OPTIONS)[number])}
                required
              >
                <option value="">Select goal</option>
                {GOAL_OPTIONS.map((option) => (
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
              <label className="text-sm font-semibold text-[#143226]" htmlFor="days-select">
                Posting days (required)
              </label>
              <select
                id="days-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={postingDays}
                onChange={(event) => setPostingDays(event.target.value as (typeof DAYS_OPTIONS)[number])}
                required
              >
                <option value="">Select days</option>
                {DAYS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="tone-select">
              Tone (required)
            </label>
            <select
              id="tone-select"
              className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              value={tone}
              onChange={(event) => setTone(event.target.value as (typeof TONE_OPTIONS)[number])}
              required
            >
              <option value="">Select tone</option>
              {TONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
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
                  Planning...
                </span>
              ) : (
                "Plan my week"
              )}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#143226] transition hover:border-[#143226]"
              onClick={() => {
                setNiche("");
                setMainGoal("");
                setEnergyLevel("");
                setPlatform("");
                setPostingDays("");
                setTone("");
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
            Generating your weekly direction...
          </div>
        </ToolResultCard>
      )}

      {analysis && !isPending && (
        <div className="grid gap-6">
          <ToolResultCard title="Weekly content direction">
            <p className="text-sm text-[#475569]">{analysis.weekly_direction}</p>
          </ToolResultCard>

          <ToolResultCard title="Suggested posting rhythm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                {analysis.posting_rhythm.posts} posts
              </span>
              <p className="text-sm text-[#475569]">{analysis.posting_rhythm.note}</p>
            </div>
          </ToolResultCard>

          <ToolResultCard title="Content ideas">
            <div className="grid gap-4">
              {analysis.ideas.map((idea, index) => (
                <div key={`${idea.title}-${index}`} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f172a]">{idea.title}</p>
                    <button
                      type="button"
                      className="rounded-full border border-[#cbd5f5] px-3 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                      onClick={() => handleCopy(idea.title)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#f8fafc] px-2.5 py-1 text-xs font-semibold text-[#475569]">
                      {idea.format}
                    </span>
                    <span className="rounded-full bg-[#f1f5f0] px-2.5 py-1 text-xs font-semibold text-[#2f5d46]">
                      {idea.effort}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ToolResultCard>

          <ToolResultCard
            title="If you only post once"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-3 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.one_post_fallback)}
              >
                Copy
              </button>
            }
          >
            <p className="text-sm text-[#475569]">{analysis.one_post_fallback}</p>
          </ToolResultCard>

          <ToolResultCard title="Encouragement">
            <p className="text-sm text-[#475569]">{analysis.encouragement}</p>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
}
