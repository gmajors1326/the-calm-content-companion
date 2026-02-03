import OpenAI from "openai";

type RunAITextArgs = {
  system: string;
  user: string;
  temperature?: number;
};

export async function runAIText({ system, user, temperature = 0.4 }: RunAITextArgs) {
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
    ]
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from AI");
  }

  return content;
}
