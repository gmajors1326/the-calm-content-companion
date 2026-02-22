'use client';
import { use } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

// Mock data for the example
const toolData = {
    title: "Find Your Hook",
    subtitle: "You share your idea, and this tool helps you uncover the strongest way to open it.",
    whatItDoes: "You share your idea, and this tool helps you uncover the strongest way to open it. It finds the part that makes someone pause instead of scroll. In simple terms, it helps you start your content in a way that actually grabs attention without sounding forced.",
    whatYouGet: [
        "Clarity Score (0-100)",
        "Curiosity Driver Identification",
        "Friction Point Highlighting",
        "3 Rewrite Suggestions"
    ],
    demo: {
        original: "I want to tell you about how I made money.",
        score: 42,
        feedback: "Too vague. 'Made money' is generic. No timeframe. No mechanism.",
        suggestion: "Here is the exact framework I used to add $10k to my revenue in 14 days without ads."
    },
    testimonials: [
        { text: "This tool saved me from posting generic fluff. My engagement doubled.", author: "Sarah J., Creator" },
        { text: "Simple, calm, effective. Exactly what I needed.", author: "Mark T., Writer" },
        { text: "The rewrite suggestions are surprisingly human.", author: "Elena R., Founder" }
    ]
};

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    // In a real app, we'd fetch data based on slug
    // For now, we use the mock data

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', color: 'var(--sage-accent)', marginBottom: '1rem', fontWeight: 600 }}>
                    Tool
                </div>
                <h1 className={styles.title}>{toolData.title}</h1>
                <p className={styles.subtitle}>{toolData.subtitle}</p>
            </header>

            <section className={styles.grid}>
                <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>What it does</h2>
                    <p className={styles.whatItDoes}>{toolData.whatItDoes}</p>
                </div>
                <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>What you get</h2>
                    <ul className={styles.whatYouGetList}>
                        {toolData.whatYouGet.map((item, i) => (
                            <li key={i} className={styles.listItem}>
                                <Check size={18} className={styles.check} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={styles.demoBox}>
                <div className={styles.demoLabel}>Demo Output Preview</div>

                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#fcfcfc', border: '1px dashed var(--border)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '0.5rem' }}>Input</div>
                    <p style={{ fontStyle: 'italic', color: 'var(--primary-text)' }}>"{toolData.demo.original}"</p>
                </div>

                <div className={styles.demoContent}>
                    <div className={styles.scoreBadge}>Score: {toolData.demo.score}/100</div>
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Analysis:</strong> <span style={{ color: '#e05e5e' }}>Weak.</span> {toolData.demo.feedback}
                    </div>
                    <div>
                        <strong>Suggestion:</strong>
                        <p style={{ marginTop: '0.5rem', color: 'var(--deep-olive)', fontWeight: 500 }}>
                            "{toolData.demo.suggestion}"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className={styles.header} style={{ fontSize: '2rem', marginBottom: '3rem' }}>Trusted by creators</h2>
                <div className={styles.testimonials}>
                    {toolData.testimonials.map((t, i) => (
                        <div key={i} className={styles.testimonial}>
                            <p>"{t.text}"</p>
                            <div className={styles.author}>— {t.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.upgrade}>
                <h2 className={styles.upgradeTitle}>Unlock the full tool</h2>
                <p className={styles.upgradeText}>
                    Get unlimited analyses, history saving, and advanced rewrite modes with The Calm Content Companion Pro.
                </p>
                <Link href="/pricing" className={styles.upgradeBtn}>
                    Upgrade to Pro
                </Link>
            </section>

        </div>
    );
}
