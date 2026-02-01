"use client";

import { useMemo, useState, useTransition } from "react";
import { analyzeHookClarity } from "./actions";
import ToolError from "../../../components/tool/ToolError";
import ToolResultCard from "../../../components/tool/ToolResultCard";

type Rewrite = {
  rewritten_hook: string;
  approach: string;
  why: string;
};

type BestPick = {
  rewritten_hook: string;
  approach: string;
  why: string;
  variations: string[];
};

type Analysis = {
  score: number;
  verdict: string;
  issues: string[];
  rewrites: Rewrite[];
  best_pick: BestPick;
};

const PLATFORM_OPTIONS = ["IG Reels", "TikTok", "YT Shorts"] as const;
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

const EXAMPLES = [
  {
    hook_text: "Your Instagram posts don't need to sell harder — they need this 3-step clarity fix",
    niche: "digital marketing",
    audience: "small business owners",
    platform: "IG Reels",
    tone: "direct"
  },
  {
    hook_text: "A calm Instagram content rhythm that grows reach without daily posting",
    niche: "digital marketing",
    audience: "busy founders",
    platform: "IG Reels",
    tone: "calm"
  },
  {
    hook_text: "The fun way to write Instagram hooks that get saves (no trends needed)",
    niche: "digital marketing",
    audience: "new creators",
    platform: "IG Reels",
    tone: "playful"
  },
  {
    hook_text: "Premium Instagram positioning: the opener that makes your offer feel inevitable",
    niche: "digital marketing",
    audience: "high-ticket founders",
    platform: "IG Reels",
    tone: "premium"
  },
  {
    hook_text: "3 Instagram hook structures that turn scrollers into qualified leads",
    niche: "digital marketing",
    audience: "service providers",
    platform: "IG Reels",
    tone: "direct"
  },
  {
    hook_text: "If Instagram feels noisy, use this calm clarity script instead",
    niche: "digital marketing",
    audience: "overwhelmed marketers",
    platform: "IG Reels",
    tone: "calm"
  },
  {
    hook_text: "Playful Instagram hooks that still feel credible (here's the formula)",
    niche: "digital marketing",
    audience: "content strategists",
    platform: "IG Reels",
    tone: "playful"
  },
  {
    hook_text: "The premium Instagram opener that signals trust in 8 seconds",
    niche: "digital marketing",
    audience: "brand consultants",
    platform: "IG Reels",
    tone: "premium"
  }
] as const;

export default function HookClarityAnalyzerClient() {
  const [hookText, setHookText] = useState("");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState<(typeof PLATFORM_OPTIONS)[number] | "">("");
  const [tone, setTone] = useState<(typeof TONE_OPTIONS)[number] | "">("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<{ message: string; debugId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const canAnalyze = hookText.trim().length > 0 && platform && tone && !isPending;
  const scoreTone = useMemo(() => {
    if (!analysis) return "";
    if (analysis.score >= 80) return "bg-emerald-100 text-emerald-900";
    if (analysis.score >= 60) return "bg-amber-100 text-amber-900";
    return "bg-rose-100 text-rose-900";
  }, [analysis]);

  const handleCopy = async (text: string) => {
    if (!text || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // ignore
    }
  };

  const runAnalysis = (payload: {
    hook_text: string;
    niche?: string;
    audience?: string;
    platform: (typeof PLATFORM_OPTIONS)[number];
    tone: (typeof TONE_OPTIONS)[number];
  }) => {
    setError(null);
    setAnalysis(null);

    startTransition(async () => {
      try {
        const result = await analyzeHookClarity(payload);

        if (result.ok === false) {
          setError({ message: result.message, debugId: result.debugId });
          setAnalysis(null);
          return;
        }

        setAnalysis(result.data as Analysis);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to analyze the hook right now.";
        setError({ message });
      }
    });
  };

  const handleAnalyze = () => {
    if (!platform || !tone) {
      setError({ message: "Platform and tone are required." });
      return;
    }

    runAnalysis({
      hook_text: hookText,
      niche: niche || undefined,
      audience: audience || undefined,
      platform,
      tone
    });
  };

  const handleFillExample = () => {
    const tonePool = tone
      ? EXAMPLES.filter((example) => example.tone === tone)
      : EXAMPLES;
    const pool = tonePool.length ? tonePool : EXAMPLES;
    const example = pool[Math.floor(Math.random() * pool.length)];

    setHookText(example.hook_text);
    setNiche(example.niche ?? "");
    setAudience(example.audience ?? "");
    setPlatform(example.platform);
    setTone(example.tone);
    setAnalysis(null);
    setError(null);
    runAnalysis({
      hook_text: example.hook_text,
      niche: example.niche,
      audience: example.audience,
      platform: example.platform,
      tone: example.tone
    });
  };

  const issues = analysis?.issues.filter((issue) => issue.trim().length > 0) ?? [];

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
              onClick={handleFillExample}
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd5f5] px-4 py-1.5 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.813 15.904L9 18l-.813-2.096a4.5 4.5 0 00-2.832-2.832L3 12l2.355-.813a4.5 4.5 0 002.832-2.832L9 6l.813 2.355a4.5 4.5 0 002.832 2.832L15 12l-2.355.813a4.5 4.5 0 00-2.832 2.832z" />
                <path d="M18 7l.375 1.08A2.25 2.25 0 0019.92 9.625L21 10l-1.08.375a2.25 2.25 0 00-1.545 1.545L18 13l-.375-1.08a2.25 2.25 0 00-1.545-1.545L15 10l1.08-.375a2.25 2.25 0 001.545-1.545L18 7z" />
              </svg>
              Try an example
            </button>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="hook-input">
              Hook text (required)
            </label>
            <textarea
              id="hook-input"
              className="mt-3 min-h-[120px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              placeholder="Example: How to write posts that feel calm and still convert"
              value={hookText}
              onChange={(event) => setHookText(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="niche-input">
                Niche (optional)
              </label>
              <input
                id="niche-input"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                placeholder="Example: wellness coaches"
                value={niche}
                onChange={(event) => setNiche(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="audience-input">
                Audience (optional)
              </label>
              <input
                id="audience-input"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                placeholder="Example: new creators"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
              />
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
                <option value="">Select a platform</option>
                {PLATFORM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                <option value="">Select a tone</option>
                {TONE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
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
                  Analyzing...
                </span>
              ) : (
                "Analyze clarity"
              )}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#143226] transition hover:border-[#143226]"
              onClick={() => {
                setHookText("");
                setNiche("");
                setAudience("");
                setPlatform("");
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
            Generating your results...
          </div>
        </ToolResultCard>
      )}

      {analysis && !isPending && (
        <div className="grid gap-6">
          <ToolResultCard title="Clarity score">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreTone}`}>
                Clarity score: {analysis.score}/100
              </span>
              <p className="text-sm text-[#475569]">{analysis.verdict}</p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-[#143226]">Issues</p>
              {issues.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-[#475569]">
                  {issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[#475569]">No issues listed.</p>
              )}
            </div>
          </ToolResultCard>

          <ToolResultCard
            title="Best pick"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.best_pick.rewritten_hook)}
              >
                Copy
              </button>
            }
          >
            <p className="text-base font-semibold text-[#0f172a]">{analysis.best_pick.rewritten_hook}</p>
            <p className="mt-2 text-sm text-[#475569]">Approach: {analysis.best_pick.approach}</p>
            <p className="mt-2 text-sm text-[#475569]">Why: {analysis.best_pick.why}</p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#143226]">Variations</p>
              <div className="mt-2 grid gap-3">
                {analysis.best_pick.variations.map((variation, index) => (
                  <div
                    key={`${variation}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3"
                  >
                    <p className="text-sm text-[#0f172a]">{variation}</p>
                    <button
                      type="button"
                      className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                      onClick={() => handleCopy(variation)}
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ToolResultCard>

          <ToolResultCard title="5 rewrites">
            <div className="grid gap-4">
              {analysis.rewrites.map((rewrite, index) => (
                <div key={`${rewrite.rewritten_hook}-${index}`} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Rewrite {index + 1}</p>
                    <button
                      type="button"
                      className="rounded-full border border-[#cbd5f5] px-4 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                      onClick={() => handleCopy(rewrite.rewritten_hook)}
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-3 text-base font-semibold text-[#0f172a]">{rewrite.rewritten_hook}</p>
                  <p className="mt-2 text-sm text-[#475569]">Approach: {rewrite.approach}</p>
                  <p className="mt-2 text-sm text-[#475569]">Why: {rewrite.why}</p>
                </div>
              ))}
            </div>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
}
