// Server-side OpenAI client singleton
let openai: any = null

export function getOpenAI() {
  if (!openai) {
    // Dynamic require to avoid server/client bundling issues
    const { Configuration, OpenAIApi } = require('openai')
    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    openai = new OpenAIApi(config)
  }
  return openai
}

export default getOpenAI
