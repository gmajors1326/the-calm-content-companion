const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google AI (Make sure your API Key is in your .env file or Render secrets)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Helper function to handle the different tool logic
const getPromptForTool = (toolId, input) => {
    const prompts = {
        'hook-gen': `Generate 5 viral Instagram hooks for a digital product creator based on this topic: ${input}. Focus on curiosity and urgency.`,
        'voice-align': `Rewrite the following text to sound more authentic, empathetic, and human, avoiding "marketing-speak": ${input}`,
        'direction-plan': `Create a 3-day content pillar strategy for a creator focusing on: ${input}. Include one educational, one personal, and one promotional angle.`,
        'bio-build': `Write 3 professional yet minimalist Instagram bios for: ${input}. Use clean formatting and a clear call to action.`,
        'caption-pro': `Write a high-converting Instagram caption for this idea: ${input}. Include a hook, body paragraphs with value, and a soft CTA.`,
        'story-starters': `Give me 5 engaging 'This or That' or poll ideas for Instagram stories about: ${input}.`,
        'lead-magnet': `Brainstorm 3 digital product freebie ideas (PDFs, templates, or checklists) for an audience interested in: ${input}.`,
        'repurpose-logic': `Take this long-form thought and break it into 3 short, punchy tweets or threads: ${input}`,
        'engagement-riffs': `Write 3 thoughtful comment templates I can use to engage with others in the niche of: ${input}.`,
        'keyword-scout': `List 10 trending SEO keywords and 5 niche hashtags for: ${input}. (Do not use # symbols in the raw output to avoid UI leakage).`
    };
    return prompts[toolId] || `Process this request: ${input}`;
};

// The Main API Route
app.post('/api/generate', async (req, res) => {
    const { toolId, userInput } = req.body;

    if (!userInput) {
        return res.status(400).json({ error: "Input is required" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = getPromptForTool(toolId, userInput);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ output: text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate content. Check your API key." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
