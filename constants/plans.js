const PLANS = {
    FREE: {
        name: 'Free',
        dailyLimit: 14,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier']
    },
    STARTER: {
        name: 'Starter',
        dailyLimit: 150,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier']
    },
    PRO: {
        name: 'Pro',
        dailyLimit: 300,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier', 'extra-features']
    },
    ELITE: {
        name: 'Elite',
        dailyLimit: 600,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier', 'extra-features', 'image-generation']
    }
};

module.exports = PLANS;
