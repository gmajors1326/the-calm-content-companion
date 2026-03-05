const express = require('express');
const router = express.Router();
const { generateHook, humanizeText } = require('../services/openai');

// --- TOOL 1: FIND YOUR HOOK ROUTE ---
router.post('/generate-hook', async (req, res) => {
    try {
        const { userInput, vibe, platform } = req.body;

        if (!userInput) {
            return res.status(400).json({ success: false, error: "Please provide an idea to generate hooks." });
        }

        const selectedVibe = vibe || "The Storyteller";
        const selectedPlatform = platform || "Instagram Reels";

        const generatedHooks = await generateHook(userInput, selectedVibe, selectedPlatform);

        res.json({ success: true, data: generatedHooks });

    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
});

// --- TOOL 2: FIND YOUR VOICE ROUTE ---
router.post('/find-your-voice', async (req, res) => {
    try {
        const { userInput, tone, spice } = req.body;

        if (!userInput) {
            return res.status(400).json({ success: false, error: "Please provide some text to rewrite." });
        }

        const selectedTone = tone || "Warm & Empathetic";
        const selectedSpice = spice || "Story-driven";

        const humanizedText = await humanizeText(userInput, selectedTone, selectedSpice);

        res.json({ success: true, data: humanizedText });

    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
});

module.exports = router;
