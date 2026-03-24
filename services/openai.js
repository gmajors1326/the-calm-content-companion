const OpenAI = require('openai');

// Initialize OpenAI using the key from your .env file
if (!process.env.OPENAI_API_KEY) {
    console.warn("WARNING: OPENAI_API_KEY is missing from the environment variables.");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
});

// --- TOOL 3: FIND YOUR HOOK (UPGRADED JSON VERSION) ---
async function findYourHook(topicInput) {
    if (!topicInput || topicInput.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your topic so we can create a strong hook. ✨");
    }

    const systemPrompt = `You are the "Find Your Hook" engine. 
You take a topic and generate high-conversion opening lines that don't sound like "bro-marketing."

RULES:
- No emojis. No "Wait until the end."
- Use psychological triggers: Curiosity, Negative Constraint, or Counter-Intuition.
- Return strictly in JSON format with keys: negative_hook, curiosity_hook, and authority_hook.`;

    const userPrompt = `TOPIC: "${topicInput}"

Please provide the following in the JSON response (ALL values must be single strings):
1. negative_hook: A hook based on what people are doing WRONG.
2. curiosity_hook: A hook that opens a "loop" in the reader's mind.
3. authority_hook: A hook that leads with a specific, undeniable result or observation.`;

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
        console.error("OpenAI API Error (Find Your Hook):", error);
        throw new Error("Failed to generate hooks.");
    }
}

// --- TOOL 1: VOICE ARCHITECT (TONE ANALYZER) ---
async function analyzeVoice(writingSample) {
    if (!writingSample || writingSample.trim().length < 20) {
        throw new Error("Please provide a longer writing sample (at least 20 characters) so we can analyze your unique DNA. ✨");
    }

    const systemPrompt = `You are the "Voice Architect." 
Your goal is to analyze a writing sample and extract its DNA. 
Identify the hidden patterns, sentence structures, and emotional resonance.

RULES:
- Avoid generic adjectives like "professional" or "friendly." 
- Be specific (e.g., "staccato rhythm," "low-register vocabulary," "question-led transitions").
- Return strictly in JSON format with keys: tone_profile, sentence_dna, and power_words.`;

    const userPrompt = `SAMPLE CONTENT: "${writingSample}"

Please provide the following in the JSON response (ALL values must be single strings):
1. tone_profile: A 3-word sophisticated label for this voice (e.g., "The Reluctant Expert").
2. sentence_dna: Describe the cadence and structure (e.g., "Short, punchy fragments followed by long, flowing explanations").
3. power_words: A list of 5 specific words or types of words that appear or would fit this voice perfectly.`;

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
        console.error("OpenAI API Error (Voice Architect):", error);
        throw new Error("Failed to analyze voice.");
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

// --- TOOL 4: WEEKLY STRATEGIST (CONTENT PLANNER) ---
async function planWeeklyStrategy(themeInput) {
    if (!themeInput || themeInput.trim().length < 5) {
        throw new Error("Please provide a theme or goal for your week (at least 5 characters). ✨");
    }

    const systemPrompt = `You are the "Content Planner" for a high-leverage creator. 
Your goal is to turn one single theme into a 3-post weekly "Calm Strategy." 

RULES:
- No "fluff" posts. Every post must have a clear objective.
- Avoid the 7-day-a-week grind; focus on 3 high-impact pieces.
- Return strictly in JSON format with keys: the_hook_post, the_value_post, and the_bridge_post.`;

    const userPrompt = `WEEKLY THEME: "${themeInput}"

Please provide the following in the JSON response (ALL values must be single strings):
1. the_hook_post: A "Top of Funnel" post to challenge a common belief or share a "Hot Take" related to the theme.
2. the_value_post: A "Middle of Funnel" post that provides a deep-dive tactical breakdown or "How-to."
3. the_bridge_post: A "Bottom of Funnel" post that connects the theme to a personal story or a soft call-to-action.`;

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
        console.error("OpenAI API Error (Weekly Strategist):", error);
        throw new Error("Failed to plan content.");
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

// --- TOOL 2: BIO BUILDER (UPGRADED JSON VERSION) ---
async function buildBio(userInput, platform = 'Instagram', vibe = 'Clear & Professional') {
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please share a bit more about yourself (at least 10 characters) so we can build your bio. ✨");
    }

    const systemPrompt = `You are the "Bio Builder" for The Calm Content Companion. 
Your goal is to turn messy personal details into a minimalist, high-authority social media bio.

PLATFORM: ${platform}
VIBE: ${vibe}

RULES:
- Eliminate "I help..." and "Helping..." clichés.
- Focus on the "Calm" brand: sophisticated, direct, and rhythmic.
- Return strictly in JSON format with keys: the_hook, the_authority, and the_human.`;

    const userPrompt = `USER INPUT: "${userInput}"

Please provide the following in a VALID JSON response. EVERY KEY IS REQUIRED.
1. "the_hook": A 4-6 word opening statement that defines a unique worldview.
2. "the_authority": A brief sentence or phrase that proves why you should be listened to (results/experience).
3. "the_human": A single, non-business detail that adds texture without being "quirky."

STRICT JSON ONLY. No other text.`;

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
        console.error("OpenAI API Error (Bio Builder):", error);
        throw new Error("Failed to build bio.");
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
    findYourHook,
    analyzeVoice,
    generateVoice,
    humanizeText: generateVoice, // Alias for routes/tools.js
    planWeeklyStrategy,
    generateContentPlan,
    planContentDirection: generateContentPlan, // Alias for routes/tools.js
    generateBio: buildBio, // Alias for routes/tools.js
    buildBio,
    interpretSignal,
    multiplyContent,
    generatePatternInterrupt,
    generateImage
};
