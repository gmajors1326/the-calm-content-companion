const OpenAI = require('openai');

// Initialize OpenAI using the key from your .env file
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

// --- TOOL 2: FIND YOUR VOICE ---
async function humanizeText(boringText, tone, spice) {
    const systemPrompt = `You are an expert copywriter and personal brand voice director.
The user will provide a stiff, robotic, corporate, or AI-generated piece of text.
Your job is to rewrite it to sound like a real, authentic human being.

You MUST adopt this Core Tone: "${tone}"
You MUST format it using this "Spice": "${spice}"

Rules:
- Remove all corporate jargon (synergy, leverage, utilize, delve, overarching, testament).
- Make it flow naturally, as if someone is speaking to a friend over coffee.
- If the spice is "Story-driven", add a brief relatable opening.
- If the spice is "Punchy & Actionable", use short sentences and bullet points.
- If the spice is "Heavy Metaphors", rely on a creative analogy.

Format the output EXACTLY like this:

✨ Your Authentic Rewrite:
[The rewritten text goes here. Make it beautiful.]

-------------------------

💡 Why this sounds like you:
[1 short sentence explaining the specific tonal shifts you made to match the requested tone/spice.]

🚫 Cringe Check:
[List 1 or 2 robotic/corporate words you removed from their original text and explain why they sounded bad, e.g., "Removed the word 'delve' because real people don't say that."]
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: boringText }
            ],
            temperature: 0.8, // Slightly higher temperature for more personality
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Voice):", error);
        throw new Error("Failed to humanize text.");
    }
}

// --- TOOL 3: CONTENT DIRECTION PLANNER (UPGRADED JSON VERSION) ---
async function planContentDirection(audiencePainPoint, goal, platform, vibe) {
    const systemPrompt = `You are an elite, high-end Content Director for authentic creators.
The user will provide their Target Audience & Pain Point, their Current Goal, their Platform, and their desired Vibe.
Your job is to generate a highly actionable 3-Post Content Game Plan that acts as a mini-funnel.

Post 1: Top of Funnel (Attract new eyes / Broad appeal)
Post 2: Middle of Funnel (Nurture and build trust / Story-driven)
Post 3: Bottom of Funnel (Convert / Soft pitch tailored to their goal)

Rules:
- Tailor the formatting, hooks, and visual advice strictly to the selected Platform (${platform}).
- Keep the tone matching their requested "Vibe".
- Do NOT use cringe marketing speak, hype-bro language, or aggressive sales tactics.
- Keep it calm, premium, and actionable.

IMPORTANT: You MUST respond in pure JSON format matching exactly this structure:
{
  "post1": {
    "type": "🚀 The Attraction Post",
    "hook": "Write a scroll-stopping hook",
    "coreMessage": "1-2 sentences explaining what to teach/show",
    "visualOrFormat": "A platform-specific visual or formatting idea"
  },
  "post2": {
    "type": "🤝 The Trust Builder",
    "hook": "Write a relatable, story-driven hook",
    "coreMessage": "1-2 sentences sharing a vulnerable story or behind-the-scenes reality",
    "visualOrFormat": "A platform-specific visual or formatting idea"
  },
  "post3": {
    "type": "🎯 The Conversion Post",
    "hook": "Write a hook that speaks directly to a specific pain point",
    "coreMessage": "1-2 sentences transitioning from the pain point to the solution/goal",
    "callToAction": "Exactly what to tell the viewer to do (e.g., Comment 'GUIDE')"
  }
}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" }, // Enforces pure JSON output
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Audience & Pain Point: ${audiencePainPoint}\nGoal: ${goal}\nPlatform: ${platform}\nVibe: ${vibe}` }
            ],
            temperature: 0.75,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Content Planner):", error);
        throw new Error("Failed to generate content plan.");
    }
}

// --- TOOL 5: BIO BUILDER ---
async function generateBio(niche, offer, platform, vibe) {
    const systemPrompt = `You are an elite Social Media Profile Optimizer. 
The user wants a high-converting bio for ${platform}.
They will give you their Target Audience/Niche, their Main Offer/CTA, and their desired Vibe.

Your job is to write 3 distinct bio options. 
Rules:
- Strictly format for ${platform} (e.g., IG allows line breaks, Twitter is one paragraph, TikTok is very short).
- Tone MUST match the "${vibe}" vibe.
- Avoid overused emojis unless it fits the platform perfectly. No cringe marketing speak.
- Include a "Link Text" suggestion (what the text pointing to the URL should say).

IMPORTANT: You MUST respond in pure JSON format matching exactly this structure:
{
  "option1": {
    "style": "👑 The Authority (Credibility focused)",
    "bioText": "Line 1\\nLine 2\\nLine 3",
    "linkText": "Download the guide 👇"
  },
  "option2": {
    "style": "🤝 The Relatable (Story/Community focused)",
    "bioText": "Line 1\\nLine 2\\nLine 3",
    "linkText": "Join the community 👇"
  },
  "option3": {
    "style": "⚡ Short & Punchy (Direct and minimal)",
    "bioText": "Line 1\\nLine 2\\nLine 3",
    "linkText": "Get started 👇"
  }
}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Niche/Audience: ${niche}\nOffer/Goal: ${offer}\nPlatform: ${platform}\nVibe: ${vibe}` }
            ],
            temperature: 0.75,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API Error (Bio Builder):", error);
        throw new Error("Failed to generate bios.");
    }
}

module.exports = {
    generateHook,
    humanizeText,
    planContentDirection,
    generateBio
};
