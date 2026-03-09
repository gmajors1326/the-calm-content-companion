require('dotenv').config();
const express = require('express');
const cors = require('cors');
const toolRoutes = require('./routes/tools');

const app = express();
const PORT = process.env.PORT || 3001;

// Use this to allow your Wix site to talk to your backend
app.use(cors());

app.use(express.json());

app.post('/generate-bio', async (req, res) => {
    const { niche, audience, tone } = req.body;

    // This is where you call your OpenAI or AI model
    // For now, we'll send a test response to make sure the "plumbing" works
    const aiResponse = `✨ Professional ${tone} bio for a ${niche} expert helping ${audience}.`;

    res.json({ bio: aiResponse });
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
