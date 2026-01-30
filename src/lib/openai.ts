// Server-side OpenAI client singleton
import { Configuration, OpenAIApi } from 'openai'

let openai: OpenAIApi | null = null

export function getOpenAI() {
  if (!openai) {
    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    openai = new OpenAIApi(config)
  }
  return openai
}

export default getOpenAI
