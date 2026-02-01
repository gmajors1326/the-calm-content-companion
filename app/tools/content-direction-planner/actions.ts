"use server";

import { runContentDirectionPlanner } from "@/lib/ai/contentDirectionPlanner";

type Ok = { ok: true; data: any };
type Fail = { ok: false; message: string; debugId?: string };
export type ContentDirectionResult = Ok | Fail;

export async function analyzeContentDirection(input: {
  niche?: string;
  main_goal: "grow audience" | "build trust" | "sell softly" | "stay consistent";
  energy_level: "low" | "medium" | "high";
  platform: "IG Reels" | "TikTok" | "YouTube Shorts";
  posting_days: "1–2 days" | "3–4 days" | "5+ days";
  tone: "calm" | "direct" | "playful" | "premium";
}): Promise<ContentDirectionResult> {
  const debugId = `CDP-${Date.now().toString(36)}`;
  try {
    const data = await runContentDirectionPlanner({
      niche: input.niche || "",
      main_goal: input.main_goal,
      energy_level: input.energy_level,
      platform: input.platform,
      posting_days: input.posting_days,
      tone: input.tone
    });
    return { ok: true, data };
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";

    console.error(`[ContentDirectionPlanner][${debugId}]`, msg, err?.stack || err);

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
