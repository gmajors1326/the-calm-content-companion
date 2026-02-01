"use server";

import { runHookClarityAnalyzer } from "@/lib/ai/hookClarityAnalyzer";

type Ok = { ok: true; data: any };
type Fail = { ok: false; message: string; debugId?: string };
export type HookClarityResult = Ok | Fail;

export async function analyzeHookClarity(input: {
  hook_text: string;
  niche?: string;
  audience?: string;
  platform: "IG Reels" | "TikTok" | "YT Shorts";
  tone: "calm" | "direct" | "playful" | "premium";
}): Promise<HookClarityResult> {
  const debugId = `HCA-${Date.now().toString(36)}`;
  try {
    const data = await runHookClarityAnalyzer(input);
    return { ok: true, data };
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";

    console.error(`[HookClarityAnalyzer][${debugId}]`, msg, err?.stack || err);

    if (msg.toLowerCase().includes("openai_api_key") || msg.toLowerCase().includes("missing openai")) {
      return {
        ok: false,
        message: "Tool isn’t connected yet. OPENAI_API_KEY is missing.",
        debugId,
      };
    }

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
      debugId,
    };
  }
}
