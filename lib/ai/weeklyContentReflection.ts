import { runAIJson } from "./runAIJson";

export type WeeklyReflectionInput = {
  platform: "IG" | "TikTok" | "YouTube";
  how_the_week_felt: "great" | "okay" | "rough";
  energy_level: "low" | "medium" | "high";
  posts_published?: number;
  what_worked: string;
  what_felt_hard: string;
  surprises: string;
  confidence_level?: string;
};

export type WeeklyReflectionResult = {
  week_summary: string;
  did_well: string[];
  adjustments: string[];
  next_week_focus: string;
  momentum_check: string;
  encouragement: string;
};

export async function runWeeklyContentReflection(
  input: WeeklyReflectionInput
): Promise<WeeklyReflectionResult> {
  const systemPrompt =
    "You are a compassionate reflection guide. " +
    "Return ONLY valid JSON matching the contract. No markdown. No commentary. " +
    "Be grounding and reassuring, never shame the user. " +
    "Normalize imperfect weeks and emphasize progress over performance. " +
    "Match tone to how_the_week_felt and energy_level. " +
    "did_well length must be exactly 3. adjustments length must be exactly 2. " +
    "Always include all required keys with string values.";

  const contractExample = JSON.stringify(
    {
      week_summary: "",
      did_well: ["", "", ""],
      adjustments: ["", ""],
      next_week_focus: "",
      momentum_check: "",
      encouragement: ""
    },
    null,
    2
  );

  const userPrompt = [
    `Platform: ${input.platform}`,
    `How the week felt: ${input.how_the_week_felt}`,
    `Energy level: ${input.energy_level}`,
    input.posts_published !== undefined
      ? `Posts published: ${input.posts_published}`
      : "",
    input.what_worked ? `What worked: ${input.what_worked}` : "",
    input.what_felt_hard ? `What felt hard: ${input.what_felt_hard}` : "",
    input.surprises ? `Surprises: ${input.surprises}` : "",
    input.confidence_level ? `Confidence level: ${input.confidence_level}` : "",
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
  const weekSummary = raw.week_summary;
  const nextWeekFocus = raw.next_week_focus;
  const momentumCheck = raw.momentum_check;
  const encouragement = raw.encouragement;

  if (
    typeof weekSummary !== "string" ||
    typeof nextWeekFocus !== "string" ||
    typeof momentumCheck !== "string" ||
    typeof encouragement !== "string"
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const didWellRaw = raw.did_well;
  if (!Array.isArray(didWellRaw) || didWellRaw.length !== 3) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (didWellRaw.some((item) => typeof item !== "string")) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const adjustmentsRaw = raw.adjustments;
  if (!Array.isArray(adjustmentsRaw) || adjustmentsRaw.length !== 2) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (adjustmentsRaw.some((item) => typeof item !== "string")) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  return {
    week_summary: weekSummary,
    did_well: didWellRaw as string[],
    adjustments: adjustmentsRaw as string[],
    next_week_focus: nextWeekFocus,
    momentum_check: momentumCheck,
    encouragement
  };
}
