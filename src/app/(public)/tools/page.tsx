'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const tools = [
    {
        name: 'Find Your Hook',
        benefit: 'Uncover the strongest way to open your idea — the part that makes someone pause instead of scroll. Start without sounding forced.',
        category: 'Clarity',
        link: '/tools/hook-analyzer',
        freeRuns: 3,
    },

    {
        name: 'Find Your Voice',
        benefit: 'Figure out what you truly believe and how you want to show up — so your content sounds like you, not everyone else.',
        category: 'Strategy',
        link: '/tools/positioning-builder'
    },
    {
        name: 'Content Game Plan',
        benefit: 'Turn scattered ideas into a clear plan you can actually follow — so you\'re not guessing what to post every day.',
        category: 'Strategy',
        link: '/tools/content-planner'
    },
    {
        name: "What's Working / What's Not",
        benefit: "See clearly which posts connect and which fall flat — then stop guessing and repeat what actually works.",
        category: 'Engagement',
        link: '/tools/engagement-interpreter'
    },
    {
        name: 'Bio Builder',
        benefit: 'Write a clear, simple bio that explains who you are — so people instantly understand why they should follow you.',
        category: 'Clarity',
        link: '/tools/bio-builder'
    }
];

const categories = ['All', 'Clarity', 'Strategy', 'Engagement'];

export default function ToolsPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredTools = activeFilter === 'All'
        ? tools
        : tools.filter(tool => tool.category === activeFilter);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Our Tools</h1>
                <p className={styles.subtitle}>Specific instruments for specific communication problems.</p>
            </div>

            <div className={styles.filters}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`${styles.filter} ${activeFilter === cat ? styles.active : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredTools.map((tool) => (
                    <Link key={tool.name} href={tool.link} className={styles.card}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                <h2 className={styles.cardTitle} style={{ margin: 0 }}>{tool.name}</h2>
                                {'freeRuns' in tool && tool.freeRuns && (
                                    <span style={{
                                        fontSize: '0.68rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                        background: 'rgba(111,127,106,0.12)',
                                        color: 'var(--sage-accent)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '99px',
                                        border: '1px solid rgba(111,127,106,0.25)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tool.freeRuns} free runs
                                    </span>
                                )}
                            </div>
                            <p className={styles.cardBenefit}>{tool.benefit}</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.categoryTag}>{tool.category}</span>
                            <ArrowRight size={18} strokeWidth={1.5} color="var(--sage-accent)" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
