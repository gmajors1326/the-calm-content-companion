'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Lock, X, Zap, Star, Crown } from 'lucide-react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styles from './page.module.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const TONES = [
    'Calm and thoughtful',
    'Direct and confident',
    'Curious',
    'Bold',
    'Educational',
];

const EXAMPLES = [
    {
        hook: 'I was sitting in my car crying because I hated my job and I decided that day to become a digital marketer and sell digital products from home so I could be there for my kids.',
        tone: 'Calm and thoughtful',
        context: '',
    },
    {
        hook: "I started my Instagram account at 52 with zero followers and no idea what I was doing. Here's what I wish someone had told me on day one.",
        tone: 'Calm and thoughtful',
        context: 'My audience is women over 45 who feel like they started too late.',
    },
    {
        hook: 'Nobody tells you how lonely it feels to start over in your 50s. But I did it anyway — and it changed my entire life.',
        tone: 'Direct and confident',
        context: '',
    },
    {
        hook: "I made my first $200 online and I cried. Not because of the money. Because I finally believed I could actually do this.",
        tone: 'Calm and thoughtful',
        context: 'This is for a Reel. I want it to feel hopeful, not braggy.',
    },
    {
        hook: 'For 22 years I put everyone else first. This year I finally built something that was just mine — and it started with one post on Instagram.',
        tone: 'Curious',
        context: 'I want to use this as the opening line of a carousel.',
    },
];

const FREE_LIMIT = 3;

const TIERS = [
    {
        id: 'starter',
        icon: Zap,
        name: 'Starter',
        price: '$9',
        period: '/mo',
        tagline: 'All 5 tools, unlimited runs',
        features: [
            'Unlimited Find Your Hook runs',
            'All 5 core tools unlocked',
            'Save outputs to your library',
        ],
        cta: 'Start with Starter',
        href: '/get-started?plan=starter',
        accent: 'var(--sage-accent)',
        bg: 'rgba(111,127,106,0.06)',
        border: 'rgba(111,127,106,0.3)',
    },
    {
        id: 'pro',
        icon: Star,
        name: 'Pro',
        price: '$17',
        period: '/mo',
        tagline: 'Build faster with more depth',
        features: [
            'Everything in Starter',
            'Content Game Plan tool',
            'Save + organize your content library',
        ],
        cta: 'Upgrade to Pro',
        href: '/get-started?plan=pro',
        accent: '#3b82f6',
        bg: 'rgba(59,130,246,0.06)',
        border: 'rgba(59,130,246,0.3)',
        highlight: true,
    },
    {
        id: 'elite',
        icon: Crown,
        name: 'Elite',
        price: '$47',
        period: '/mo',
        tagline: 'Full suite, full power',
        features: [
            'Everything in Pro',
            'Batch Hook Comparator',
            'Hook History tracking',
            '10 custom hook ideas/month',
        ],
        cta: 'Go Elite',
        href: '/get-started?plan=elite',
        accent: '#b8880a',
        bg: 'rgba(184,136,10,0.06)',
        border: 'rgba(184,136,10,0.3)',
    },
];

type AnalysisResult = {
    scores: { clarity: number; specificity: number; strength: number; audienceMatch: number };
    verdict: string;
    hookType: string;
    variations: { clear: string; curious: string; toneMatched: string };
    why: string;
    proTip: string;
    runsUsed?: number;
    limit?: number;
    plan?: string;
    expansion?: string;
};

type State = 'idle' | 'loading' | 'result' | 'error' | 'limit';

export default function FindYourHookPage() {
    const [hook, setHook] = useState('');
    const [tone, setTone] = useState(TONES[0]);
    const [context, setContext] = useState('');
    const [state, setState] = useState<State>('idle');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState('');
    const [runsUsed, setRunsUsed] = useState(0);
    const [isGuest, setIsGuest] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [plan, setPlan] = useState('free');

    // Elite Expansion states
    const [expansion, setExpansion] = useState<string | null>(null);
    const [expansionType, setExpansionType] = useState<'reelScript' | 'carouselPlan' | null>(null);
    const [expanding, setExpanding] = useState<'reelScript' | 'carouselPlan' | null>(null);

    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'result' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [state]);

    async function handleExpansion(type: 'reelScript' | 'carouselPlan') {
        if (plan !== 'elite') {
            setShowModal(true);
            return;
        }

        setExpanding(type);
        setExpansionType(type);
        setExpansion(null);

        try {
            const res = await fetch('/api/tools/hook-analyzer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hook,
                    tone,
                    storyFramework: context,
                    expansionType: type
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setExpansion(data.expansion);
            } else {
                setError(data.error || 'Expansion failed.');
            }
        } catch (err) {
            setError('Expansion failed. Please check connection.');
        } finally {
            setExpanding(null);
        }
    }

    async function mockUpgrade() {
        try {
            const res = await fetch('/api/user/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: 'elite' }),
            });
            if (res.ok) {
                setPlan('elite');
                alert('Success! You are now on the Elite plan.');
            }
        } catch (err) {
            console.error('Mock upgrade failed');
        }
    }


    // Close modal on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowModal(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    function fillExample() {
        const pick = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
        setHook(pick.hook);
        setTone(pick.tone);
        setContext(pick.context);
    }

    function clearAll() {
        setHook('');
        setTone(TONES[0]);
        setContext('');
        setState('idle');
        setResult(null);
        setError('');
        setExpansion(null);
        setExpanding(null);
    }

    async function analyze() {
        if (!hook.trim()) return;
        setState('loading');
        setError('');
        setResult(null);
        setExpansion(null);

        try {
            const res = await fetch('/api/tools/hook-analyzer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hook, tone, storyFramework: context }),
            });

            const data = await res.json();

            // Paywall / limit reached
            if (res.status === 402) {
                setIsGuest(data.plan === 'guest');
                setRunsUsed(data.runsUsed ?? 0);
                setState('limit');
                setShowModal(true);
                return;
            }

            if (!res.ok || data.error) {
                setError(data.error || 'Analysis failed. Please try again.');
                setState('error');
                return;
            }

            if (data.runsUsed !== undefined) setRunsUsed(data.runsUsed);
            if (data.plan) setPlan(data.plan);
            setResult(data);
            setState('result');
        } catch {
            setError('Network error. Please check your connection.');
            setState('error');
        }
    }

    const radarData = {
        labels: ['Clarity', 'Specificity', 'Strength', 'Audience\nMatch'],
        datasets: [
            {
                label: 'Hook Score',
                data: result
                    ? [
                        result.scores.clarity,
                        result.scores.specificity,
                        result.scores.strength,
                        result.scores.audienceMatch,
                    ]
                    : [0, 0, 0, 0],
                backgroundColor: 'rgba(111, 127, 106, 0.2)',
                borderColor: 'rgba(111, 127, 106, 1)',
                pointBackgroundColor: 'rgba(111, 127, 106, 1)',
                borderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: '#E6DDCF' },
                grid: { color: '#E6DDCF' },
                pointLabels: {
                    font: { size: 10 },
                    color: '#4A514B',
                },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: { display: false },
            },
        },
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
    };

    const runsLeft = Math.max(0, FREE_LIMIT - runsUsed);
    const usagePercent = Math.min(100, (runsUsed / FREE_LIMIT) * 100);

    return (
        <div className={styles.page}>
            {/* ── Upgrade Modal ── */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                            <X size={18} />
                        </button>

                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                <Lock size={22} strokeWidth={1.5} />
                            </div>
                            {isGuest ? (
                                <>
                                    <h2 className={styles.modalTitle}>Create a free account to continue</h2>
                                    <p className={styles.modalSubtitle}>
                                        Sign up free and get <strong>3 hook analyses</strong> — no credit card needed.
                                        Unlock unlimited runs when you upgrade.
                                    </p>
                                    <div className={styles.modalGuestActions}>
                                        <Link href="/get-started" className={styles.signUpBtn}>
                                            Create free account
                                        </Link>
                                        <Link href="/sign-in" className={styles.signInLink}>
                                            Already have an account? Sign in
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className={styles.modalTitle}>
                                        You&apos;ve used all {FREE_LIMIT} free runs
                                    </h2>
                                    <p className={styles.modalSubtitle}>
                                        Upgrade to keep going — and unlock every tool in the suite.
                                    </p>
                                </>
                            )}
                        </div>

                        {!isGuest && (
                            <div className={styles.tierGrid}>
                                {TIERS.map((tier) => {
                                    const Icon = tier.icon;
                                    return (
                                        <div
                                            key={tier.id}
                                            className={`${styles.tierCard} ${tier.highlight ? styles.tierHighlight : ''}`}
                                            style={{
                                                background: tier.bg,
                                                borderColor: tier.highlight ? tier.border : undefined,
                                            }}
                                        >
                                            <div className={styles.tierTop}>
                                                <Icon size={18} color={tier.accent} strokeWidth={1.75} />
                                                <span className={styles.tierName} style={{ color: tier.accent }}>
                                                    {tier.name}
                                                </span>
                                            </div>
                                            <div className={styles.tierPrice}>
                                                <span className={styles.tierAmount}>{tier.price}</span>
                                                <span className={styles.tierPeriod}>{tier.period}</span>
                                            </div>
                                            <p className={styles.tierTagline}>{tier.tagline}</p>
                                            <ul className={styles.tierFeatures}>
                                                {tier.features.map((f) => (
                                                    <li key={f}>{f}</li>
                                                ))}
                                            </ul>
                                            <a
                                                href={tier.href}
                                                className={styles.tierCta}
                                                style={{
                                                    background: tier.highlight ? tier.accent : 'transparent',
                                                    color: tier.highlight ? '#fff' : tier.accent,
                                                    borderColor: tier.accent,
                                                }}
                                            >
                                                {tier.cta}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <p className={styles.modalFootnote}>
                            Cancel anytime · No lock-in · Instant access
                        </p>
                    </div>
                </div>
            )}

            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={15} /> Back to Tools
            </Link>

            <header className={styles.header}>
                <p className={styles.eyebrow}>Tool 01</p>
                <h1 className={styles.title}>Find Your Hook</h1>
                <p className={styles.subtitle}>
                    Share a real moment or idea. We&apos;ll help you find the Instagram opening
                    that makes someone stop scrolling and actually feel something.
                </p>

                {/* ── Free usage counter ── */}
                {runsUsed > 0 && (
                    <div className={styles.usageBadge}>
                        <div className={styles.usageBar}>
                            <div
                                className={styles.usageFill}
                                style={{
                                    width: `${usagePercent}%`,
                                    background: runsLeft === 0
                                        ? '#e05e5e'
                                        : runsLeft === 1
                                            ? '#d4a017'
                                            : 'var(--sage-accent)',
                                }}
                            />
                        </div>
                        <span className={styles.usageText}>
                            {runsLeft > 0
                                ? <><strong>{runsLeft}</strong> free {runsLeft === 1 ? 'run' : 'runs'} remaining</>
                                : <><Lock size={11} /> Free runs used · <button className={styles.usageUpgradeLink} onClick={() => setShowModal(true)}>Upgrade to continue</button></>
                            }
                        </span>
                    </div>
                )}
            </header>

            <div className={styles.grid}>
                {/* ── INPUT PANEL ── */}
                <div className={styles.inputPanel}>
                    <div className={styles.panelTop}>
                        <span className={styles.panelTitle}>Hook Clarifier</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={styles.fillBtn} onClick={fillExample}>
                                ✨ Fill Example
                            </button>
                            <button
                                className={styles.fillBtn}
                                onClick={clearAll}
                                disabled={!hook && state === 'idle'}
                                style={{ opacity: (!hook && state === 'idle') ? 0.4 : 1, cursor: (!hook && state === 'idle') ? 'not-allowed' : 'pointer' }}
                            >
                                ✕ Clear
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Your hook or opening idea *</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="e.g., I was sitting in my car crying because I hated my job..."
                            value={hook}
                            onChange={(e) => setHook(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Desired Tone</label>
                        <select
                            className={styles.select}
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                        >
                            {TONES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={styles.label}>
                            Extra context
                            <span style={{ fontWeight: 400, opacity: 0.55, marginLeft: '0.4rem' }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '72px', resize: 'vertical' }}
                            placeholder="e.g., This is for a Reel. My audience is women over 50 who feel like it's too late to start."
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={state === 'limit' ? () => setShowModal(true) : analyze}
                        disabled={state === 'loading' || (!hook.trim() && state !== 'limit')}
                    >
                        {state === 'loading' ? (
                            <>
                                <span className={styles.spinner} style={{ width: 18, height: 18, borderWidth: 2 }} />
                                Analyzing...
                            </>
                        ) : state === 'limit' ? (
                            <>
                                <Lock size={17} />
                                Upgrade to Continue
                            </>
                        ) : (
                            <>
                                <Sparkles size={17} />
                                Analyze &amp; Improve Hook
                            </>
                        )}
                    </button>

                    {/* Free tier hint */}
                    {runsUsed === 0 && (
                        <p className={styles.btnHint}>
                            ✓ Free · {FREE_LIMIT} runs included · No credit card needed
                        </p>
                    )}

                </div>

                {/* ── OUTPUT PANEL ── */}
                <div className={styles.outputPanel}>
                    {state === 'idle' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>⚡</div>
                            <p className={styles.emptyTitle}>Ready to Analyze</p>
                            <p className={styles.emptyText}>
                                Complete the form and click Analyze to see your hook score,
                                critique, and improved variations.
                            </p>
                        </div>
                    )}

                    {state === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p className={styles.loadingText}>Consulting Content Strategist AI...</p>
                        </div>
                    )}

                    {state === 'error' && (
                        <div className={styles.errorBox}>{error}</div>
                    )}

                    {state === 'limit' && (
                        <div className={styles.limitState}>
                            <div className={styles.limitIcon}>
                                <Lock size={28} strokeWidth={1.25} />
                            </div>
                            <p className={styles.limitTitle}>
                                {isGuest ? 'Sign in to get started' : `You've used all ${FREE_LIMIT} free runs`}
                            </p>
                            <p className={styles.limitText}>
                                {isGuest
                                    ? 'Create a free account to get 3 hook analyses at no cost.'
                                    : 'Upgrade to keep analyzing hooks — and unlock every tool in the suite.'
                                }
                            </p>
                            <button className={styles.limitBtn} onClick={() => setShowModal(true)}>
                                {isGuest ? 'Create free account' : 'See upgrade options'}
                            </button>
                        </div>
                    )}

                    {state === 'result' && result && (
                        <div className={styles.results} ref={resultsRef}>
                            <p className={styles.resultsHeader}>Hook Analysis</p>

                            {/* Radar + Verdict */}
                            <div className={styles.chartWrap}>
                                <div className={styles.chartBox}>
                                    <Radar data={radarData} options={radarOptions} />
                                </div>
                                <div className={styles.verdict}>
                                    {result.hookType && (
                                        <p style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: 'var(--accent)',
                                            marginBottom: '0.4rem',
                                        }}>
                                            {result.hookType} Hook
                                        </p>
                                    )}
                                    <p className={styles.verdictLabel}>Verdict</p>
                                    <p className={styles.verdictText}>{result.verdict}</p>
                                </div>
                            </div>

                            {/* Variations */}
                            <div>
                                <p className={styles.variationsLabel}>Improved Variations</p>
                                <div className={styles.variations}>
                                    <div className={`${styles.variationCard} ${styles.blue}`}>
                                        <p className={styles.variationTag}>Clear &amp; Direct</p>
                                        <p className={styles.variationText}>{result.variations.clear}</p>
                                    </div>
                                    <div className={`${styles.variationCard} ${styles.purple}`}>
                                        <p className={styles.variationTag}>Curiosity Driven</p>
                                        <p className={styles.variationText}>{result.variations.curious}</p>
                                    </div>
                                    <div className={`${styles.variationCard} ${styles.green}`}>
                                        <p className={styles.variationTag}>Tone Matched</p>
                                        <p className={styles.variationText}>{result.variations.toneMatched}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Why */}
                            <div className={styles.whyBox}>
                                <span className={styles.whyLabel}>Why these work better:</span>
                                {result.why}
                            </div>

                            {/* Pro Tip */}
                            {result.proTip && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.9rem 1.1rem',
                                    background: 'rgba(111,127,106,0.08)',
                                    border: '1px solid rgba(111,127,106,0.25)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    gap: '0.6rem',
                                    alignItems: 'flex-start',
                                }}>
                                    <span style={{ fontSize: '1rem', lineHeight: 1.4 }}>💡</span>
                                    <div>
                                        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.25rem' }}>Instagram Pro Tip</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary-text)', lineHeight: 1.6, margin: 0 }}>{result.proTip}</p>
                                    </div>
                                </div>
                            )}

                            {/* ── Usage nudge after last free run ── */}
                            {result.runsUsed !== undefined && result.runsUsed >= FREE_LIMIT && (
                                <div className={styles.lastRunNudge}>
                                    <p className={styles.lastRunTitle}>That was your last free run 🎉</p>
                                    <p className={styles.lastRunText}>
                                        You&apos;ve seen what this tool can do. Upgrade to keep the momentum going.
                                    </p>
                                    <button className={styles.limitBtn} onClick={() => setShowModal(true)}>
                                        See upgrade options
                                    </button>
                                </div>
                            )}

                            {/* ── EXPANSION DISPLAY ── */}
                            {expansion && (
                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1.25rem',
                                    background: '#fcfaf2',
                                    border: '1px solid #e3d5b0',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Crown size={16} color="#b8880a" />
                                            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b8880a', margin: 0 }}>
                                                {expansionType === 'reelScript' ? 'Reel Script Expansion' : 'Carousel Plan Expansion'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setExpansion(null)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4 }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div style={{
                                        lineHeight: 1.7,
                                        fontSize: '0.92rem',
                                        color: 'var(--primary-text)',
                                        whiteSpace: 'pre-wrap',
                                    }}>
                                        {expansion}
                                    </div>
                                </div>
                            )}

                            {/* ── WHAT TO DO NEXT: upgrade nudge ── */}
                            <div style={{
                                marginTop: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    padding: '0.75rem 1.1rem',
                                    background: 'var(--surface)',
                                    borderBottom: '1px solid var(--border)',
                                }}>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--secondary-text)', margin: 0 }}>
                                        ✨ Expansion Tools
                                    </p>
                                </div>

                                {/* Elite row */}
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.04)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8880a', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                                                Elite Expansion
                                            </p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: 0 }}>
                                                Turn this hook into a full piece of content instantly.
                                            </p>
                                        </div>
                                        {plan !== 'elite' && (
                                            <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#eee', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Locked</span>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                        <button
                                            className={styles.expansionBtn}
                                            onClick={() => handleExpansion('reelScript')}
                                            disabled={expanding === 'reelScript'}
                                        >
                                            {expanding === 'reelScript' ? 'Generating...' : <><Zap size={14} /> Create Reel Script</>}
                                        </button>
                                        <button
                                            className={styles.expansionBtn}
                                            onClick={() => handleExpansion('carouselPlan')}
                                            disabled={expanding === 'carouselPlan'}
                                        >
                                            {expanding === 'carouselPlan' ? 'Generating...' : <><Sparkles size={14} /> Create Carousel Plan</>}
                                        </button>
                                    </div>
                                </div>

                                {/* CTA row for non-elite */}
                                {plan !== 'elite' && (
                                    <div style={{
                                        padding: '0.9rem 1.1rem',
                                        display: 'flex',
                                        gap: '0.75rem',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        background: '#fff',
                                    }}>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary-text)' }}>Unlock expansions:</span>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            style={{
                                                fontSize: '0.82rem',
                                                fontWeight: 600,
                                                padding: '0.4rem 1rem',
                                                borderRadius: '20px',
                                                background: 'linear-gradient(135deg, #b8880a, #d4a017)',
                                                color: '#fff',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Upgrade to Elite
                                        </button>

                                        {/* Mock Upgrade for Demo */}
                                        <button
                                            onClick={mockUpgrade}
                                            style={{
                                                fontSize: '0.65rem',
                                                color: 'var(--secondary-text)',
                                                background: 'none',
                                                border: 'none',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            (Debug: Mock Elite)
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
