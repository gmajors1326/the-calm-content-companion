const OpenAI = require('openai');

// Initialize OpenAI using the key from your .env file
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateHook(userIdea) {
    // This is the "Secret Sauce" instruction set for this specific tool
    const systemPrompt = `You are an expert Instagram content and marketing strategist. 
The user will give you a messy idea. Your job is to turn it into 3 scroll-stopping hooks.

Rules:
- Do not sound like a cringe marketing guru.
- Keep it conversational, relatable, and punchy.
- Focus on the "busy parent" angle (lack of time, wanting peace, etc.).
- Keep them under 2 sentences each.

Format the output clearly as:
Option 1: [Hook]
Option 2: [Hook]
Option 3: [Hook]`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userIdea }
            ],
            temperature: 0.7, // 0.7 gives a good balance of creativity and structure
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error("Failed to generate content from OpenAI.");
    }
}

// Export the function so your routes file can use it
module.exports = {
    generateHook
};
