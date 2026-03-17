require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const openaiService = require('./services/openai.js');

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

// --- TOOL ROUTES ---

// FIND YOUR VOICE
app.post('/api/tools/generate-voice', async (req, res) => {
    try {
        const { userInput, tone, spice } = req.body;
        const result = await openaiService.generateVoice(userInput, tone, spice);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// BIO BUILDER
app.post('/api/tools/generate-bio', async (req, res) => {
    try {
        const { niche, audience, tone } = req.body;
        const result = await openaiService.generateBio(niche, audience, tone || 'Warm & Soulful');
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// FIND YOUR HOOK
app.post('/api/tools/generate-hook', async (req, res) => {
    try {
        const { idea } = req.body;
        const result = await openaiService.generateHook(idea);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// CONTENT PLANNER
app.post('/api/tools/generate-plan', async (req, res) => {
    try {
        const { audienceStruggle, vibe, platform, goal } = req.body;
        const result = await openaiService.generateContentPlan(audienceStruggle, vibe, platform, goal);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Companion is live on port ${PORT}`);
});

