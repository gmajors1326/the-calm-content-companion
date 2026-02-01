import { runAIJson } from "./runAIJson";

export type ContentDirectionInput = {
  niche?: string;
  main_goal: "grow audience" | "build trust" | "sell softly" | "stay consistent";
  energy_level: "low" | "medium" | "high";
  platform: "IG Reels" | "TikTok" | "YouTube Shorts";
  posting_days: "1–2 days" | "3–4 days" | "5+ days";
  tone: "calm" | "direct" | "playful" | "premium";
};

export type ContentDirectionResult = {
  weekly_direction: string;
  posting_rhythm: {
    posts: number;
    note: string;
  };
  ideas: {
    title: string;
    format: string;
    effort: "low" | "medium";
  }[];
  one_post_fallback: string;
  encouragement: string;
};

export async function runContentDirectionPlanner(
  input: ContentDirectionInput
): Promise<ContentDirectionResult> {
  const systemPrompt =
    "You are a calm, practical content strategist. Provide a gentle weekly plan. " +
    "Return ONLY valid JSON matching the contract. No markdown. No extra keys. " +
    "Respect energy_level: LOW means fewer posts, simpler formats, reassurance; " +
    "MEDIUM is balanced; HIGH can include more ideas but keep the tone calm. " +
    "Avoid hustle language. Never guilt the user. Normalize rest as part of the plan. " +
    "ideas length must be exactly 5. " +
    "effort must be low or medium. " +
    "Always include all required keys with string values.";

  const contractExample = JSON.stringify(
    {
      weekly_direction: "",
      posting_rhythm: {
        posts: 0,
        note: ""
      },
      ideas: [
        { title: "", format: "", effort: "low" },
        { title: "", format: "", effort: "low" },
        { title: "", format: "", effort: "low" },
        { title: "", format: "", effort: "medium" },
        { title: "", format: "", effort: "medium" }
      ],
      one_post_fallback: "",
      encouragement: ""
    },
    null,
    2
  );

  const userPrompt = [
    input.niche ? `Niche: ${input.niche}` : "",
    `Main goal: ${input.main_goal}`,
    `Energy level: ${input.energy_level}`,
    `Platform: ${input.platform}`,
    `Posting days: ${input.posting_days}`,
    `Tone: ${input.tone}`,
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
  const weeklyDirection = raw.weekly_direction;
  const postingRhythm = raw.posting_rhythm;
  const onePostFallback = raw.one_post_fallback;
  const encouragement = raw.encouragement;

  if (
    typeof weeklyDirection !== "string" ||
    typeof onePostFallback !== "string" ||
    typeof encouragement !== "string" ||
    !postingRhythm ||
    typeof postingRhythm !== "object"
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const rhythmValue = postingRhythm as Record<string, unknown>;
  const postsValue = rhythmValue.posts;
  const noteValue = rhythmValue.note;

  const postsNumber = typeof postsValue === "string" ? Number(postsValue) : postsValue;
  if (
    typeof postsNumber !== "number" ||
    Number.isNaN(postsNumber) ||
    postsNumber < 1 ||
    typeof noteValue !== "string"
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const ideasRaw = raw.ideas;
  if (!Array.isArray(ideasRaw) || ideasRaw.length !== 5) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const ideas = ideasRaw.map((idea) => {
    if (!idea || typeof idea !== "object") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    const value = idea as Record<string, unknown>;
    if (
      typeof value.title !== "string" ||
      typeof value.format !== "string" ||
      (value.effort !== "low" && value.effort !== "medium")
    ) {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    return {
      title: value.title,
      format: value.format,
      effort: value.effort as "low" | "medium"
    };
  });

  return {
    weekly_direction: weeklyDirection,
    posting_rhythm: {
      posts: Math.max(0, Math.round(postsNumber)),
      note: noteValue
    },
    ideas,
    one_post_fallback: onePostFallback,
    encouragement
  };
}
