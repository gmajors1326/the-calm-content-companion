require('dotenv').config();
const express = require('express');
const cors = require('cors');
const toolRoutes = require('./routes/tools');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. ALLOW CORS
// Using a simple app.use(cors()) allows all origins, which is easiest for testing.
app.use(cors());

// 2. PARSE JSON
// This allows your server to read the {niche, audience, tone} you're sending.
app.use(express.json());

// 3. THE BIO BUILDER ROUTE
app.post('/generate-bio', async (req, res) => {
    try {
        const { niche, audience, tone } = req.body;

        // Validation check
        if (!niche || !audience) {
            return res.status(400).json({ error: "Missing niche or audience" });
        }

        // PLACEHOLDER FOR AI LOGIC
        // This is where you'll eventually add your OpenAI/Antigravity AI call.
        const generatedBio = `✨ Helping ${audience} master ${niche} with a ${tone} approach. #TheCalmContentMethod`;

        // Send the response back to Wix
        res.json({ bio: generatedBio });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
