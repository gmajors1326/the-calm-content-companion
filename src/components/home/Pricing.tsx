import Link from 'next/link';
import { Check } from 'lucide-react';
import styles from './Pricing.module.css';

const plans = [
    {
        name: 'Starter',
        price: '$7',
        period: '/mo',
        badge: null,
        cardStyle: '',
        ctaStyle: '',
        ctaText: 'Get Started',
        ctaHref: '/get-started?plan=starter',
        features: [
            '3 tool uses per day',
            'Access to core tools',
            'Fill Example on every tool',
            'Standard support',
        ],
    },
    {
        name: 'Pro',
        price: '$17',
        period: '/mo',
        badge: 'Most Popular',
        cardStyle: 'proCard',
        ctaStyle: 'ctaPrimary',
        ctaText: 'Get Started',
        ctaHref: '/get-started?plan=pro',
        features: [
            'Unlimited tool uses',
            'All 5 tools unlocked',
            'AI scores, analysis & 3 improved variations',
            'Instagram Pro Tip on every result',
            'Save your results to your library',
            'Content Game Plan tool',
            'Priority support',
        ],
    },
    {
        name: 'Elite',
        price: '$47',
        period: '/mo',
        badge: '🔥 Best Value',
        cardStyle: 'eliteCard',
        ctaStyle: 'ctaElite',
        ctaText: 'Go Elite',
        ctaHref: '/get-started?plan=elite',
        features: [
            'Everything in Pro',
            'Content → Full Caption Writer',
            'Content → Reel Script Builder',
            'Batch Content Comparator (3 at once)',
            'Result history & progress tracking',
            'Monthly custom content pack',
            '1-on-1 monthly content review',
            'Priority AI (GPT-4o full model)',
        ],
    },
];

export default function Pricing() {
    return (
        <section className={styles.section}>
            <div className={styles.maxW}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Simple, Transparent Pricing</h2>
                    <p className={styles.subtitle}>No hidden fees. No surprises. Cancel any time.</p>
                </div>
                <div className={styles.grid}>
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={[styles.card, plan.cardStyle ? styles[plan.cardStyle as keyof typeof styles] : ''].filter(Boolean).join(' ')}
                        >
                            {plan.badge && (
                                <div className={styles.popularBadge}>{plan.badge}</div>
                            )}
                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.price}>
                                {plan.price} <span className={styles.period}>{plan.period}</span>
                            </div>
                            <ul className={styles.features}>
                                {plan.features.map((f) => (
                                    <li key={f} className={styles.feature}>
                                        <Check size={16} className={styles.check} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.ctaHref}
                                className={[styles.cta, plan.ctaStyle ? styles[plan.ctaStyle as keyof typeof styles] : ''].filter(Boolean).join(' ')}
                            >
                                {plan.ctaText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
