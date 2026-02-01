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
    "best_pick.variations length must be exactly 2. " +
    "If you cannot provide enough items, use empty strings to fill required fields. " +
    "Always include all required keys with string values.";

  const contractExample = JSON.stringify(
    {
      score: 0,
      verdict: "",
      issues: ["", "", ""],
      best_pick: {
        rewritten_hook: "",
        approach: "",
        why: "",
        variations: ["", ""]
      },
      rewrites: [
        { rewritten_hook: "", approach: "", why: "" },
        { rewritten_hook: "", approach: "", why: "" },
        { rewritten_hook: "", approach: "", why: "" },
        { rewritten_hook: "", approach: "", why: "" },
        { rewritten_hook: "", approach: "", why: "" }
      ]
    },
    null,
    2
  );

  const userPrompt = [
    `Hook: ${input.hook_text}`,
    `Platform: ${input.platform}`,
    `Tone: ${input.tone}`,
    input.niche ? `Niche: ${input.niche}` : "",
    input.audience ? `Audience: ${input.audience}` : "",
    "Return JSON exactly in this shape:",
    contractExample
  ]
    .filter(Boolean)
    .join("\n");

  const result = await runAIJson({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.4
  });
  if (!result || typeof result !== "object") {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const raw = result as Record<string, unknown>;
  const verdict = raw.verdict;
  const rawScore = raw.score;

  const scoreValue = typeof rawScore === "string" ? Number(rawScore) : rawScore;
  if (typeof scoreValue !== "number" || Number.isNaN(scoreValue)) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  const score = Math.min(100, Math.max(0, Math.round(scoreValue)));

  if (typeof verdict !== "string") {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const issuesRaw = raw.issues;
  const issues = Array.isArray(issuesRaw)
    ? issuesRaw.filter((issue) => typeof issue === "string").slice(0, 3)
    : [];

  const rewritesRaw = raw.rewrites;
  if (!Array.isArray(rewritesRaw)) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const trimmedRewrites = rewritesRaw.slice(0, 5);
  if (trimmedRewrites.length < 5) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const rewrites = trimmedRewrites.map((rewrite) => {
    if (!rewrite || typeof rewrite !== "object") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    const value = rewrite as Record<string, unknown>;
    if (
      typeof value.rewritten_hook !== "string" ||
      typeof value.approach !== "string" ||
      typeof value.why !== "string"
    ) {
      throw new Error("AI returned an unexpected format. Please try again.");
    }

    return {
      rewritten_hook: value.rewritten_hook,
      approach: value.approach,
      why: value.why
    };
  });

  const bestPickRaw = raw.best_pick;
  if (!bestPickRaw || typeof bestPickRaw !== "object") {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const bestPickValue = bestPickRaw as Record<string, unknown>;
  const variationsRaw = bestPickValue.variations;

  if (
    typeof bestPickValue.rewritten_hook !== "string" ||
    typeof bestPickValue.approach !== "string" ||
    typeof bestPickValue.why !== "string" ||
    !Array.isArray(variationsRaw) ||
    variationsRaw.length !== 2 ||
    variationsRaw.some((variation) => typeof variation !== "string")
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  return {
    score,
    verdict,
    issues,
    best_pick: {
      rewritten_hook: bestPickValue.rewritten_hook,
      approach: bestPickValue.approach,
      why: bestPickValue.why,
      variations: variationsRaw as string[]
    },
    rewrites
  };
}
