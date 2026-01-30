// src/lib/openai.ts
// Dependency 'openai' was removed per user request. Functionality is stubbed.

export function getOpenAI() {
  return {
    // Placeholder for the original OpenAIApi instance methods
    // NOTE: This is a stub. Replace with actual implementation or re-add 'openai' dependency.
    createChatCompletion: async (options: any) => { 
      throw new Error('OpenAI API access is disabled: "openai" package removed from dependencies.')
    }
  }
}

export default getOpenAI
