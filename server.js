require('dotenv').config();
const express = require('express');
const cors = require('cors');
const toolRoutes = require('./routes/tools');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allowing specific Wix site
const corsOptions = {
    origin: process.env.WIX_SITE_URL || '*', // In production, replace with your actual Wix URL
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', toolRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Allowing requests from: ${process.env.WIX_SITE_URL || 'All origins (Warning: Set WIX_SITE_URL in .env)'}`);
});
