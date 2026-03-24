require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const openaiService = require('./services/openai.js');
const PLANS = require('./constants/plans.js');

const app = express();
console.log("Companion Server starting...");
console.log("Environment PORT:", process.env.PORT);
console.log("API KEY LOADED:", process.env.OPENAI_API_KEY ? "YES" : "NO");

app.use(express.json());
app.use(cors());

// 1. SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// Root Route: Serve the dashboard immediately on load
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
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
        const result = await openaiService.analyzeVoice(userInput);
        const resultJSON = JSON.parse(result);
        res.json({ success: true, data: resultJSON });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. BIO BUILDER
app.post('/api/tools/generate-bio', async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput || userInput.trim().length < 10) {
            return res.status(400).json({ success: false, error: "Please share a bit more about yourself so we can build your bio. ✨" });
        }
        const result = await openaiService.buildBio(userInput);
        const resultJSON = JSON.parse(result);
        res.json({ success: true, data: resultJSON });
    } catch (err) {
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
        const result = await openaiService.findYourHook(idea);
        const resultJSON = JSON.parse(result);
        res.json({ success: true, data: resultJSON });
    } catch (err) {
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
        const result = await openaiService.planWeeklyStrategy(themeInput);
        const resultJSON = JSON.parse(result);
        res.json({ success: true, data: resultJSON });
    } catch (err) {
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
        const result = await openaiService.multiplyContent(userInput);
        const resultJSON = JSON.parse(result);
        res.json({ success: true, data: resultJSON });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Companion is live on port ${PORT}`);
});
