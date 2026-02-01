"use client";

import { useRef, useState, useTransition } from "react";
import { analyzeEngagementSignals } from "./actions";
import ToolError from "../../../components/tool/ToolError";
import ToolResultCard from "../../../components/tool/ToolResultCard";

type Signal = {
  signal_name: string;
  what_it_means: string;
  confidence: "low" | "medium" | "high";
};

type NextAction = {
  action: string;
  why: string;
  effort: "low" | "medium";
};

type Analysis = {
  overall_read: string;
  signals: Signal[];
  next_actions: NextAction[];
  avoid: string[];
  simple_experiment: string;
  encouragement: string;
};

const PLATFORM_OPTIONS = ["IG Reels", "TikTok", "YouTube Shorts"] as const;
const CONTENT_OPTIONS = ["Reel/Short", "Carousel", "Static Post", "Story"] as const;
const GOAL_OPTIONS = ["grow audience", "build trust", "sell softly", "stay consistent"] as const;
const AUDIENCE_OPTIONS = ["right audience", "mixed", "not sure"] as const;
const ENERGY_OPTIONS = ["low", "medium", "high"] as const;

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

export default function EngagementSignalInterpreterClient() {
  const [platform, setPlatform] = useState<(typeof PLATFORM_OPTIONS)[number] | "">("");
  const [contentType, setContentType] = useState<(typeof CONTENT_OPTIONS)[number] | "">("");
  const [goal, setGoal] = useState<(typeof GOAL_OPTIONS)[number] | "">("");

  const [views, setViews] = useState("");
  const [avgWatchTimeSeconds, setAvgWatchTimeSeconds] = useState("");
  const [retentionPercent, setRetentionPercent] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");
  const [profileVisits, setProfileVisits] = useState("");
  const [followsFromPost, setFollowsFromPost] = useState("");

  const [postTopic, setPostTopic] = useState("");
  const [audienceFit, setAudienceFit] = useState<(typeof AUDIENCE_OPTIONS)[number] | "">("");
  const [energyLevel, setEnergyLevel] = useState<(typeof ENERGY_OPTIONS)[number] | "">("");
  const [notes, setNotes] = useState("");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<{ message: string; debugId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const viewsRef = useRef<HTMLInputElement | null>(null);

  const canAnalyze = platform && contentType && goal && !isPending;

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
    content_type: (typeof CONTENT_OPTIONS)[number];
    goal: (typeof GOAL_OPTIONS)[number];
    views?: number;
    avg_watch_time_seconds?: number;
    retention_percent?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    profile_visits?: number;
    follows_from_post?: number;
    post_topic?: string;
    audience_fit?: (typeof AUDIENCE_OPTIONS)[number];
    energy_level?: (typeof ENERGY_OPTIONS)[number];
    notes?: string;
  }) => {
    setError(null);
    setAnalysis(null);

    startTransition(async () => {
      try {
        const result = await analyzeEngagementSignals(payload);

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
    if (!platform || !contentType || !goal) {
      setError({ message: "Please complete the required fields." });
      return;
    }

    runAnalysis({
      platform,
      content_type: contentType,
      goal,
      views: parseNumber(views),
      avg_watch_time_seconds: parseNumber(avgWatchTimeSeconds),
      retention_percent: parseNumber(retentionPercent),
      likes: parseNumber(likes),
      comments: parseNumber(comments),
      shares: parseNumber(shares),
      saves: parseNumber(saves),
      profile_visits: parseNumber(profileVisits),
      follows_from_post: parseNumber(followsFromPost),
      post_topic: postTopic || undefined,
      audience_fit: audienceFit || undefined,
      energy_level: energyLevel || undefined,
      notes: notes || undefined
    });
  };

  const handleExample = () => {
    setPlatform("IG Reels");
    setContentType("Reel/Short");
    setGoal("grow audience");
    setViews("3200");
    setAvgWatchTimeSeconds("4.8");
    setRetentionPercent("42");
    setLikes("78");
    setComments("6");
    setShares("9");
    setSaves("34");
    setProfileVisits("22");
    setFollowsFromPost("4");
    setPostTopic("content planning for low-energy weeks");
    setAudienceFit("right audience");
    setEnergyLevel("low");
    setNotes("Posted at night. Hook was simple. I’m trying to stay consistent.");
    setAnalysis(null);
    setError(null);

    requestAnimationFrame(() => {
      viewsRef.current?.focus();
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
              <label className="text-sm font-semibold text-[#143226]" htmlFor="content-select">
                Content type (required)
              </label>
              <select
                id="content-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={contentType}
                onChange={(event) => setContentType(event.target.value as (typeof CONTENT_OPTIONS)[number])}
                required
              >
                <option value="">Select type</option>
                {CONTENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="goal-select">
                Goal (required)
              </label>
              <select
                id="goal-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={goal}
                onChange={(event) => setGoal(event.target.value as (typeof GOAL_OPTIONS)[number])}
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
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="views-input">
                Views
              </label>
              <input
                ref={viewsRef}
                id="views-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={views}
                onChange={(event) => setViews(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="watch-input">
                Avg watch time (sec)
              </label>
              <input
                id="watch-input"
                type="number"
                step="0.1"
                inputMode="decimal"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={avgWatchTimeSeconds}
                onChange={(event) => setAvgWatchTimeSeconds(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="retention-input">
                Retention (%)
              </label>
              <input
                id="retention-input"
                type="number"
                step="0.1"
                inputMode="decimal"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={retentionPercent}
                onChange={(event) => setRetentionPercent(event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="likes-input">
                Likes
              </label>
              <input
                id="likes-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={likes}
                onChange={(event) => setLikes(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="comments-input">
                Comments
              </label>
              <input
                id="comments-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="shares-input">
                Shares
              </label>
              <input
                id="shares-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={shares}
                onChange={(event) => setShares(event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="saves-input">
                Saves
              </label>
              <input
                id="saves-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={saves}
                onChange={(event) => setSaves(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="profile-input">
                Profile visits
              </label>
              <input
                id="profile-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={profileVisits}
                onChange={(event) => setProfileVisits(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="follows-input">
                Follows from post
              </label>
              <input
                id="follows-input"
                type="number"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={followsFromPost}
                onChange={(event) => setFollowsFromPost(event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="topic-input">
                Post topic
              </label>
              <input
                id="topic-input"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={postTopic}
                onChange={(event) => setPostTopic(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="audience-select">
                Audience fit
              </label>
              <select
                id="audience-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={audienceFit}
                onChange={(event) => setAudienceFit(event.target.value as (typeof AUDIENCE_OPTIONS)[number])}
              >
                <option value="">Select fit</option>
                {AUDIENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#143226]" htmlFor="energy-select">
                Energy level
              </label>
              <select
                id="energy-select"
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
                value={energyLevel}
                onChange={(event) => setEnergyLevel(event.target.value as (typeof ENERGY_OPTIONS)[number])}
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

          <div>
            <label className="text-sm font-semibold text-[#143226]" htmlFor="notes-input">
              Notes
            </label>
            <textarea
              id="notes-input"
              className="mt-3 min-h-[110px] w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] focus:border-[#143226] focus:outline-none"
              placeholder="Anything about the post? first time posting? new niche? etc."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
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
                  Interpreting...
                </span>
              ) : (
                "Interpret signals"
              )}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#cbd5f5] px-5 py-2 text-sm font-semibold text-[#143226] transition hover:border-[#143226]"
              onClick={() => {
                setPlatform("");
                setContentType("");
                setGoal("");
                setViews("");
                setAvgWatchTimeSeconds("");
                setRetentionPercent("");
                setLikes("");
                setComments("");
                setShares("");
                setSaves("");
                setProfileVisits("");
                setFollowsFromPost("");
                setPostTopic("");
                setAudienceFit("");
                setEnergyLevel("");
                setNotes("");
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
            Reading your signals...
          </div>
        </ToolResultCard>
      )}

      {analysis && !isPending && (
        <div className="grid gap-6">
          <ToolResultCard title="Overall read">
            <p className="text-sm text-[#475569]">{analysis.overall_read}</p>
          </ToolResultCard>

          <ToolResultCard title="Signal breakdown">
            <div className="grid gap-4">
              {analysis.signals.map((signal, index) => (
                <div key={`${signal.signal_name}-${index}`} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold text-[#0f172a]">{signal.signal_name}</p>
                    <span className="rounded-full bg-[#f8fafc] px-2.5 py-1 text-xs font-semibold text-[#475569]">
                      {signal.confidence}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#475569]">{signal.what_it_means}</p>
                </div>
              ))}
            </div>
          </ToolResultCard>

          <ToolResultCard title="What to do next">
            <div className="grid gap-4">
              {analysis.next_actions.map((item, index) => (
                <div key={`${item.action}-${index}`} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f172a]">{item.action}</p>
                    <button
                      type="button"
                      className="rounded-full border border-[#cbd5f5] px-3 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                      onClick={() => handleCopy(item.action)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#f1f5f0] px-2.5 py-1 text-xs font-semibold text-[#2f5d46]">
                      {item.effort} effort
                    </span>
                    <p className="text-sm text-[#475569]">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </ToolResultCard>

          <ToolResultCard title="Do not do">
            <ul className="list-disc pl-5 text-sm text-[#475569]">
              {analysis.avoid.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </ToolResultCard>

          <ToolResultCard
            title="Simple experiment"
            action={
              <button
                type="button"
                className="rounded-full border border-[#cbd5f5] px-3 py-1 text-xs font-semibold text-[#143226] transition hover:border-[#143226]"
                onClick={() => handleCopy(analysis.simple_experiment)}
              >
                Copy
              </button>
            }
          >
            <p className="text-sm text-[#475569]">{analysis.simple_experiment}</p>
          </ToolResultCard>

          <ToolResultCard title="Encouragement">
            <p className="text-sm text-[#475569]">{analysis.encouragement}</p>
          </ToolResultCard>
        </div>
      )}
    </div>
  );
}
