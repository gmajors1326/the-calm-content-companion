import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ToolsGrid.module.css';

const tools = [
    {
        name: 'Find Your Hook',
        benefit: 'Uncover the strongest way to open your idea — the part that makes someone pause instead of scroll.',
        link: '/tools/hook-analyzer'
    },
    {
        name: 'Find Your Voice',
        benefit: 'Figure out what you truly believe and how to show up — so your content sounds like you, not everyone else.',
        link: '/tools/positioning-builder'
    },
    {
        name: 'Content Game Plan',
        benefit: 'Turn scattered ideas into a clear plan you can actually follow — no more guessing what to post.',
        link: '/tools/content-planner'
    },
    {
        name: "What's Working / What's Not",
        benefit: 'See clearly which posts connect and which fall flat — then stop guessing and repeat what works.',
        link: '/tools/engagement-interpreter'
    },
    {
        name: 'Bio Builder',
        benefit: 'Write a clear, simple bio that explains who you are — so people instantly understand why they should follow you.',
        link: '/tools/bio-builder'
    }
];

export default function ToolsGrid() {
    return (
        <section className={styles.section}>
            <div className={styles.maxW}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Refine Your Craft</h2>
                    <p className={styles.subtitle}>Specific tools for specific clarity problems.</p>
                </div>
                <div className={styles.grid}>
                    {tools.map((tool) => (
                        <Link key={tool.name} href={tool.link} className={styles.card}>
                            <div className={styles.cardTop}>
                                <h3 className={styles.cardTitle}>{tool.name}</h3>
                                <p className={styles.benefit}>{tool.benefit}</p>
                            </div>
                            <span className={styles.link}>
                                Open Tool <ArrowRight size={16} />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
