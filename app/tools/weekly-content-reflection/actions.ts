"use server";

import { runWeeklyContentReflection } from "@/lib/ai/weeklyContentReflection";

type Ok = { ok: true; data: any };
type Fail = { ok: false; message: string; debugId?: string };
export type WeeklyReflectionResult = Ok | Fail;

export async function analyzeWeeklyContentReflection(input: {
  platform: "IG" | "TikTok" | "YouTube";
  how_the_week_felt: "great" | "okay" | "rough";
  energy_level: "low" | "medium" | "high";
  posts_published?: number;
  what_worked?: string;
  what_felt_hard?: string;
  surprises?: string;
  confidence_level?: "low" | "medium" | "high";
}): Promise<WeeklyReflectionResult> {
  const debugId = `WCR-${Date.now().toString(36)}`;
  try {
    const data = await runWeeklyContentReflection({
      platform: input.platform,
      how_the_week_felt: input.how_the_week_felt,
      energy_level: input.energy_level,
      posts_published: input.posts_published,
      what_worked: input.what_worked || "",
      what_felt_hard: input.what_felt_hard || "",
      surprises: input.surprises || "",
      confidence_level: input.confidence_level || ""
    });
    return { ok: true, data };
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";

    console.error(`[WeeklyContentReflection][${debugId}]`, msg, err?.stack || err);

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
