"use server";

import { runMessagePositioningBuilder } from "@/lib/ai/messagePositioningBuilder";

type Ok = { ok: true; data: any };
type Fail = { ok: false; message: string; debugId?: string };
export type MessagePositioningResult = Ok | Fail;

export async function analyzeMessagePositioning(input: {
  what_you_do: string;
  who_you_help?: string;
  problem_you_solve?: string;
}): Promise<MessagePositioningResult> {
  const debugId = `MPB-${Date.now().toString(36)}`;
  try {
    const data = await runMessagePositioningBuilder({
      what_you_do: input.what_you_do,
      who_you_help: input.who_you_help || "",
      problem_you_solve: input.problem_you_solve || ""
    });
    return { ok: true, data };
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";

    console.error(`[MessagePositioningBuilder][${debugId}]`, msg, err?.stack || err);

    if (msg.toLowerCase().includes("openai_api_key") || msg.toLowerCase().includes("missing openai")) {
      return {
        ok: false,
        message: "Tool isn’t connected yet. OPENAI_API_KEY is missing.",
        debugId
      };
    }

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
      debugId
    };
  }
}
