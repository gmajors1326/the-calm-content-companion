const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini using the key from your .env file
if (!process.env.GEMINI_API_KEY) {
    console.warn("WARNING: GEMINI_API_KEY is missing from the environment variables.");
}

// Use a direct model name or gemini-1.5-flash-latest for broader compatibility
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * Helper to run a prompt against Gemini and expect JSON or Text
 */
async function runGemini(systemPrompt, userPrompt, isJson = true) {
    try {
        const fullPrompt = `${systemPrompt}\n\nUSER INPUT:\n${userPrompt}`;
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: isJson ? "application/json" : "text/plain",
            },
        });

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error Detail:", error);
        throw error;
    }
}

// --- TOOL 3: FIND YOUR HOOK ---
async function findYourHook(topicInput) {
    if (!topicInput || topicInput.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your topic so we can create a strong hook. ✨");
    }

    const systemPrompt = `You are the "Find Your Hook" engine. 
You take a topic and generate high-conversion opening lines that don't sound like "bro-marketing."

RULES:
- No emojis. No "Wait until the end."
- Use psychological triggers: Curiosity, Negative Constraint, or Counter-Intuition.
- Return strictly in JSON format with keys: negative_hook, curiosity_hook, and authority_hook.
- ALL values must be single strings.`;

    const userPrompt = `TOPIC: "${topicInput}"
1. negative_hook: A hook based on what people are doing WRONG.
2. curiosity_hook: A hook that opens a "loop" in the reader's mind.
3. authority_hook: A hook that leads with a specific, undeniable result or observation.`;

    return await runGemini(systemPrompt, userPrompt, true);
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
- Return strictly in JSON format with keys: tone_profile, sentence_dna, and power_words.
- ALL values must be single strings.`;

    const userPrompt = `SAMPLE CONTENT: "${writingSample}"
1. tone_profile: A 3-word sophisticated label for this voice (e.g., "The Reluctant Expert").
2. sentence_dna: Describe the cadence and structure (e.g., "Short, punchy fragments followed by long, flowing explanations").
3. power_words: A list of 5 specific words or types of words that appear or would fit this voice perfectly.`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// 1. FIND YOUR VOICE (The Humanizer)
async function generateVoice(userInput, tone, spice) {
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please provide at least 10 characters for the text you'd like to humanize. ✨");
    }
    const systemPrompt = `Act as a soulful communication expert and copywriter. I am providing you with rough, messy, or AI-generated text. 
Rewrite this text using the provided inputs.

STRICT RULES FOR AUTHENTICITY:
- Use the original user's ideas, stories, and context.
- DO NOT make up generic advice or clichés.
- Ensure it is SEO optimized for the specific niche.
- No JSON, no brackets. NO "guru-speak."
- Formatting: Single block of warm, readable text.`;

    const userPrompt = `Original Text: "${userInput}"
Niche/Tone: ${tone}
"Spice" (Relatability/Storytelling Level): ${spice}`;

    return await runGemini(systemPrompt, userPrompt, false);
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
- Return strictly in JSON format with keys: the_hook_post, the_value_post, and the_bridge_post.
- ALL values must be single strings.`;

    const userPrompt = `WEEKLY THEME: "${themeInput}"
1. the_hook_post: A "Top of Funnel" post to challenge a common belief or share a "Hot Take" related to the theme.
2. the_value_post: A "Middle of Funnel" post that provides a deep-dive tactical breakdown or "How-to."
3. the_bridge_post: A "Bottom of Funnel" post that connects the theme to a personal story or a soft call-to-action.`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 3: CONTENT DIRECTION PLANNER ---
async function generateContentPlan(audienceStruggle, vibe, platform, goal, tier = 'Free') {
    const hasPremiumFeatures = tier === 'Pro' || tier === 'Elite';
    
    const systemPrompt = `Act as a Professional Content Strategist. Create a 3-post SEO-optimized content plan.

STRICT FORMATTING RULES:
- NO JSON, NO brackets {}, and NO technical syntax.
- Use clear headings for Post 1, Post 2, and Post 3.
- For each post, provide:
    1. A Searchable Title (SEO Optimized)
    2. A Scroll-Stopping Hook
    3. The Core Value/Message
    ${hasPremiumFeatures ? '4. High-Value SEO Keywords (Secondary and LSI)' : ''}
- Use simple line breaks and dashes for bullet points.
- Separate each post with a horizontal line like this: ---`;

    const userPrompt = `Goal: ${goal}
Target Audience Struggle: ${audienceStruggle}
Vibe: ${vibe}
Platform: ${platform}`;

    return await runGemini(systemPrompt, userPrompt, false);
}

// --- TOOL 2: BIO BUILDER ---
async function buildBio(userInput, platform = 'Instagram', vibe = 'Clear & Professional') {
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please share a bit more about yourself (at least 10 characters) so we can build your bio. ✨");
    }

    const systemPrompt = `You are the "Bio Builder" for The Calm Content Companion. 
Your goal is to turn messy personal details into a minimalist, high-authority social media bio.

RULES:
- Eliminate "I help..." and "Helping..." clichés.
- Focus on the "Calm" brand: sophisticated, direct, and rhythmic.
- Return strictly in JSON format with keys: the_hook, the_authority, and the_human.
- ALL values must be single strings.`;

    const userPrompt = `USER INPUT: "${userInput}"
PLATFORM: ${platform}
VIBE: ${vibe}
Provide:
1. "the_hook": A 4-6 word opening statement that defines a unique worldview.
2. "the_authority": A brief sentence or phrase that proves why you should be listened to (results/experience).
3. "the_human": A single, non-business detail that adds texture without being "quirky."`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 4: ENGAGEMENT SIGNAL INTERPRETER ---
async function interpretSignal(postContent, platform) {
    const systemPrompt = `You are an elite Data & Content Analyst for social media creators.
The user had a post that performed unusually well on ${platform}.

Your job is to:
1. Analyze the psychological "Signal" (Why did this resonate so well?)
2. Provide 3 specific "Spin-Off" content ideas.

IMPORTANT: You MUST respond in pure JSON format:
{
  "analysis": "1-2 punchy sentences",
  "spinoff1": { "angle": "The Deep Dive", "hook": "...", "concept": "..." },
  "spinoff2": { "angle": "The Contrarian Pivot", "hook": "...", "concept": "..." },
  "spinoff3": { "angle": "The Step-by-Step", "hook": "...", "concept": "..." }
}`;

    const userPrompt = `Winning Post Concept: ${postContent}\nPlatform: ${platform}`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 6: THE MULTIPLIER ---
async function multiplyContent(userInput) {
    if (!userInput || userInput.trim().length < 10) {
        throw new Error("Please provide a bit more detail (at least 10 characters) so the Multiplier can find your core truth. ✨");
    }

    const systemPrompt = `You are the engine for "The Multiplier," a high-leverage content strategy tool. 
Your goal is to take a single content idea and multiply its value across different angles and platforms.

RULES:
- Be blunt and high-signal. No fluff. No hashtags.
- Focus on the "So What?" factor.
- Use a sophisticated, "Calm" tone.
- Return strictly in JSON format with keys: core_truth, stress_test, angles, and remix_recipes.`;

    const userPrompt = `USER CONTENT: "${userInput}"
Please provide:
1. core_truth: The single most powerful "Aha!" moment.
2. stress_test: Evaluate value or provide a "Value Pivot".
3. angles: tactical, emotional, contrarian.
4. remix_recipes: instagram_post, visual_carousel (5-slide outline separated by \\n), short_form_video script.`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 7: THE PATTERN INTERRUPT ---
async function generatePatternInterrupt(topic) {
    if (!topic || topic.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your topic so we can create a pattern interrupt. ✨");
    }
    const systemPrompt = `You are a high-performance Instagram Growth Strategist. 
Transform a standard content idea into a "Pattern Interrupt" that forces a "Send" (DM).

CRITICAL CONSTRAINTS:
- NO HASHTAGS. NO AI-GLOSS.
- FOCUS ON "THE SEND": Promise a high-utility takeaway.
- Use a sophisticated, "Calm" tone.
- Return strictly in JSON format.`;

    const userPrompt = `Topic: "${topic}"
Structure:
{
  "pattern_interrupt": { "title": "The Disruptor", "hook": "...", "retention_point": "..." },
  "high_utility": { "title": "The Resource", "hook": "...", "retention_point": "..." },
  "relatable_struggle": { "title": "The Real Talk", "hook": "...", "retention_point": "..." }
}`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 8: IMAGE GENERATION (Placeholder - Gemini 1.5 Flash doesn't generate images directly like DALL-E) ---
async function generateImage(prompt, size = "1024x1024") {
    // Note: Gemini 1.5 Flash is a text/multimodal model but doesn't have a direct "generate image" API like OpenAI's DALL-E 3.
    // We would typically use Imagen via Google Cloud or keep DALL-E if desired.
    // For now, I'll provide a warning that image generation requires a different service or remains on OpenAI.
    throw new Error("Image Generation (DALL-E 3) is currently unavailable via the Gemini migration. Please contact support.");
}

module.exports = {
    generateHook: findYourHook,
    findYourHook,
    analyzeVoice,
    generateVoice,
    humanizeText: generateVoice,
    planWeeklyStrategy,
    generateContentPlan,
    planContentDirection: generateContentPlan,
    generateBio: buildBio,
    buildBio,
    interpretSignal,
    multiplyContent,
    generatePatternInterrupt,
    generateImage
};
