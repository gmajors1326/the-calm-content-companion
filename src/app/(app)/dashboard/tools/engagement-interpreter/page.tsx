'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

/* ─── Examples ─────────────────────────────────────────────── */
const EXAMPLES = [
    {
        data: "I've been posting Reels for 3 weeks. Views stuck at 200, but I got 15 saves on my last post. 847 followers. Nobody's commenting much but a few people have DM'd me saying they loved it.",
        followers: '847',
        contentType: 'Reels',
        goal: 'Grow my audience and eventually sell a digital product',
    },
    {
        data: "Posted 4 carousels this month. First one got 2,400 reach and 47 saves. Second one got 890 reach and 3 saves. Third got 1,100 reach and 8 saves. Last one got 400 reach. I have 3,200 followers. I don't understand why there's so much variation.",
        followers: '3,200',
        contentType: 'Carousels',
        goal: 'Consistent engagement and save rates',
    },
    {
        data: "My Reels get decent views (400-600) but my watch time is terrible — most people drop off in the first 3 seconds. I have 1,800 followers. Likes are okay (30-40) but saves are almost zero. Feels like people watch but don't care.",
        followers: '1,800',
        contentType: 'Reels',
        goal: 'Get more saves and build authority',
    },
    {
        data: "I have 12,400 followers but only get 180-220 likes per post. My Reels get about 800-900 views which feels low for my size. I do get about 25-30 saves per carousel though. Comments are minimal. I post 5 times a week.",
        followers: '12,400',
        contentType: 'Mixed — Reels and Carousels',
        goal: 'Understand why reach dropped and how to fix it',
    },
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Types ─────────────────────────────────────────────────── */
type Signal = { signal: string; value: string; why: string; badge: string };
type Hook = { text: string; framework: string; targets: string };
type BenchmarkRow = { metric: string; yourNumber: string; benchmark: string; status: 'above' | 'at' | 'below' | 'unknown' };

type AuditResult = {
    accountContext: {
        followerTier: string;
        contentFocus: string;
        trajectory: string;
        trajectoryNote: string;
    };
    benchmarkComparison: BenchmarkRow[];
    signals: {
        working: Signal[];
        notWorking: Signal[];
    };
    stopDoing: { what: string; why: string; instead: string };
    doubleDown: { what: string; why: string; how: string };
    hookRepairSet: Hook[];
    oneTakeaway: string;
    oneAction: string;
};

type State = 'idle' | 'loading' | 'result' | 'error';

/* ─── Component ─────────────────────────────────────────────── */
export default function EngagementInterpreterPage() {
    const [data, setData] = useState('');
    const [followers, setFollowers] = useState('');
    const [contentType, setContentType] = useState('');
    const [goal, setGoal] = useState('');
    const [state, setState] = useState<State>('idle');
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState('');
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'result' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [state]);

    function fillExample() {
        const pick = randomFrom(EXAMPLES);
        setData(pick.data);
        setFollowers(pick.followers);
        setContentType(pick.contentType);
        setGoal(pick.goal);
    }

    function clearAll() {
        setData('');
        setFollowers('');
        setContentType('');
        setGoal('');
        setState('idle');
        setResult(null);
        setError('');
    }

    async function analyze() {
        if (!data.trim()) return;
        setState('loading');
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/engagement-interpreter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data, followers, contentType, goal }),
            });

            const json = await res.json();

            if (!res.ok || json.error) {
                setError(json.error || 'Analysis failed. Please try again.');
                setState('error');
                return;
            }

            setResult(json);
            setState('result');
        } catch {
            setError('Network error. Please check your connection.');
            setState('error');
        }
    }

    const STATUS_COLOR: Record<string, string> = {
        above: styles.benchAbove,
        at: styles.benchAt,
        below: styles.benchBelow,
        unknown: styles.benchUnknown,
    };

    const TRAJECTORY_COLOR: Record<string, string> = {
        Rising: styles.trajRising,
        Flat: styles.trajFlat,
        Declining: styles.trajDecline,
        Unclear: styles.trajUnknown,
    };

    return (
        <div className={styles.page}>
            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={15} /> Back to Tools
            </Link>

            <header className={styles.header}>
                <p className={styles.eyebrow}>Tool 04</p>
                <h1 className={styles.title}>What&apos;s Working / What&apos;s Not</h1>
                <p className={styles.subtitle}>
                    Share your Instagram metrics — messy is fine. We&apos;ll run them against 2026
                    benchmarks and tell you exactly what to stop, what to double down on, and how to fix your hooks.
                </p>
            </header>

            <div className={styles.grid}>
                {/* ── INPUT PANEL ── */}
                <div className={styles.inputPanel}>
                    <div className={styles.panelTop}>
                        <span className={styles.panelTitle}>Your Data</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={styles.fillBtn} onClick={fillExample}>✨ Fill Example</button>
                            <button
                                className={styles.fillBtn}
                                onClick={clearAll}
                                disabled={!data && state === 'idle'}
                                style={{ opacity: !data && state === 'idle' ? 0.4 : 1 }}
                            >✕ Clear</button>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Your performance data or situation *</label>
                        <textarea
                            className={styles.textarea}
                            placeholder={`Paste your numbers or just describe what's happening — e.g.:\n\n"Posted 3 Reels this week. Views: 200, 180, 240. Got 15 saves on the second one but almost no comments. Watch time feels low. 1,200 followers."`}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            rows={6}
                        />
                    </div>

                    <div className={styles.fieldRow}>
                        <div>
                            <label className={styles.label}>Follower count <span className={styles.optional}>(optional)</span></label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g., 1,240"
                                value={followers}
                                onChange={(e) => setFollowers(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Content type <span className={styles.optional}>(optional)</span></label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g., Reels, Carousels"
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>What are you trying to achieve? <span className={styles.optional}>(optional)</span></label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '60px' }}
                            placeholder="e.g., Get more saves and build authority before launching my digital product."
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={analyze}
                        disabled={state === 'loading' || !data.trim()}
                    >
                        {state === 'loading' ? (
                            <><span className={styles.btnSpinner} />Running your audit...</>
                        ) : (
                            <><MessageCircle size={17} />Run My Audit</>
                        )}
                    </button>
                    <p className={styles.btnHint}>Takes about 10 seconds</p>
                </div>

                {/* ── OUTPUT PANEL ── */}
                <div className={styles.outputPanel}>
                    {state === 'idle' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📊</div>
                            <p className={styles.emptyTitle}>Your audit will appear here</p>
                            <p className={styles.emptyText}>
                                Share any mix of data — views, saves, watch time, comments.
                                Messy descriptions work too. We&apos;ll figure out what&apos;s working.
                            </p>
                        </div>
                    )}

                    {state === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p className={styles.loadingText}>Comparing against 2026 benchmarks...</p>
                        </div>
                    )}

                    {state === 'error' && (
                        <div className={styles.errorBox}>{error}</div>
                    )}

                    {state === 'result' && result && (
                        <div className={styles.results} ref={resultsRef}>
                            <p className={styles.resultsHeader}>Engagement Audit</p>

                            {/* ── Account Context ── */}
                            <div className={styles.contextBar}>
                                <div className={styles.contextItem}>
                                    <span className={styles.contextKey}>Tier</span>
                                    <span className={styles.contextVal}>{result.accountContext.followerTier}</span>
                                </div>
                                <div className={styles.contextItem}>
                                    <span className={styles.contextKey}>Content</span>
                                    <span className={styles.contextVal}>{result.accountContext.contentFocus}</span>
                                </div>
                                <div className={styles.contextItem}>
                                    <span className={styles.contextKey}>Trajectory</span>
                                    <span className={`${styles.contextVal} ${TRAJECTORY_COLOR[result.accountContext.trajectory] || ''}`}>
                                        {result.accountContext.trajectory}
                                    </span>
                                </div>
                            </div>
                            {result.accountContext.trajectoryNote && (
                                <p className={styles.trajectoryNote}>{result.accountContext.trajectoryNote}</p>
                            )}

                            {/* ── Benchmark Comparison ── */}
                            {result.benchmarkComparison?.length > 0 && (
                                <div className={styles.section}>
                                    <p className={styles.sectionLabel}>2026 Benchmark Comparison</p>
                                    <div className={styles.benchTable}>
                                        <div className={styles.benchHeader}>
                                            <span>Metric</span><span>Yours</span><span>Benchmark</span><span>Status</span>
                                        </div>
                                        {result.benchmarkComparison.map((row, i) => (
                                            <div key={i} className={styles.benchRow}>
                                                <span className={styles.benchMetric}>{row.metric}</span>
                                                <span className={styles.benchNum}>{row.yourNumber}</span>
                                                <span className={styles.benchNum}>{row.benchmark}</span>
                                                <span className={`${styles.benchStatus} ${STATUS_COLOR[row.status] || ''}`}>
                                                    {row.status === 'above' ? '↑ Above' : row.status === 'at' ? '→ At' : row.status === 'below' ? '↓ Below' : '? N/A'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Signals: Working ── */}
                            {result.signals.working?.length > 0 && (
                                <div className={styles.section}>
                                    <p className={styles.sectionLabel}>✓ What&apos;s Working</p>
                                    <div className={styles.signalList}>
                                        {result.signals.working.map((s, i) => (
                                            <div key={i} className={`${styles.signalCard} ${styles.signalWorking}`}>
                                                <div className={styles.signalTop}>
                                                    <span className={styles.signalBadge}>{s.badge}</span>
                                                    <span className={styles.signalValue}>{s.value}</span>
                                                </div>
                                                <p className={styles.signalName}>{s.signal}</p>
                                                <p className={styles.signalWhy}>{s.why}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Signals: Not Working ── */}
                            {result.signals.notWorking?.length > 0 && (
                                <div className={styles.section}>
                                    <p className={styles.sectionLabel}>✕ What&apos;s Not Working</p>
                                    <div className={styles.signalList}>
                                        {result.signals.notWorking.map((s, i) => (
                                            <div key={i} className={`${styles.signalCard} ${styles.signalBroken}`}>
                                                <div className={styles.signalTop}>
                                                    <span className={`${styles.signalBadge} ${styles.signalBadgeBroken}`}>{s.badge}</span>
                                                    <span className={styles.signalValue}>{s.value}</span>
                                                </div>
                                                <p className={styles.signalName}>{s.signal}</p>
                                                <p className={styles.signalWhy}>{s.why}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Stop / Double Down ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Recommendations</p>
                                <div className={styles.recoGrid}>
                                    <div className={`${styles.recoCard} ${styles.recoStop}`}>
                                        <p className={styles.recoIcon}>✕</p>
                                        <p className={styles.recoLabel}>Stop Doing</p>
                                        <p className={styles.recoWhat}>{result.stopDoing.what}</p>
                                        <p className={styles.recoWhy}>{result.stopDoing.why}</p>
                                        <div className={styles.recoInstead}>
                                            <span className={styles.recoInsteadLabel}>Instead →</span>
                                            {result.stopDoing.instead}
                                        </div>
                                    </div>
                                    <div className={`${styles.recoCard} ${styles.recoDouble}`}>
                                        <p className={styles.recoIcon}>↑</p>
                                        <p className={styles.recoLabel}>Double Down</p>
                                        <p className={styles.recoWhat}>{result.doubleDown.what}</p>
                                        <p className={styles.recoWhy}>{result.doubleDown.why}</p>
                                        <div className={styles.recoInstead}>
                                            <span className={styles.recoInsteadLabel}>How →</span>
                                            {result.doubleDown.how}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Hook Repair Set ── */}
                            {result.hookRepairSet?.length > 0 && (
                                <div className={styles.section}>
                                    <p className={styles.sectionLabel}>Hook Repair Set — 5 Options</p>
                                    <div className={styles.hookList}>
                                        {result.hookRepairSet.map((h, i) => (
                                            <div key={i} className={styles.hookCard}>
                                                <div className={styles.hookMeta}>
                                                    <span className={styles.hookFramework}>{h.framework}</span>
                                                    <span className={styles.hookTarget}>Fixes: {h.targets}</span>
                                                </div>
                                                <p className={styles.hookText}>&ldquo;{h.text}&rdquo;</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Takeaway + Action ── */}
                            <div className={styles.summaryBox}>
                                <div className={styles.summaryItem}>
                                    <p className={styles.summaryLabel}>One Takeaway</p>
                                    <p className={styles.summaryText}>{result.oneTakeaway}</p>
                                </div>
                                <div className={`${styles.summaryItem} ${styles.summaryAction}`}>
                                    <p className={styles.summaryLabel}>One Action This Week</p>
                                    <p className={styles.summaryText}><strong>{result.oneAction}</strong></p>
                                </div>
                            </div>

                            {/* ── Upgrade nudge ── */}
                            <div style={{ borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <div style={{ padding: '0.75rem 1.1rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--secondary-text)', margin: 0 }}>✨ What to do next</p>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pro members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Save this audit to your library</li>
                                        <li>Run your top repair hook through <strong>Find Your Hook</strong> for a score</li>
                                        <li>Build a new post plan with <strong>Content Game Plan</strong> targeting your weak signal</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.04)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8880a', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🔥 Elite members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Track engagement trends month-over-month in <strong>Results History</strong></li>
                                        <li>Get a monthly <strong>custom content pack</strong> built around your best-performing signals</li>
                                        <li>1-on-1 monthly review to discuss your audit and next steps</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '0.9rem 1.1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <a href="/get-started?plan=pro" style={{ fontSize: '0.82rem', fontWeight: 600, padding: '0.5rem 1.1rem', borderRadius: '20px', background: 'var(--deep-olive)', color: '#fff', textDecoration: 'none' }}>Upgrade to Pro — $17/mo</a>
                                    <a href="/get-started?plan=elite" style={{ fontSize: '0.82rem', fontWeight: 600, padding: '0.5rem 1.1rem', borderRadius: '20px', background: 'linear-gradient(135deg, #b8880a, #d4a017)', color: '#fff', textDecoration: 'none' }}>Go Elite — $47/mo</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
