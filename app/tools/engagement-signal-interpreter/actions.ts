"use server";

import { runEngagementSignalInterpreter } from "@/lib/ai/engagementSignalInterpreter";

type Ok = { ok: true; data: any };
type Fail = { ok: false; message: string; debugId?: string };
export type EngagementSignalResult = Ok | Fail;

export async function analyzeEngagementSignals(input: {
  platform: "IG Reels" | "TikTok" | "YouTube Shorts";
  content_type: "Reel/Short" | "Carousel" | "Static Post" | "Story";
  goal: "grow audience" | "build trust" | "sell softly" | "stay consistent";
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
  audience_fit?: "right audience" | "mixed" | "not sure";
  energy_level?: "low" | "medium" | "high";
  notes?: string;
}): Promise<EngagementSignalResult> {
  const debugId = `ESI-${Date.now().toString(36)}`;
  try {
    const data = await runEngagementSignalInterpreter(input);
    return { ok: true, data };
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";

    console.error(`[EngagementSignalInterpreter][${debugId}]`, msg, err?.stack || err);

    if (msg.toLowerCase().includes("openai_api_key") || msg.toLowerCase().includes("missing openai")) {
      return {
        ok: false,
        message: "Tool isn’t connected yet. OPENAI_API_KEY is missing.",
        debugId
      };
    }

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
      debugId
    };
  }
}
