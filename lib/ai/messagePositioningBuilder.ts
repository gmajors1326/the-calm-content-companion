import { runAIText } from "./runAIText";

export type MessagePositioningInput = {
  what_you_do: string;
  who_you_help: string;
  problem_you_solve?: string;
};

export type MessagePositioningResult = {
  main_message: string;
  supporting_ideas: string[];
  reassurance: string;
};

export async function runMessagePositioningBuilder(
  input: MessagePositioningInput
): Promise<MessagePositioningResult> {
  const systemPrompt = `You are the “Your Main Instagram Message” tool inside The Calm Content Companion.

Your role is to help the user clearly understand what their Instagram account is about, using calm, plain language.

This tool is designed for adults (primarily ages 45–65) who want clarity and consistency on Instagram — not branding jargon, optimization tactics, or growth hacks.

STRICT OUTPUT FORMAT (NON-NEGOTIABLE):

You must return exactly three sections, in this order:

MAIN MESSAGE
One clear, calm sentence describing the main message the user’s Instagram posts should return to.

SUPPORTING IDEAS
Exactly two short supporting ideas that naturally connect to the main message and feel easy to post about.

REASSURANCE
One gentle reassurance sentence that helps the user trust their direction.

Do not add additional sections.
Do not include explanations or commentary.
Do not include examples unless they directly reflect the user’s input.

---

TONE RULES:

- Calm
- Clear
- Human
- Non-salesy
- Non-performative
- Supportive

Avoid:
- Marketing jargon
- Branding language
- Optimization talk
- “You should” statements
- Urgency or pressure
- Calls to action

This tool is about clarity, not motivation.

---

CONTENT RULES:

- The Main Message must be one sentence only.
- Supporting ideas must be short and written in plain language.
- No emojis.
- No hashtags.
- No hype.
- No clever hooks.
- No niche forcing.

If a niche is provided, adapt gently.
If no niche is provided, keep the output broadly relatable.

If the response feels like a caption, a strategy lesson, or a sales pitch, regenerate.

---

USER EXPERIENCE GOAL:

The user should finish feeling settled and clear — not energized, rushed, or overwhelmed.

End with reassurance, not instruction.

Return only the formatted output.

🧘 FINAL POSITIONING NOTE (FOR YOU, NOT USERS)

This tool should feel like:

“Oh… okay. That’s what I’m doing.”

Not:

“Now I need to do something with this.”

That’s why the CTA is Clarify my message, not Build, Create, or Optimize.

You’ve designed this with real emotional intelligence.
That’s why it works.`;

  const userPrompt = [
    `What you do: ${input.what_you_do}`,
    input.who_you_help ? `Who you help: ${input.who_you_help}` : "",
    input.problem_you_solve ? `Problem you solve: ${input.problem_you_solve}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const result = await runAIText({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.4
  });

  return parseMainMessage(result);
}

function parseMainMessage(text: string): MessagePositioningResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let current: "main" | "supporting" | "reassurance" | null = null;
  const mainLines: string[] = [];
  const supportingLines: string[] = [];
  const reassuranceLines: string[] = [];

  for (const line of lines) {
    const upper = line.toUpperCase();
    if (upper === "MAIN MESSAGE") {
      current = "main";
      continue;
    }
    if (upper === "SUPPORTING IDEAS") {
      current = "supporting";
      continue;
    }
    if (upper === "REASSURANCE") {
      current = "reassurance";
      continue;
    }
    if (!current) continue;
    if (current === "main") mainLines.push(line);
    if (current === "supporting") supportingLines.push(line);
    if (current === "reassurance") reassuranceLines.push(line);
  }

  const mainMessage = normalizeSentence(mainLines.join(" "));
  const reassurance = normalizeSentence(reassuranceLines.join(" "));
  const supportingIdeas = normalizeSupportingIdeas(supportingLines);

  if (!mainMessage || !reassurance || supportingIdeas.length < 2) {
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  return {
    main_message: mainMessage,
    supporting_ideas: supportingIdeas.slice(0, 2),
    reassurance
  };
}

function normalizeSentence(value: string) {
  return value.replace(/^[-•\d\.)\s]+/, "").replace(/\s+/g, " ").trim();
}

function normalizeSupportingIdeas(lines: string[]) {
  const cleaned = lines
    .map((line) => line.replace(/^[-•\d\.)\s]+/, "").trim())
    .filter(Boolean);

  if (cleaned.length === 1) {
    const split = cleaned[0]
      .split(/\s*[·;|/]\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (split.length >= 2) {
      return split;
    }
  }

  return cleaned;
}
