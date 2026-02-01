import { runAIJson } from "./runAIJson";

export type MessagePositioningInput = {
  what_you_do: string;
  who_you_help: string;
  problem_you_solve?: string;
  platform: "IG" | "TikTok" | "YouTube" | "Website";
  tone: "calm" | "direct" | "playful" | "premium";
};

export type MessagePositioningResult = {
  core_positioning: string;
  one_liner: string;
  not_this: string[];
  bio_directions: {
    short: string;
    long: string;
  }[];
  content_angles: string[];
  confidence_note: string;
};

export async function runMessagePositioningBuilder(
  input: MessagePositioningInput
): Promise<MessagePositioningResult> {
  const systemPrompt =
    "You are an expert positioning strategist. Provide crisp, actionable clarity. " +
    "Return ONLY valid JSON matching the contract. No markdown. No extra keys. " +
    "not_this length must be exactly 3. " +
    "bio_directions length must be exactly 3. " +
    "content_angles length must be exactly 3. " +
    "If you cannot provide enough items, use empty strings to fill required fields. " +
    "Always include all required keys with string values.";

  const contractExample = JSON.stringify(
    {
      core_positioning: "",
      one_liner: "",
      not_this: ["", "", ""],
      bio_directions: [
        { short: "", long: "" },
        { short: "", long: "" },
        { short: "", long: "" }
      ],
      content_angles: ["", "", ""],
      confidence_note: ""
    },
    null,
    2
  );

  const userPrompt = [
    `What you do: ${input.what_you_do}`,
    `Who you help: ${input.who_you_help}`,
    input.problem_you_solve ? `Problem you solve: ${input.problem_you_solve}` : "",
    `Tone: ${input.tone}`,
    `Platform: ${input.platform}`,
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
  const corePositioning = raw.core_positioning;
  const oneLiner = raw.one_liner;
  const confidenceNote = raw.confidence_note;

  if (
    typeof corePositioning !== "string" ||
    typeof oneLiner !== "string" ||
    typeof confidenceNote !== "string"
  ) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const notThisRaw = raw.not_this;
  if (!Array.isArray(notThisRaw)) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (notThisRaw.length < 2 || notThisRaw.length > 3) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (notThisRaw.some((item) => typeof item !== "string")) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  const notThis = notThisRaw as string[];

  const bioDirectionsRaw = raw.bio_directions;
  if (!Array.isArray(bioDirectionsRaw)) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (bioDirectionsRaw.length !== 3) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  const parsedBioDirections = bioDirectionsRaw.map((option) => {
    if (!option || typeof option !== "object") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    const value = option as Record<string, unknown>;
    if (typeof value.short !== "string" || typeof value.long !== "string") {
      throw new Error("AI returned an unexpected format. Please try again.");
    }
    return { short: value.short, long: value.long };
  });

  const anglesRaw = raw.content_angles;
  if (!Array.isArray(anglesRaw)) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (anglesRaw.length !== 3) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  if (anglesRaw.some((item) => typeof item !== "string")) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
  const contentAngles = anglesRaw as string[];

  return {
    core_positioning: corePositioning,
    one_liner: oneLiner,
    not_this: notThis,
    bio_directions: parsedBioDirections,
    content_angles: contentAngles,
    confidence_note: confidenceNote
  };
}
