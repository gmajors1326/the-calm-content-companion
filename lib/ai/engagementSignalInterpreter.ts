import { runAIJson } from "./runAIJson";

export type EngagementSignalInput = {
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
};

export type EngagementSignalResult = {
  overall_read: string;
  signals: {
    signal_name: string;
    what_it_means: string;
    confidence: "low" | "medium" | "high";
  }[];
  next_actions: {
    action: string;
    why: string;
    effort: "low" | "medium";
  }[];
  avoid: string[];
  simple_experiment: string;
  encouragement: string;
};

export async function runEngagementSignalInterpreter(
  input: EngagementSignalInput
): Promise<EngagementSignalResult> {
  const systemPrompt =
    "You are a calm, direct analyst of engagement signals. " +
    "Return ONLY valid JSON matching the contract. No markdown. No extra keys. " +
    "Be calm, direct, not salesy. Interpret metrics as signals, not vanity. " +
    "If metrics are missing, infer cautiously and set confidence to low more often. " +
    "Keep next_actions extremely doable and match energy_level. " +
    "Never recommend hustle language or posting 3x/day. " +
    "Avoid list should prevent panic moves. " +
    "Use platform norms: IG saves/shares/profile visits show intent; TikTok watch time and shares matter; YouTube Shorts retention and viewers-to-subs signal packaging. " +
    "signals length must be 3 to 5. next_actions length must be exactly 3. avoid length must be exactly 2. " +
    "confidence must be low|medium|high. effort must be low|medium.";

  const contractExample = JSON.stringify(
    {
      overall_read: "",
      signals: [
        { signal_name: "", what_it_means: "", confidence: "low" },
        { signal_name: "", what_it_means: "", confidence: "medium" },
        { signal_name: "", what_it_means: "", confidence: "high" }
      ],
      next_actions: [
        { action: "", why: "", effort: "low" },
        { action: "", why: "", effort: "low" },
        { action: "", why: "", effort: "medium" }
      ],
      avoid: ["", ""],
      simple_experiment: "",
      encouragement: ""
    },
    null,
    2
  );

  const metrics = [
    `Views: ${input.views ?? "not provided"}`,
    `Avg watch time seconds: ${input.avg_watch_time_seconds ?? "not provided"}`,
    `Retention percent: ${input.retention_percent ?? "not provided"}`,
    `Likes: ${input.likes ?? "not provided"}`,
    `Comments: ${input.comments ?? "not provided"}`,
    `Shares: ${input.shares ?? "not provided"}`,
    `Saves: ${input.saves ?? "not provided"}`,
    `Profile visits: ${input.profile_visits ?? "not provided"}`,
    `Follows from post: ${input.follows_from_post ?? "not provided"}`
  ];

  const context = [
    input.post_topic ? `Post topic: ${input.post_topic}` : "",
    input.audience_fit ? `Audience fit: ${input.audience_fit}` : "",
    input.energy_level ? `Energy level: ${input.energy_level}` : "",
    input.notes ? `Notes: ${input.notes}` : ""
  ];

  const userPrompt = [
    `Platform: ${input.platform}`,
    `Content type: ${input.content_type}`,
    `Goal: ${input.goal}`,
    ...metrics,
    ...context,
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
  const overallRead = raw.overall_read;
  const simpleExperiment = raw.simple_experiment;
  const encouragement = raw.encouragement;

  if (
    typeof overallRead !== "string" ||
    typeof simpleExperiment !== "string" ||
    typeof encouragement !== "string"
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const signalsRaw = raw.signals;
  if (!Array.isArray(signalsRaw) || signalsRaw.length < 3 || signalsRaw.length > 5) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const signals = signalsRaw.map((signal) => {
    if (!signal || typeof signal !== "object") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    const value = signal as Record<string, unknown>;
    if (
      typeof value.signal_name !== "string" ||
      typeof value.what_it_means !== "string" ||
      (value.confidence !== "low" && value.confidence !== "medium" && value.confidence !== "high")
    ) {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    return {
      signal_name: value.signal_name,
      what_it_means: value.what_it_means,
      confidence: value.confidence as "low" | "medium" | "high"
    };
  });

  const actionsRaw = raw.next_actions;
  if (!Array.isArray(actionsRaw) || actionsRaw.length !== 3) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const nextActions = actionsRaw.map((action) => {
    if (!action || typeof action !== "object") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    const value = action as Record<string, unknown>;
    if (
      typeof value.action !== "string" ||
      typeof value.why !== "string" ||
      (value.effort !== "low" && value.effort !== "medium")
    ) {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    return {
      action: value.action,
      why: value.why,
      effort: value.effort as "low" | "medium"
    };
  });

  const avoidRaw = raw.avoid;
  if (!Array.isArray(avoidRaw) || avoidRaw.length !== 2) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (avoidRaw.some((item) => typeof item !== "string")) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  return {
    overall_read: overallRead,
    signals,
    next_actions: nextActions,
    avoid: avoidRaw as string[],
    simple_experiment: simpleExperiment,
    encouragement
  };
}
