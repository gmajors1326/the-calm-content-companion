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
    if (!userIdea || userIdea.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your idea so we can create a strong hook. ✨");
    }
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
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please provide at least 10 characters for the text you'd like to humanize. ✨");
    }
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
async function generateContentPlan(audienceStruggle, vibe, platform, goal, tier = 'Free') {
    const hasPremiumFeatures = tier === 'Pro' || tier === 'Elite';
    
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
        ${hasPremiumFeatures ? '4. High-Value SEO Keywords (Secondary and LSI)' : ''}
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

// --- TOOL 6: THE MULTIPLIER ---
async function multiplyContent(userInput) {
    // 1. Validation to prevent hallucinations and save API credits
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please provide a bit more detail (at least 10 characters) so the Multiplier can find your core truth. ✨");
    }

    const systemPrompt = `You are the engine for "The Multiplier," a high-leverage content strategy tool. 
Your goal is to take a single content idea and multiply its value across different angles and platforms.

RULES:
- Be blunt and high-signal. No fluff.
- Do not use hashtags.
- Focus on the "So What?" factor—why does this matter to a stranger?
- Use a sophisticated, "Calm" tone—minimalist but powerful.
- Return the response strictly in JSON format with keys: core_truth, stress_test, angles, and remix_recipes.`;

    const userPrompt = `I have a content idea or draft I need you to process through "The Multiplier."

USER CONTENT: 
"${userInput}"

Please provide the following in the JSON response (ALL values must be single strings):
1. core_truth: The single most powerful "Aha!" moment in one punchy sentence.
2. stress_test: Evaluate this content's value. Why would a stranger care at 11:00 PM? If weak, provide a "Value Pivot".
3. angles: Rewrite into three styles:
    - tactical: A "How-to" or step-by-step breakdown string.
    - emotional: A "why/human connection" rewrite string.
    - contrarian: A "Hot Take" rewrite string.
4. remix_recipes:
    - instagram_post: A soulful Instagram caption string (Hook, Value Body, soft CTA).
    - visual_carousel: A single string containing a 5-slide outline (Headlines only, EXPLICITLY separated by \\n for easy parsing).
    - short_form_video: A single script string (Hook, Retention Point, Call to Action).`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (The Multiplier):", error);
        throw new Error("Failed to multiply content.");
    }
}

// --- TOOL 7: THE PATTERN INTERRUPT ---
async function generatePatternInterrupt(topic) {
    if (!topic || topic.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your topic so we can create a pattern interrupt. ✨");
    }
    const systemPrompt = `You are a high-performance Instagram Growth Strategist specializing in the 2026 "Share-First" algorithm. 
Your mission is to transform a standard content idea into a "Pattern Interrupt" that stops the scroll and forces a "Send" (DM).

CRITICAL CONSTRAINTS:
1. NO HASHTAGS: Use SEO-rich keywords within the hook instead.
2. NO AI-GLOSS: Avoid generic corporate speak. Use raw, human, and direct language.
3. FOCUS ON "THE SEND": Every hook must promise a high-utility takeaway that makes the user want to share it with a friend immediately.
4. Use a sophisticated, "Calm" tone—minimalist but powerful.
5. Return the response strictly in JSON format.`;

    const userPrompt = `Generate 3 distinct Hook Categories for the topic: "${topic}"

Provide the output in JSON with this structure:
{
  "pattern_interrupt": {
    "title": "The Disruptor",
    "hook": "Contrarian statement or command",
    "retention_point": "1-sentence debunking/insight"
  },
  "high_utility": {
    "title": "The Resource",
    "hook": "Steal my process/vault framing",
    "retention_point": "1-sentence promise of value"
  },
  "relatable_struggle": {
    "title": "The Real Talk",
    "hook": "POV or fail-to-win framing",
    "retention_point": "1-sentence emotional tension/pivot"
  }
}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.8,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Pattern Interrupt):", error);
        throw new Error("Failed to generate pattern interrupt hooks.");
    }
}

// --- TOOL 8: IMAGE GENERATION (ELITE ONLY) ---
async function generateImage(prompt, size = "1024x1024") {
    const systemPrompt = `You are an aesthetic visual prompt engineer for the "Calm Content Companion." 
The user wants an image for their Instagram (Reels, Carousel, or Stories). 
Your goal is to take their simple idea and turn it into a high-end, aesthetic, calm, and soulful DALL-E 3 prompt.

RULES:
- Focus on natural light, soft textures, and earthy tones.
- Avoid cluttered or messy backgrounds.
- Include specific details about lighting (e.g., "golden hour," "soft morning light") and composition.
- The style should be "Professional Photography" or "Minimalist Digital Art," depending on the user's vibe.
- No text in the image.`;

    try {
        // First, let's use GPT to "calm-ify" the user's prompt
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Transform this into a calm, aesthetic image prompt: "${prompt}"` }
            ],
            temperature: 0.7,
        });

        const enhancedPrompt = gptResponse.choices[0].message.content;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: size,
            quality: "standard",
        });

        return {
            url: response.data[0].url,
            revised_prompt: enhancedPrompt
        };
    } catch (error) {
        console.error("OpenAI API Error (Image Generation):", error);
        throw new Error("Failed to generate image.");
    }
}

module.exports = {
    generateHook,
    generateVoice,
    humanizeText: generateVoice, // Alias for routes/tools.js
    generateContentPlan,
    planContentDirection: generateContentPlan, // Alias for routes/tools.js
    generateBio,
    interpretSignal,
    multiplyContent,
    generatePatternInterrupt,
    generateImage
};
