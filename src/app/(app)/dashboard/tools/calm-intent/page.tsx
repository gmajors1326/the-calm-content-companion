'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Check } from 'lucide-react';
import styles from './page.module.css';

/* ─── Animated mock data ── */
const COMMENTS = [
    { handle: '@maria_restarts', avatar: 'M', text: "Ugh, I've been struggling so much with organizing my content lately 😩", time: '2s ago', matched: 'Content Overwhelm' },
    { handle: '@linda_5oclockfreedom', avatar: 'L', text: "I really want to start selling digital products but I have no idea where to begin", time: '18s ago', matched: 'Starter Kit Need' },
    { handle: '@teachertodreamer', avatar: 'T', text: "How do you even price your stuff when nobody knows you yet??", time: '41s ago', matched: 'Pricing Confusion' },
    { handle: '@carols_comeback', avatar: 'C', text: "This is literally what I needed to hear. I feel like I'm too old for this 😭", time: '1m ago', matched: 'Confidence Gap' },
    { handle: '@restartat52', avatar: 'R', text: "Do you have anything that goes deeper into the strategy side?", time: '2m ago', matched: 'Strategy Product' },
];

const INTENT_NODES = [
    { label: 'Content Overwhelm', color: '#a78bfa', product: 'Content Reset Mini-Course — $37' },
    { label: 'Starter Kit Need', color: '#60a5fa', product: 'Digital Product Starter Bundle — $27' },
    { label: 'Pricing Confusion', color: '#34d399', product: 'Pricing Confidence Guide — $19' },
    { label: 'Confidence Gap', color: '#f472b6', product: 'Restart Your Voice — Free Lead Magnet' },
    { label: 'Strategy Product', color: '#fbbf24', product: 'Simple IG Strategy Course — $97' },
];

export default function CalmIntentPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [activeComment, setActiveComment] = useState(0);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
    }

    const active = COMMENTS[activeComment];
    const matchedNode = INTENT_NODES.find(n => n.label === active.matched);

    return (
        <div className={styles.page}>
            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={15} /> Back to Tools
            </Link>

            {/* ── Hero ── */}
            <div className={styles.hero}>
                <div className={styles.heroBadge}>
                    <Zap size={12} />
                    Coming Soon
                </div>
                <h1 className={styles.heroTitle}>Calm Intent</h1>
                <p className={styles.heroSub}>
                    The first DM engine that doesn&apos;t use keywords.<br />
                    It reads what your followers actually mean — and replies like a human.
                </p>
            </div>

            {/* ── Animated Canvas ── */}
            <div className={styles.canvas}>
                {/* Left: Comments Feed */}
                <div className={styles.feedPanel}>
                    <p className={styles.panelLabel}>
                        <span className={styles.liveDot} />
                        Incoming Signals
                    </p>
                    <div className={styles.feedList}>
                        {COMMENTS.map((c, i) => (
                            <button
                                key={i}
                                className={`${styles.commentCard} ${activeComment === i ? styles.commentCardActive : ''}`}
                                onClick={() => setActiveComment(i)}
                            >
                                <div className={styles.commentHeader}>
                                    <div className={styles.avatar}>{c.avatar}</div>
                                    <div>
                                        <p className={styles.commentHandle}>{c.handle}</p>
                                        <p className={styles.commentTime}>{c.time}</p>
                                    </div>
                                    {activeComment === i && (
                                        <span className={styles.matchingPill}>Matching…</span>
                                    )}
                                </div>
                                <p className={styles.commentText}>{c.text}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center: Intent Engine */}
                <div className={styles.enginePanel}>
                    <p className={styles.panelLabel}>Intent Engine</p>
                    <div className={styles.engineCore}>
                        <div className={styles.engineOrb}>
                            <div className={styles.orbRing} />
                            <div className={styles.orbInner}>
                                <Zap size={22} color="#a78bfa" />
                            </div>
                        </div>
                        <div className={styles.intentNodeList}>
                            {INTENT_NODES.map((node, i) => (
                                <div
                                    key={i}
                                    className={`${styles.intentNode} ${active.matched === node.label ? styles.intentNodeActive : ''}`}
                                    style={{ '--node-color': node.color } as React.CSSProperties}
                                >
                                    {node.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SVG bezier line */}
                    <svg className={styles.bezierSvg} viewBox="0 0 200 80" preserveAspectRatio="none">
                        <path
                            d="M 0 40 C 60 40, 140 40, 200 40"
                            stroke="url(#flowGrad)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="4 3"
                            className={styles.bezierPath}
                        />
                        <defs>
                            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
                                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Right: DM Dispatch */}
                <div className={styles.dispatchPanel}>
                    <p className={styles.panelLabel}>
                        DM Dispatched
                        <span className={styles.dispatchBadge}>Instant</span>
                    </p>
                    <div className={styles.dmPreview}>
                        <div className={styles.dmHeader}>
                            <div className={styles.dmAvatar}>You</div>
                            <div>
                                <p className={styles.dmName}>Calm Content Tools</p>
                                <p className={styles.dmStatus}>● Active now</p>
                            </div>
                        </div>
                        <div className={styles.dmBubble}>
                            <p>
                                Hey {active.handle.replace('@', '')} 👋 Saw your comment about{' '}
                                {active.matched === 'Content Overwhelm' ? 'content organization' :
                                    active.matched === 'Starter Kit Need' ? 'getting started with digital products' :
                                        active.matched === 'Pricing Confusion' ? 'pricing your work' :
                                            active.matched === 'Confidence Gap' ? 'feeling like it\'s too late' :
                                                'going deeper on strategy'}.
                            </p>
                            <br />
                            <p>
                                I actually have something that solves exactly that —{' '}
                                <strong>{matchedNode?.product}</strong>.
                            </p>
                            <br />
                            <p>Want me to drop the link? 🙌</p>
                        </div>
                        <div className={styles.dmMatchNote}>
                            ✓ Matched to <strong>{active.matched}</strong> · Zero keywords used
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Why it's different ── */}
            <div className={styles.pillarsRow}>
                <div className={styles.pillar}>
                    <p className={styles.pillarIcon}>🚫</p>
                    <p className={styles.pillarTitle}>No keyword mapping</p>
                    <p className={styles.pillarText}>Followers don&apos;t need to comment a magic word. Calm Intent reads the meaning, not the string.</p>
                </div>
                <div className={styles.pillar}>
                    <p className={styles.pillarIcon}>💬</p>
                    <p className={styles.pillarTitle}>Sounds 100% human</p>
                    <p className={styles.pillarText}>Every DM is generated fresh from the comment. It references exactly what they said — not a template.</p>
                </div>
                <div className={styles.pillar}>
                    <p className={styles.pillarIcon}>🎯</p>
                    <p className={styles.pillarTitle}>Routes to the right product</p>
                    <p className={styles.pillarText}>You describe your digital products once. Calm Intent matches intent to offer behind the scenes.</p>
                </div>
                <div className={styles.pillar}>
                    <p className={styles.pillarIcon}>📖</p>
                    <p className={styles.pillarTitle}>Story replies too</p>
                    <p className={styles.pillarText}>A ❤️ on a behind-the-scenes Story becomes a warm, personal DM lead. No extra setup.</p>
                </div>
            </div>

            {/* ── Waitlist ── */}
            <div className={styles.waitlistBox}>
                <p className={styles.waitlistEyebrow}>Early Access</p>
                <h2 className={styles.waitlistTitle}>Be first when Calm Intent launches.</h2>
                <p className={styles.waitlistSub}>
                    We&apos;re building the beta with a small group. Early access members get lifetime pricing.
                </p>
                {submitted ? (
                    <div className={styles.successMsg}>
                        <Check size={18} />
                        You&apos;re on the list. We&apos;ll email you when beta opens.
                    </div>
                ) : (
                    <form className={styles.waitlistForm} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            className={styles.waitlistInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className={styles.waitlistBtn}>
                            <Zap size={15} /> Notify Me First
                        </button>
                    </form>
                )}
                <p className={styles.waitlistHint}>No spam. Unsubscribe any time.</p>
            </div>
        </div>
    );
}
