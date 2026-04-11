const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini using the key from your .env file
if (!process.env.GEMINI_API_KEY) {
    console.warn("WARNING: GEMINI_API_KEY is missing from the environment variables.");
}

// Use gemini-1.5-flash to ensure compatibility
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Helper to run a prompt against Gemini and expect JSON or Text
 */
async function runGemini(systemPrompt, userPrompt, isJson = true) {
    try {
        console.log(`Running Gemini request (JSON: ${isJson})...`);
        const fullPrompt = `${systemPrompt}\n\nUSER INPUT:\n${userPrompt}`;
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: isJson ? "application/json" : "text/plain",
            },
        });

        const response = await result.response;
        const text = response.text();
        console.log("Gemini response received successfully.");
        return text;
    } catch (error) {
        console.error("Gemini API Error Detail:", error.message);
        if (error.response) {
            console.error("Error Response Data:", JSON.stringify(error.response, null, 2));
        }
        throw error;
    }
}

// --- TOOL 3: FIND YOUR HOOK ---
async function findYourHook(topicInput) {
    if (!topicInput || topicInput.trim().length < 5) {
        throw new Error("Please provide a bit more detail about your topic so we can create a strong hook. ✨");
    }

    const systemPrompt = `You are a Viral Content Strategist. 
  Transform the input into 3 distinct, high-tension hooks for social media.
  
  Frameworks to use:
  1. The Negative Hook: Address a common mistake or a "hard truth" that people ignore.
  2. The Curiosity Gap: Start a story or a concept but leave a piece of information missing.
  3. The Authority Shift: Challenge a popular belief with a counter-intuitive insight.
  
  Constraints:
  - Max 15 words per hook.
  - No "Are you tired of...?" or generic questions.
  - Must feel human, punchy, and urgent.
  
  Return ONLY JSON in this format: { 
    "the_negative": "Hook text here", 
    "the_curiosity": "Hook text here", 
    "the_authority": "Hook text here" 
  }`;

    const userPrompt = `TOPIC: "${topicInput}"`;

    return await runGemini(systemPrompt, userPrompt, true);
}

// --- TOOL 1: VOICE ARCHITECT (TONE ANALYZER) ---
async function analyzeVoice(writingSample) {
    if (!writingSample || writingSample.trim().length < 20) {
        throw new Error("Please provide a longer writing sample (at least 20 characters) so we can analyze your unique DNA. ✨");
    }

    const systemPrompt = `You are a World-Class Stylistic Editor. 
  Analyze the provided text for "Style Fingerprinting."
  
  Identify:
  1. The Rhythm: (e.g., Short-short-long, staccato, or flowing).
  2. The Vocabulary: (e.g., Minimalist, intellectual, gritty, or spiritual).
  3. The Perspective: (e.g., Direct observer, the mentor, or the rebel).
  
  Return ONLY JSON in this format: { 
    "your_voice_dna": "A 2-sentence summary of their vibe", 
    "signature_patterns": "3 bullet points of what they do repeatedly",
    "the_filter": "What to avoid to keep this voice pure",
    "voice_sample": "A 1-sentence rewrite of a generic tip in THEIR voice"
  }`;

    const userPrompt = `SAMPLE CONTENT: "${writingSample}"`;

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
- Use simple, layman's terms. Keep it natural and easy to read.
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
- ALL values must be single strings.
- Use simple, layman's terms. Avoid complex marketing concepts.`;

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

    const systemPrompt = `You are an Instagram Branding Expert. Transform the input into a high-converting Instagram Bio. 
  Constraints: 
  - Max 150 characters total.
  - Use 3-4 distinct lines with line breaks.
  - Use 1 relevant emoji per line.
  - Line 1: The "Who" (Authority/Title).
  - Line 2: The "What" (What you do for others).
  - Line 3: The "Proof/Human" (A unique fact or achievement).
  - Line 4: The "Action" (CTA to the link below).
  
  Return ONLY JSON in this format: { "insta_bio": "Line 1\\nLine 2\\nLine 3\\nLine 4" }`;

    const userPrompt = `USER INPUT: "${userInput}"`;

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

    const systemPrompt = `You are a Content Architect. Your job is to take one "Core Truth" and multiply it into 3 distinct content formats.
  
  The Assets:
  1. The "How-To" (Educational): A step-by-step breakdown of how to implement the truth.
  2. The "Story" (Emotional): A narrative angle showing the human cost of NOT following this truth.
  3. The "Contrarian" (Analytical): Challenging the status quo by defending this truth against common myths.
  
  Constraints:
  - Do not use hashtags.
  - Keep the tone "Calm but Authoritative."
  - Ensure each asset feels like a standalone post.
  
  Return ONLY JSON in this format: { 
    "educational_asset": "The breakdown...", 
    "emotional_asset": "The story...", 
    "contrarian_asset": "The challenge..." 
  }`;

    const userPrompt = `USER CONTENT: "${userInput}"`;

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
