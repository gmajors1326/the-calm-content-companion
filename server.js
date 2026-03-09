require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const toolRoutes = require('./routes/tools');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. ALLOW CORS
// Using a simple app.use(cors()) allows all origins, which is easiest for testing.
app.use(cors());

// 2. PARSE JSON
// This allows your server to read the {niche, audience, tone} you're sending.
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Set this in your Render Dashboard
});

/**
 * TOOL 1: BIO BUILDER
 */
app.post('/generate-bio', async (req, res) => {
    try {
        const { niche, audience, mission, personal, tone } = req.body;

        const prompt = `
            Write a professional Instagram bio (strictly no hashtags, no mentions of brand names or specific methods).
            Niche: ${niche}
            Audience: ${audience}
            Mission: ${mission}
            Personal Touch: ${personal}
            Tone: ${tone}
            
            Requirements: 
            - Use 1-2 intentional emojis.
            - Keep it under 150 characters.
            - Ensure it feels human and high-end.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ bio: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Server busy" });
    }
});

/**
 * TOOL 2: FIND YOUR HOOK (GENIUS LEVEL)
 */
app.post('/generate-hook', async (req, res) => {
    try {
        const { idea, audience, painPoint, transformation, strategy } = req.body;

        const prompt = `
            You are a world-class Instagram content strategist. 
            Transform this idea: "${idea}" into 3 genius-level scroll-stopping hooks.
            Target Audience: ${audience}
            Pain Point: ${painPoint}
            Desired Transformation: ${transformation}
            Strategy Style: ${strategy}

            Guidelines:
            - NO hashtags.
            - NO mentions of any specific brand names or method names.
            - Hook 1: A massive pattern interrupt.
            - Hook 2: A relatable "ease-based" entry.
            - Hook 3: An authoritative "hard truth."
            
            Format the output clearly with line breaks between hooks.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        });

        res.json({ hooks: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Server busy" });
    }
});

/**
 * TOOL 3: SIGNAL INTERPRETER (GENIUS & LAYMAN)
 */
app.post('/interpret-signals', async (req, res) => {
    try {
        const { data, depth } = req.body;

        const prompt = `
            You are an Instagram Algorithm Expert. Analyze this post data for a beginner:
            Data: ${data}
            Depth Level: ${depth}

            Provide a "Genius Level" interpretation using these simple sections:
            1. THE VIBE CHECK: In plain English, how did this post actually perform?
            2. THE SECRET SAUCE: Why did the Instagram algorithm treat it this way? (Explain the 'why' like I'm 5).
            3. YOUR NEXT MOVE: Give me one simple, actionable instruction for my next post to get better results.

            Strict Guidelines:
            - NO hashtags.
            - NO mentions of "The Calm Content Method" or any brand names.
            - Use a supportive, encouraging tone.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ analysis: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Server busy" });
    }
});

/**
 * TOOL 4: FIND YOUR VOICE
 */
app.post('/generate-voice', async (req, res) => {
    try {
        const { values, personality, inspiration } = req.body;

        const prompt = `
            You are a Brand Identity Expert. Based on these details, define a "Genius Level" brand voice for a beginner:
            - Values: ${values}
            - Personality: ${personality}
            - Inspiration: ${inspiration}

            Output:
            1. A 1-sentence "Voice Mission."
            2. Three "Voice Pillars" (Rules on how to speak).
            3. A short "Say This, Not That" example.
            
            Keep it simple, avoid jargon, and strictly NO hashtags or brand names.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Server busy" });
    }
});

/**
 * TOOL 5: CONTENT PLANNER
 */
app.post('/generate-plan', async (req, res) => {
    try {
        const { goal, niche, timeframe } = req.body;

        const prompt = `
            Create a strategic, genius-level content plan for a beginner.
            Goal: ${goal}
            Niche: ${niche}
            Timeframe: ${timeframe}

            Provide a simple 7-day breakdown:
            - Day 1-7: Theme, Content Type (Reel/Carousel/Static), and a 1-sentence instruction on what to say.
            
            Strategy:
            - Include a mix of Education, Connection, and Promotion.
            - Focus on engagement and building trust.
            - NO hashtags. NO brand names.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Server busy" });
    }
});

// API Routes
app.use('/api', toolRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'server is running' });
});

app.listen(PORT, () => {
    console.log(`Dashboard Server Live on ${PORT}`);
});
