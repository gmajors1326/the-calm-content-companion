require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const geminiService = require('./services/gemini.js');
const PLANS = require('./constants/plans.js');

function parseGeminiJSON(raw, label = 'Gemini response') {
    if (!raw) {
        throw new Error(`${label} is empty`);
    }
    let cleaned = String(raw).trim();
    // Remove markdown fences if present
    cleaned = cleaned.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
        cleaned = cleaned.slice(start, end + 1);
    }
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        console.error(`JSON Parse Error (${label}):`, cleaned);
        throw err;
    }
}

const app = express();
console.log("Companion Server starting...");
console.log("Environment PORT:", process.env.PORT);
console.log("GEMINI API KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

app.use(express.json());
app.use(cors());

// 1. SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// Root Route: Serve the dashboard immediately on load
app.get(['/', '/the-content-companion-tools', '/the-calm-content-toolbox'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Ping Route: Used to keep the free Render service awake
app.get('/ping', (req, res) => {
    res.status(200).send('Awake');
});

// 2. SECURITY HEADERS FOR WIX IFRAME
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://*.wix.com https://www.freespiritmarketer.com;");
    next();
});

// --- THE CORE 5 TOOL ROUTES ---

// 1. FIND YOUR VOICE (Tone Analyzer)
app.post('/api/tools/analyze-voice', async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput || userInput.trim().length < 20) {
            return res.status(400).json({ success: false, error: "Please share a longer sample (at least 20 characters). ✨" });
        }
        const result = await geminiService.analyzeVoice(userInput);
        try {
            const resultJSON = parseGeminiJSON(result, 'analyze-voice');
            res.json({ success: true, data: resultJSON });
        } catch (parseErr) {
            res.status(500).json({ success: false, error: "AI response could not be parsed. Please try again." });
        }
    } catch (err) {
        console.error("API Route Error (analyze-voice):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. BIO BUILDER
app.post('/api/tools/generate-bio', async (req, res) => {
    try {
        const { userInput, platform, vibe } = req.body;
        if (!userInput || userInput.trim().length < 10) {
            return res.status(400).json({ success: false, error: "Please share a bit more about yourself so we can build your bio. ✨" });
        }
        
        const result = await geminiService.buildBio(userInput, platform, vibe);
        try {
            const resultJSON = parseGeminiJSON(result, 'generate-bio');
            res.json({ success: true, data: resultJSON });
        } catch (parseErr) {
            console.error("JSON Parse Error in Bio Builder:", result);
            res.json({ success: true, data: { insta_bio: result } });
        }
    } catch (err) {
        console.error("Bio Builder Route Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. FIND YOUR HOOK
app.post('/api/tools/generate-hook', async (req, res) => {
    try {
        const { idea } = req.body; // Topic/Idea
        if (!idea || idea.trim().length < 5) {
            return res.status(400).json({ success: false, error: "Please share a bit more detail about your topic. ✨" });
        }
        const result = await geminiService.findYourHook(idea);
        try {
            const resultJSON = parseGeminiJSON(result, 'generate-hook');
            res.json({ success: true, data: resultJSON });
        } catch (parseErr) {
            res.status(500).json({ success: false, error: "AI response could not be parsed. Please try again." });
        }
    } catch (err) {
        console.error("API Route Error (generate-hook):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. CONTENT PLANNER (Weekly Strategist)
app.post('/api/tools/plan-weekly', async (req, res) => {
    try {
        const { themeInput } = req.body;
        if (!themeInput || themeInput.trim().length < 5) {
            return res.status(400).json({ success: false, error: "Please share a theme or goal (at least 5 characters). ✨" });
        }
        const result = await geminiService.planWeeklyStrategy(themeInput);
        try {
            const resultJSON = parseGeminiJSON(result, 'plan-weekly');
            res.json({ success: true, data: resultJSON });
        } catch (parseErr) {
            res.status(500).json({ success: false, error: "AI response could not be parsed. Please try again." });
        }
    } catch (err) {
        console.error("API Route Error (plan-weekly):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 5. THE MULTIPLIER
app.post('/api/tools/generate-multiplier', async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput || userInput.trim().length < 10) {
            return res.status(400).json({ success: false, error: "Please share a bit more detail (at least 10 characters). ✨" });
        }
        const result = await geminiService.multiplyContent(userInput);
        try {
            const resultJSON = parseGeminiJSON(result, 'generate-multiplier');
            res.json({ success: true, data: resultJSON });
        } catch (parseErr) {
            res.status(500).json({ success: false, error: "AI response could not be parsed. Please try again." });
        }
    } catch (err) {
        console.error("API Route Error (generate-multiplier):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Companion is live on port ${PORT}`);
});
