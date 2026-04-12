const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The old SDK doesn't have a direct listModels on genAI usually, 
        // it's often a separate fetch or not exposed in the same way.
        // But we can try to guess a few common ones.
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-2.5-flash", "gemini-3-flash"];
        
        console.log("Testing model availability...");
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("ping");
                console.log(`✅ ${m} is available`);
            } catch (e) {
                console.log(`❌ ${m} failed: ${e.message.split('\n')[0]}`);
            }
        }
    } catch (err) {
        console.error("Test failed:", err);
    }
}

listModels();
