const express = require('express');
const router = express.Router();
const { generateHook, humanizeText, planContentDirection, generateBio } = require('../services/openai');

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

// --- TOOL 3: CONTENT DIRECTION ROUTE ---
router.post('/content-direction', async (req, res) => {
    try {
        // We now expect audiencePainPoint and platform alongside goal and vibe
        const { audiencePainPoint, goal, platform, vibe } = req.body;

        if (!audiencePainPoint || !goal) {
            return res.status(400).json({ success: false, error: "Please provide your audience's pain point and your goal." });
        }

        const selectedPlatform = platform || "Instagram Reels";
        const selectedVibe = vibe || "Educational & Calm";

        // Call the AI function
        const contentPlanString = await planContentDirection(audiencePainPoint, goal, selectedPlatform, selectedVibe);

        // Parse the JSON string from OpenAI into an actual JavaScript object
        const contentPlanJSON = JSON.parse(contentPlanString);

        // Send the structured JSON back to Wix
        res.json({ success: true, data: contentPlanJSON });

    } catch (error) {
        console.error("Route Error (Content Planner):", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
});

// --- TOOL 5: BIO BUILDER ROUTE ---
router.post('/generate-bio', async (req, res) => {
    try {
        const { niche, offer, platform, vibe } = req.body;

        if (!niche || !offer) {
            return res.status(400).json({ success: false, error: "Please provide your niche and offer." });
        }

        const selectedPlatform = platform || "Instagram";
        const selectedVibe = vibe || "Clear & Professional";

        const bioDataString = await generateBio(niche, offer, selectedPlatform, selectedVibe);
        const bioDataJSON = JSON.parse(bioDataString);

        res.json({ success: true, data: bioDataJSON });

    } catch (error) {
        console.error("Route Error (Bio Builder):", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
});

module.exports = router;
