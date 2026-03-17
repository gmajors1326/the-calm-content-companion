const OpenAI = require('openai');

// Initialize OpenAI using the key from your .env file
if (!process.env.OPENAI_API_KEY) {
    console.warn("WARNING: OPENAI_API_KEY is missing from the environment variables.");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
});

// --- TOOL 1: FIND YOUR HOOK ---
async function generateHook(userIdea, vibe, platform) {
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

[Leave a blank line between options]`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Fast, cheap, and smart
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userIdea }
            ],
            temperature: 0.75,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Hooks):", error);
        throw new Error("Failed to generate hooks.");
    }
}

// 1. FIND YOUR VOICE (The Humanizer - Active Tool)
async function generateVoice(userInput, tone, spice) {
    const prompt = `
    Act as a soulful communication expert and copywriter. I am providing you with rough, messy, or AI-generated text. 
    Rewrite this text using the following user inputs:
    
    Original Text: "${userInput}"
    Niche/Tone: ${tone}
    "Spice" (Relatability/Storytelling Level): ${spice}
    
    STRICT RULES FOR AUTHENTICITY:
    - Use the original user's ideas, stories, and context.
    - DO NOT make up generic advice or clichés.
    - Ensure it is SEO optimized for the specific niche.
    - No JSON, no brackets. NO "guru-speak."
    - Formatting: Single block of warm, readable text.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7, // Balanced authenticity and creativity
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Voice):", error);
        throw new Error("Failed to humanize text.");
    }
}

// --- TOOL 3: CONTENT DIRECTION PLANNER (UPGRADED JSON VERSION) ---
async function generateContentPlan(audienceStruggle, vibe, platform, goal) {
    const prompt = `
    Act as a Professional Content Strategist. Create a 3-post SEO-optimized content plan for the following:
    
    Goal: ${goal}
    Target Audience Struggle: ${audienceStruggle}

    STRICT FORMATTING RULES:
    - NO JSON, NO brackets {}, and NO technical syntax.
    - Use clear headings for Post 1, Post 2, and Post 3.
    - For each post, provide:
        1. A Searchable Title (SEO Optimized)
        2. A Scroll-Stopping Hook
        3. The Core Value/Message
    - Use simple line breaks and dashes for bullet points.
    - Separate each post with a horizontal line like this: ---
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Keeping the updated fast model
            messages: [
                { role: "system", content: "You are an SEO expert. You deliver clean, human-readable text plans. Never use code or JSON formatting." },
                { role: "user", content: prompt }
            ],
            temperature: 0.6,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Content Planner):", error);
        throw new Error("Failed to generate content plan.");
    }
}

// --- TOOL 5: BIO BUILDER ---
async function generateBio(niche, audience, tone) {
    const prompt = `
    Create 3 distinct Instagram bio variations for a ${niche} targeting ${audience}. 
    Tone: ${tone}.

    STRICT FORMATTING RULES:
    - Provide 3 numbered options.
    - Separate each option with a clear line.
    - Use line breaks like a real Instagram bio.
    - NO JSON, no brackets, no curly braces.
    - NO hashtags.
    - Include "Link in bio" or 👇 at the end of each.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Replaced gpt-4-turbo-preview with current model for speed
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Bio Builder):", error);
        throw new Error("Failed to generate bios.");
    }
}

// --- TOOL 4: ENGAGEMENT SIGNAL INTERPRETER ---
async function interpretSignal(postContent, platform) {
    const systemPrompt = `You are an elite Data & Content Analyst for social media creators.
The user had a post that performed unusually well on ${platform}. They will provide a brief description, the hook, or the general concept of that winning post.

Your job is to:
1. Analyze the psychological "Signal" (Why did this resonate so well with their audience? Was it relatable? A harsh truth? Vulnerability?)
2. Provide 3 specific "Spin-Off" content ideas to help them double down on this success without just posting the exact same thing again.

IMPORTANT: You MUST respond in pure JSON format matching exactly this structure:
{
  "analysis": "1-2 punchy sentences explaining the core psychological reason this post popped off. (e.g., 'This worked because it validated a frustration your audience feels but is too afraid to say out loud.')",
  "spinoff1": {
    "angle": "The Deep Dive",
    "hook": "Write a strong hook for this spin-off",
    "concept": "Explain what the post should be about in 1 sentence"
  },
  "spinoff2": {
    "angle": "The Contrarian Pivot",
    "hook": "Write a strong hook for this spin-off",
    "concept": "Explain what the post should be about in 1 sentence"
  },
  "spinoff3": {
    "angle": "The Step-by-Step",
    "hook": "Write a strong hook for this spin-off",
    "concept": "Explain what the post should be about in 1 sentence"
  }
}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Winning Post Concept/Content: ${postContent}\nPlatform: ${platform}` }
            ],
            temperature: 0.75,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Signal Interpreter):", error);
        throw new Error("Failed to interpret signal.");
    }
}

module.exports = {
    generateHook,
    generateVoice,
    humanizeText: generateVoice, // Alias for routes/tools.js
    generateContentPlan,
    planContentDirection: generateContentPlan, // Alias for routes/tools.js
    generateBio,
    interpretSignal
};
