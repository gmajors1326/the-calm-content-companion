const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const app = express();

// 1. MIDDLEWARE CONFIGURATION
// Essential for Wix Studio / Velo to communicate with your Render server
app.use(cors());
app.use(express.json());

// 2. INITIALIZE OPENAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * DOUBLE FAIL-SAFE SANITIZER
 * This function is the "Brand Guard." It physically strips forbidden 
 * strings and hashtags from the AI's response before sending it back.
 */
function sanitize(text) {
    if (!text) return "";
    return text
        .replace(/#\w+/g, '') // Removes all hashtags
        .replace(/The Calm Content Method/gi, '')
        .replace(/The Calm Content Companion/gi, '')
        .replace(/itscandicemajors/gi, '')
        .replace(/\s\s+/g, ' ') // Clean up double spaces
        .trim();
}

// ---------------------------------------------------------
// THE 10-TOOL GENIUS SUITE
// ---------------------------------------------------------

/** TOOL 1: BIO BUILDER **/
app.post('/generate-bio', async (req, res) => {
    try {
        const { userId, niche, audience, mission, personal, tone } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Write a high-end IG bio. Niche: ${niche}. Target: ${audience}. Mission: ${mission}. Personal: ${personal}. Tone: ${tone}. STRICT: NO hashtags. NO brand names. Under 150 chars.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 2: FIND YOUR HOOK **/
app.post('/generate-hook', async (req, res) => {
    try {
        const { userId, idea, audience, painPoint, transformation, strategy } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Genius IG Hooks for "${idea}". Audience: ${audience}. Pain: ${painPoint}. Goal: ${transformation}. Style: ${strategy}. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 3: FIND YOUR VOICE **/
app.post('/generate-voice', async (req, res) => {
    try {
        const { userId, values, personality, inspiration } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Define brand voice. Values: ${values}. Personality: ${personality}. Inspo: ${inspiration}. Provide mission, 3 rules, and Say This/Not That. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 4: SIGNAL INTERPRETER **/
app.post('/interpret-signals', async (req, res) => {
    try {
        const { userId, data, depth } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Analyze IG data: ${data}. Depth: ${depth}. Provide Vibe Check, Secret Sauce, and Next Move. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 5: CONTENT PLANNER **/
app.post('/generate-plan', async (req, res) => {
    try {
        const { userId, goal, niche, timeframe } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Create a ${timeframe} content plan. Goal: ${goal}. Niche: ${niche}. Give 1 daily theme + simple instruction. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 6: CAROUSEL MAPPER **/
app.post('/generate-carousel', async (req, res) => {
    try {
        const { userId, topic, slides, goal } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Map out ${slides} slides for: ${topic}. Goal: ${goal}. Include Hook, Value, and CTA. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 7: REEL SCRIPT MASTER **/
app.post('/generate-reel', async (req, res) => {
    try {
        const { userId, hook, duration, style } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Write a ${duration}s Reel script. Hook: "${hook}". Style: ${style}. Include Visuals and Audio. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 8: CAPTION OPTIMIZER **/
app.post('/generate-caption', async (req, res) => {
    try {
        const { userId, draft, length, tone } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Optimize caption draft: "${draft}". Length: ${length}. Tone: ${tone}. High engagement + CTA. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 9: STORY ARC GEN **/
app.post('/generate-story-arc', async (req, res) => {
    try {
        const { userId, theme, product } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `4-part Story Arc. Theme: ${theme}. Sell: ${product}. Hook, Value, Behind-Scenes, CTA. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/** TOOL 10: REPLY ASSISTANT **/
app.post('/generate-reply', async (req, res) => {
    try {
        const { userId, comment, vibe } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID required." });

        const prompt = `Engaging reply to: "${comment}". Vibe: ${vibe}. Focus on starting a convo. STRICT: NO hashtags. NO brand names.`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        res.json({ result: sanitize(completion.choices[0].message.content), status: "success" });
    } catch (e) { res.status(500).json({ error: "Server error" }); }
});

// 3. SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The 10-Tool Dashboard is LIVE on Port ${PORT}`);
});
