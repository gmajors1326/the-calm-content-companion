import Link from 'next/link';
import { PenTool, Target, Map, MessageCircle, User, Zap } from 'lucide-react';
import styles from './page.module.css';

const tools = [
    {
        id: 'hook-analyzer',
        name: 'Find Your Hook',
        description: 'You share your idea, and this tool helps you uncover the strongest way to open it — the part that makes someone pause instead of scroll.',
        path: '/dashboard/tools/hook-analyzer',
        icon: PenTool,
        comingSoon: false,
    },
    {
        id: 'find-your-voice',
        name: 'Find Your Voice',
        description: 'This tool helps you figure out what you truly believe and how you want to show up in your content. It builds your Voice Guide 1.0 — your personal language rules, 5 hook types, and a ready-to-post caption in your exact voice.',
        path: '/dashboard/tools/find-your-voice',
        icon: Target,
        comingSoon: false,
    },
    {
        id: 'content-game-plan',
        name: 'Content Game Plan',
        description: 'Drop your raw, unstructured idea and get back a full content plan — strategic intent, 5 hook variants, ready-to-post content for Carousel, Reel or Caption, dual CTAs, and a mobile scan verification.',
        path: '/dashboard/tools/content-game-plan',
        icon: Map,
        comingSoon: false,
    },
    {
        id: 'engagement-interpreter',
        name: "What's Working / What's Not",
        description: "Share your metrics — messy notes or raw numbers. We compare against 2026 benchmarks, identify high-value signals (saves, shares) vs friction points (watch time, reach drops), and give you one Stop Doing, one Double Down, and 5 repair hooks.",
        path: '/dashboard/tools/engagement-interpreter',
        icon: MessageCircle,
        comingSoon: false,
    },
    {
        id: 'bio-builder',
        name: 'Bio Builder',
        description: 'Tell us who you are and who you help. Get back 5 Instagram bio variants — each under 150 characters, each with a different strategic angle. Includes name field suggestion, keywords, soft + direct CTAs, and a live mobile preview.',
        path: '/dashboard/tools/bio-builder',
        icon: User,
        comingSoon: false,
    },
    {
        id: 'calm-intent',
        name: 'Calm Intent',
        description: 'Semantic DM automation that actually sounds human. No keywords — just AI that reads comment intent and dispatches a perfectly-matched, conversational reply to your digital product.',
        path: '/dashboard/tools/calm-intent',
        icon: Zap,
        comingSoon: true,
    },
];

export default function ToolsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Tools</h1>
                <p className={styles.subtitle}>Select a tool to start shaping your content.</p>
            </header>

            <div className={styles.grid}>
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={tool.path}
                        className={`${styles.card} ${tool.comingSoon ? styles.cardLocked : ''}`}
                    >
                        <div className={styles.cardHeader}>
                            <div className={`${styles.iconWrapper} ${tool.comingSoon ? styles.iconLocked : ''}`}>
                                <tool.icon size={20} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                                <h2 className={styles.cardTitle}>{tool.name}</h2>
                                {tool.comingSoon && (
                                    <span className={styles.comingSoonBadge}>Coming Soon</span>
                                )}
                            </div>
                        </div>
                        <p className={styles.cardDesc}>{tool.description}</p>
                        {tool.comingSoon && (
                            <p className={styles.cardCta}>See what&apos;s coming →</p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
