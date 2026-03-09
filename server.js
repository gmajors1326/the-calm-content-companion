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
    try {
        const { niche, audience, tone } = req.body;
        // This is a test response; later you'll add your AI logic here
        const generatedBio = `✨ Helping ${audience} master ${niche} with a ${tone} approach.`;

        res.json({ bio: generatedBio });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
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
