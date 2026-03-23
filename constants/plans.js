const PLANS = {
    FREE: {
        name: 'Free',
        dailyLimit: 2,
        features: ['find-your-voice', 'bio-builder', 'find-your-hook', 'content-planner', 'the-multiplier']
    },
    STARTER: {
        name: 'Starter',
        dailyLimit: 3,
        features: ['find-your-voice', 'bio-builder', 'find-your-hook', 'content-planner', 'the-multiplier']
    },
    PRO: {
        name: 'Pro',
        dailyLimit: 5,
        features: ['find-your-voice', 'bio-builder', 'find-your-hook', 'content-planner', 'the-multiplier', 'extra-features']
    },
    ELITE: {
        name: 'Elite',
        dailyLimit: 10,
        features: ['find-your-voice', 'bio-builder', 'find-your-hook', 'content-planner', 'the-multiplier', 'extra-features', 'image-generation']
    }
};

module.exports = PLANS;
