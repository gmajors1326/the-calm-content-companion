"use server";

import {
  type HookClarityInput,
  type HookClarityResult,
  runHookClarityAnalyzer
} from "../../../lib/ai/hookClarityAnalyzer";

export async function analyzeHookClarity(input: HookClarityInput): Promise<HookClarityResult> {
  if (!input.hook_text || input.hook_text.trim().length === 0) {
    throw new Error("Hook text is required.");
  }
  if (!input.platform) {
    throw new Error("Platform is required.");
  }
  if (!input.tone) {
    throw new Error("Tone is required.");
  }

  return runHookClarityAnalyzer({
    hook_text: input.hook_text.trim(),
    niche: input.niche?.trim() || undefined,
    audience: input.audience?.trim() || undefined,
    platform: input.platform,
    tone: input.tone
  });
}
