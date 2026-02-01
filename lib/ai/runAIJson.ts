import OpenAI from "openai";

type RunAIJsonArgs = {
  system: string;
  user: string;
  temperature?: number;
};

export async function runAIJson({
  system,
  user,
  temperature = 0.4
}: RunAIJsonArgs) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.chat.completions.create({
    model: "gpt-5.2",
    temperature,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from AI");
  }

  const parseJson = (text: string) => {
    try {
      return JSON.parse(text);
    } catch {
      const extracted = extractFirstJsonObject(text);
      if (extracted) {
        return JSON.parse(extracted);
      }
      throw new Error("AI returned invalid JSON");
    }
  };

  return parseJson(content);
}

function extractFirstJsonObject(text: string) {
  const start = text.indexOf("{");
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i += 1) {
    const char = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return null;
}
