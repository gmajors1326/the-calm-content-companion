import { runAIJson } from "./runAIJson";

export type HookClarityInput = {
  hook_text: string;
  niche?: string;
  audience?: string;
  platform: "IG Reels" | "TikTok" | "YT Shorts";
  tone: "calm" | "direct" | "playful" | "premium";
};

export type HookClarityResult = {
  score: number;
  verdict: string;
  issues: string[];
  best_pick: {
    rewritten_hook: string;
    approach: string;
    why: string;
    variations: string[];
  };
  rewrites: {
    rewritten_hook: string;
    approach: string;
    why: string;
  }[];
};

export async function runHookClarityAnalyzer(
  input: HookClarityInput
): Promise<HookClarityResult> {
  const systemPrompt =
    "You are an expert content strategist. Evaluate the clarity of the hook. " +
    "Do not use explicit rules or heuristics; use holistic judgment. " +
    "Return ONLY valid JSON matching the contract. No markdown. No extra keys. " +
    "Score must be an integer from 0 to 100. " +
    "issues array length must be 0 to 3. " +
    "rewrites array length must be exactly 5. " +
    "best_pick.variations length must be exactly 2.";

  const userPrompt = [
    `Hook: ${input.hook_text}`,
    `Platform: ${input.platform}`,
    `Tone: ${input.tone}`,
    input.niche ? `Niche: ${input.niche}` : "",
    input.audience ? `Audience: ${input.audience}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const result = await runAIJson({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.4
  });
  const parsed = result as HookClarityResult;
  const invalid =
    !parsed ||
    typeof parsed !== "object" ||
    typeof parsed.score !== "number" ||
    !Number.isInteger(parsed.score) ||
    parsed.score < 0 ||
    parsed.score > 100 ||
    typeof parsed.verdict !== "string" ||
    !Array.isArray(parsed.issues) ||
    parsed.issues.length > 3 ||
    parsed.issues.some((issue) => typeof issue !== "string") ||
    !Array.isArray(parsed.rewrites) ||
    parsed.rewrites.length !== 5 ||
    parsed.rewrites.some(
      (rewrite) =>
        !rewrite ||
        typeof rewrite !== "object" ||
        typeof rewrite.rewritten_hook !== "string" ||
        typeof rewrite.approach !== "string" ||
        typeof rewrite.why !== "string"
    ) ||
    !parsed.best_pick ||
    typeof parsed.best_pick !== "object" ||
    typeof parsed.best_pick.rewritten_hook !== "string" ||
    typeof parsed.best_pick.approach !== "string" ||
    typeof parsed.best_pick.why !== "string" ||
    !Array.isArray(parsed.best_pick.variations) ||
    parsed.best_pick.variations.length !== 2 ||
    parsed.best_pick.variations.some((variation) => typeof variation !== "string");

  if (invalid) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  return parsed;
}
