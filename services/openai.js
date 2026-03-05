const OpenAI = require('openai');

// Initialize OpenAI using the key from your .env file
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateHook(userIdea, vibe, platform) {
    // THE UPGRADED SECRET SAUCE PROMPT
    const systemPrompt = `You are an expert ${platform} content strategist for calm, authentic creators. 
The user will give you a messy idea. Your job is to turn it into 3 scroll-stopping hooks.

You MUST use the "${vibe}" framework for these hooks:
- If Agitator: Poke at a pain point before offering the solution gently.
- If Contrarian: State an unpopular opinion that stops the scroll.
- If Storyteller: Start in the middle of a personal, relatable story ("I used to... until...").
- If Statistic/Shock: Lead with a surprising fact or harsh truth.

Rules:
- Do NOT sound like a loud, hype-bro marketing guru. Keep it calm, relatable, premium, and authentic.
- Keep the hooks under 2 sentences each.
- Assign a realistic "Virality Score" (out of 100) based on how strong the psychological trigger is.
- Suggest a B-Roll visual idea that perfectly matches the "Calm Content" aesthetic (e.g., pouring coffee, soft natural light, typing on a laptop, walking in nature).

Format the output EXACTLY like this for each of the 3 options:

Option 1
🔥 Virality Score: [Score]/100
🎣 The Hook: [Hook text here]
💡 Why it works: [1 short sentence explaining the psychology]
🎬 Suggested Visual: [1 short sentence describing an aesthetic, calm b-roll shot to play on screen]

[Leave a blank line between options]
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Fast, cheap, and smart
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userIdea }
            ],
            temperature: 0.75, // Just enough creativity
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error("Failed to generate content from OpenAI.");
    }
}

module.exports = {
    generateHook
};
