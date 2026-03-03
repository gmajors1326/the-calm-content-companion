const express = require('express');
const router = express.Router();
const { generateHook } = require('../services/openai');

// POST endpoint for the Find Your Hook tool
// URL will be: http://localhost:3000/api/generate-hook
router.post('/generate-hook', async (req, res) => {
    try {
        // Grab the text the user typed in the Wix dashboard
        const { userInput } = req.body;

        // Validation: Make sure they actually sent something
        if (!userInput) {
            return res.status(400).json({ success: false, error: "Please provide an idea to generate hooks." });
        }

        // Call the OpenAI service
        const generatedHooks = await generateHook(userInput);

        // Send the successful response back to Wix
        res.json({
            success: true,
            data: generatedHooks
        });

    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
});

module.exports = router;
