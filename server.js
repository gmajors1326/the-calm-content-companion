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
 * DOUBLE FAIL-SAFE SANITIZER
 * This function runs on EVERY response to ensure brand names and hashtags 
 * are physically impossible to display in the UI.
 */
function sanitize(text) {
    if (!text) return "";
    return text
        .replace(/#\w+/g, '') // Removes all hashtags
        .replace(/The Calm Content Method/gi, '')
        .replace(/The Calm Content Companion/gi, '')
        .replace(/itscandicemajors/gi, '')
        .replace(/\s\s+/g, ' ') // Removes double spaces left by deletions
        .trim();
}

/**
 * TOOL 1: BIO BUILDER
 */
app.post('/generate-bio', async (req, res) => {
    try {
        const { userId, niche, audience, mission, personal, tone } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Write an Instagram bio for a beginner. 
        Niche: ${niche}. Target: ${audience}. Mission: ${mission}. Fun Detail: ${personal}. 
        Tone: ${tone}. 
        STRICT RULES: NO hashtags. NO brand names. Keep it under 150 chars. High-end but simple.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({
            bio: sanitize(completion.choices[0].message.content),
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * TOOL 2: FIND YOUR HOOK
 */
app.post('/generate-hook', async (req, res) => {
    try {
        const { userId, idea, audience, painPoint, transformation, strategy } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Act as a genius IG strategist. Convert "${idea}" into 3 scroll-stopping hooks for ${audience}.
        Pain Point: ${painPoint}. Goal: ${transformation}. Strategy: ${strategy}.
        STRICT RULES: NO hashtags. NO brand names. Use layman's terms.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        });

        res.json({
            hooks: sanitize(completion.choices[0].message.content),
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * TOOL 3: SIGNAL INTERPRETER
 */
app.post('/interpret-signals', async (req, res) => {
    try {
        const { userId, data, depth } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Analyze this IG post data for a beginner: ${data}. 
        Explain performance (The Vibe Check), algorithm behavior (The Secret Sauce), and the next step (Your Next Move). 
        STRICT: NO hashtags. NO brand names. Simple language.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({
            analysis: sanitize(completion.choices[0].message.content),
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * TOOL 4: FIND YOUR VOICE
 */
app.post('/generate-voice', async (req, res) => {
    try {
        const { userId, values, personality, inspiration } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Define a beginner brand voice. Values: ${values}. Personality: ${personality}. Inspo: ${inspiration}.
        Provide: 1-sentence mission, 3 simple rules, and a "Say This, Not That" example. 
        STRICT: NO hashtags. NO brand names.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({
            result: sanitize(completion.choices[0].message.content),
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * TOOL 5: CONTENT PLANNER
 */
app.post('/generate-plan', async (req, res) => {
    try {
        const { userId, goal, niche, timeframe } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Create a 7-day beginner content plan. Goal: ${goal}. Niche: ${niche}. 
        Give 1 theme/type per day and a simple 1-sentence instruction. 
        STRICT: NO hashtags. NO brand names. Simple laymans terms.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({
            result: sanitize(completion.choices[0].message.content),
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
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
