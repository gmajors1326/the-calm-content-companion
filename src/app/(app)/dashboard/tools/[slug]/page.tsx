'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import styles from './page.module.css';

const toolConfigs: Record<string, {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    examples: string[];
}> = {
    'hook-analyzer': {
        title: 'Find Your Hook',
        subtitle: 'Share a moment, an idea, or what you want to say. We\'ll help you find the Instagram opening that makes someone stop scrolling and actually listen.',
        placeholder: 'e.g., I was sitting in my car crying because I hated my job...',
        buttonText: 'Find My Hook',
        examples: [
            'I was sitting in my car crying because I hated my job and I decided that day to become a digital marketer and sell digital products from home so I could be there for my kids.',
            'I started my Instagram account at 52 with zero followers and no idea what I was doing. Here\'s what I wish someone had told me on day one.',
            'Nobody tells you how lonely it feels to start over in your 50s. But I did it anyway — and it changed my entire life.',
            'I made my first $200 online and I cried. Not because of the money. Because I finally believed I could actually do this.',
            'For 22 years I put everyone else first. This year I finally built something that was just mine — and it started with one post on Instagram.',
        ],
    },
    'positioning-builder': {
        title: 'Find Your Voice',
        subtitle: 'Tell us a little about yourself and who you want to reach on Instagram. We\'ll help you find the words that sound like you — calm, clear, and real.',
        placeholder: 'e.g., I\'m a mom who started over at 52. I help other women in their 40s and 50s...',
        buttonText: 'Find My Voice',
        examples: [
            'I\'m a 54-year-old mom who left a job I was miserable at to build a digital business from my kitchen table. Now I help other women who feel behind learn how to use Instagram to sell simple digital products.',
            'I spent 30 years as a nurse and burned out completely. Now I teach women over 45 how to create a calm, simple income online without tech stress or complicated systems.',
            'I\'m a grandma who had never sold anything online before. I figured it out one step at a time. Now I help other women my age see that it\'s not too late.',
            'I help beginner women on Instagram find their voice and their first customers — without posting every single day or pretending to be someone they\'re not.',
            'After my kids left home I felt lost. I started selling digital products on Instagram and found a whole new purpose. I help other empty nesters do the same.',
        ],
    },
    'content-planner': {
        title: 'Content Game Plan',
        subtitle: 'Share what you want to post about this week on Instagram. We\'ll turn your ideas into a calm, simple plan you can actually follow.',
        placeholder: 'e.g., I want to share my story, post about my products, and show my daily routine...',
        buttonText: 'Build My Plan',
        examples: [
            'I want to post 3 times this week on Instagram. I\'d like to share a piece of my story about leaving my old job, show how I set up my home workspace, and say something about the digital product I\'m selling — without it feeling salesy.',
            'I have no idea what to post. I sell a digital journal for women going through big life changes. I want my posts to feel warm and encouraging, not like ads.',
            'I want to share one personal story, one helpful tip about starting an online business, and one post that shows my product without it feeling pushy. I post every other day.',
            'I want to create content that answers the questions I had when I first started — things like how to make your first sale and how to show up on Instagram without feeling scared.',
            'I\'m trying to grow my audience from 200 to 500 followers this month. I want to mix personal posts with simple educational content about digital marketing for beginners.',
        ],
    },
    'engagement-interpreter': {
        title: "What's Working / What's Not",
        subtitle: "Share what you've been posting on Instagram and how people are responding. We'll help you understand what to keep doing — and what to try differently.",
        placeholder: 'e.g., My story post got a lot of DMs but my product posts get ignored...',
        buttonText: 'Decode My Engagement',
        examples: [
            'When I share personal stories about my life — like why I quit my job or a hard day at home — I get a lot of DMs and people saying "me too." But when I post about my digital products, almost nobody responds.',
            'My reels get a lot of views but no one is following me. My still photo posts get almost no views but I get more comments on them. I don\'t know what to focus on.',
            'I posted about my morning routine and it got more saves than anything I\'ve ever posted. But my posts about my actual products barely get any likes.',
            'Every time I share something vulnerable — like when I admitted I almost gave up — people flood my DMs. But my helpful tip posts get almost no reaction.',
            'I\'ve been posting every day for 3 weeks and my follower count hasn\'t moved. Some posts get 40 likes, some get 4. I can\'t figure out the pattern.',
        ],
    },
    'bio-builder': {
        title: 'Bio Builder',
        subtitle: 'Tell us who you are and who you help on Instagram. We\'ll write you a calm, clear bio that speaks directly to the right people.',
        placeholder: 'e.g., I\'m a mom of 3 who left a toxic job to sell digital products from home...',
        buttonText: 'Build My Bio',
        examples: [
            'I\'m a 58-year-old grandma who spent 20 years in a job that drained me. I started selling digital products on Instagram 8 months ago from home. Now I help women over 45 who feel like it\'s too late start their own simple online business.',
            'I\'m a retired teacher who started selling digital planners on Instagram at 61. I help other women who are new to all of this figure out where to even start.',
            'Mom, nurse for 28 years, now a digital product seller. I help burned-out women in their 40s and 50s build something calm and simple for themselves online.',
            'I left corporate at 49, clueless about Instagram, and built a small digital business from scratch. I now help beginners do the same — one calm step at a time.',
            'I\'m a 55-year-old who figured out Instagram later than most and made it work anyway. I help women who feel behind build a simple, quiet online income.',
        ],
    },
};

function randomFrom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const config = toolConfigs[slug];
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    if (!config) return <div className={styles.container}>Tool not found</div>;

    const handleAnalyze = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult({
                score: 85,
                analysis: "This hook is strong because it creates an immediate 'gap' in knowledge. The user wants to know HOW you achieved the result.",
                suggestion: "Try adding a specific timeframe or mechanism to make it even more concrete."
            });
            setIsLoading(false);
        }, 1500);
    };

    const pillStyle = {
        fontSize: '0.78rem',
        fontWeight: 600,
        background: 'var(--background)',
        border: '1px solid var(--border)',
        color: 'var(--secondary-text)',
        padding: '0.3rem 0.75rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.2s, color 0.2s',
    } as const;

    return (
        <div className={styles.container}>
            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={16} /> Back to Tools
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>{config.title}</h1>
                <p className={styles.subtitle}>{config.subtitle}</p>
            </header>

            <div className={styles.toolInterface}>
                <div className={styles.inputSection}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className={styles.label} style={{ marginBottom: 0 }}>Your input</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    style={pillStyle}
                                    onClick={() => setInput(randomFrom(config.examples))}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-text)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--secondary-text)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--background)'; }}
                                >
                                    ✨ Fill Example
                                </button>
                                <button
                                    style={{ ...pillStyle, opacity: (!input && !result) ? 0.4 : 1, cursor: (!input && !result) ? 'not-allowed' : 'pointer' }}
                                    onClick={() => { setInput(''); setResult(null); }}
                                    disabled={!input && !result}
                                    onMouseEnter={e => { if (input || result) { (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-text)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; } }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--secondary-text)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--background)'; }}
                                >
                                    ✕ Clear
                                </button>
                            </div>
                        </div>
                        <textarea
                            className={styles.textarea}
                            placeholder={config.placeholder}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles.analyzeBtn}
                        onClick={handleAnalyze}
                        disabled={isLoading || !input.trim()}
                    >
                        {isLoading ? (
                            <>Analyzing...</>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                {config.buttonText}
                            </>
                        )}
                    </button>
                </div>

                <div className={styles.outputSection}>
                    {!result && !isLoading && (
                        <div className={styles.outputPlaceholder}>
                            Output will appear here after analysis.
                        </div>
                    )}
                    {isLoading && (
                        <div className={styles.outputPlaceholder}>
                            Processing your input...
                        </div>
                    )}
                    {result && (
                        <div className={styles.results}>
                            <h2 className={styles.resultTitle}>Results</h2>
                            <div className={styles.scoreBadge}>Clarity Score: {result.score}/100</div>
                            <div style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--primary-text)' }}>Analysis: </strong>
                                <span style={{ color: 'var(--secondary-text)' }}>{result.analysis}</span>
                            </div>
                            <div className={styles.suggestionBox}>
                                <div className={styles.suggestionLabel}>Suggestion</div>
                                <div className={styles.suggestionText}>
                                    &ldquo;{result.suggestion}&rdquo;
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
