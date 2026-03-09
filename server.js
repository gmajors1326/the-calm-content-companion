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
            Write a professional Instagram bio (strictly no hashtags, no mentions of "The Calm Content Method").
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
 * TOOL 3: SIGNAL INTERPRETER
 */
app.post('/interpret-signals', async (req, res) => {
    try {
        const { data, depth } = req.body;

        const prompt = `
            Analyze the following Instagram post data and provide a ${depth} analysis.
            Data: ${data}
            
            Focus on:
            - Why it worked or didn't work based on 2024-2025 IG algorithms.
            - Specific advice for the next post.
            - Do not use any brand names or hashtags.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({ analysis: completion.choices[0].message.content });
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
