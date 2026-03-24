const PLANS = {
    FREE: {
        name: 'Free',
        dailyLimit: 2,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier']
    },
    STARTER: {
        name: 'Starter',
        dailyLimit: 3,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier']
    },
    PRO: {
        name: 'Pro',
        dailyLimit: 5,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier', 'extra-features']
    },
    ELITE: {
        name: 'Elite',
        dailyLimit: 10,
        features: ['find-your-voice', 'voice-architect', 'bio-builder', 'find-your-hook', 'content-planner', 'weekly-strategist', 'the-multiplier', 'extra-features', 'image-generation']
    }
};

module.exports = PLANS;
