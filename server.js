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

// 3. THE BIO BUILDER ROUTE
app.post('/generate-bio', async (req, res) => {
    try {
        const { niche, audience, tone } = req.body;

        // Structured prompt for high-quality, professional bios
        const prompt = `
            You are a social media strategist for "@itscandicemajors" and "The Calm Content Method."
            Write a professional Instagram bio for:
            - Niche: ${niche}
            - Audience: ${audience}
            - Tone: ${tone}

            Requirements:
            1. Reflect the "Calm Content" philosophy (mindful, ease-focused).
            2. Include 2-3 intentional emojis.
            3. Include a clear Call to Action (CTA).
            4. Keep it under 150 characters.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ bio: completion.choices[0].message.content });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "The Companion is resting. Try again soon." });
    }
});

// API Routes
app.use('/api', toolRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Allowing requests from: ${process.env.WIX_SITE_URL || 'All origins (Warning: Set WIX_SITE_URL in .env)'}`);
});
