'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Map } from 'lucide-react';
import styles from './page.module.css';

/* ─── Examples ─────────────────────────────────────────────── */
const EXAMPLES = [
    {
        idea: 'Most people overcomplicate their Instagram strategy. I want to share that you really only need 3 types of posts and a simple weekly rhythm. I have a free template for this.',
        format: 'carousel',
        audience: '',
        context: '',
    },
    {
        idea: 'I spent 6 months posting every day and got zero traction. Then I stopped posting for 2 weeks, came back with one honest post about burnout, and got 40 new followers that week. I want to talk about quality vs quantity.',
        format: 'reel',
        audience: '',
        context: 'I want to sell my Content Reset mini-course at the end.',
    },
    {
        idea: 'A lot of women my age feel embarrassed to be starting on Instagram. I want to normalize it. You don\'t have to be 25 to build something real here. My first sale was at 58.',
        format: 'caption',
        audience: 'Women 50+ who feel too old to start on social media',
        context: '',
    },
    {
        idea: 'The thing nobody tells you about selling digital products is that you don\'t need a big audience. I made my first $500 with 312 followers. I want to break down how.',
        format: 'carousel',
        audience: '',
        context: 'I sell a $27 guide called "Small Audience, Real Income"',
    },
    {
        idea: 'I want to talk about how exhausting it is to copy other people\'s content. When I finally started writing in my own voice — messy, honest, slightly awkward — my engagement tripled.',
        format: 'reel',
        audience: 'Beginner creators who feel like imposters online',
        context: '',
    },
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Types ─────────────────────────────────────────────────── */
type Hook = {
    framework: string;
    text: string;
    thumbstop: 'High' | 'Medium' | 'Low';
    visualNote: string;
};

type Slide = {
    slide: number;
    role: string;
    headline: string;
    body: string;
    visual: string;
};

type ReelLine = {
    seconds: string;
    cue: string;
    line: string;
};

type PlanResult = {
    strategicIntent: {
        audience: string;
        desiredOutcome: string;
        corePoint: string;
        oneTakeaway: string;
    };
    hooks: Hook[];
    carousel: Slide[];
    reelScript: ReelLine[];
    caption: string;
    hashtags: string[];
    softCta: string;
    directCta: string;
    mobileCheck: {
        hookPreview: string;
        hookLandsBeforeCutoff: boolean;
        scannabilityNote: string;
        patternInterrupt: string;
    };
};

type Format = 'carousel' | 'reel' | 'caption';
type State = 'idle' | 'loading' | 'result' | 'error';

const THUMBSTOP_COLOR: Record<string, string> = {
    High: styles.thumbHigh,
    Medium: styles.thumbMid,
    Low: styles.thumbLow,
};

/* ─── Component ─────────────────────────────────────────────── */
export default function ContentGamePlanPage() {
    const [idea, setIdea] = useState('');
    const [format, setFormat] = useState<Format>('carousel');
    const [audience, setAudience] = useState('');
    const [context, setContext] = useState('');
    const [state, setState] = useState<State>('idle');
    const [result, setResult] = useState<PlanResult | null>(null);
    const [error, setError] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'result' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [state]);

    function fillExample() {
        const pick = randomFrom(EXAMPLES);
        setIdea(pick.idea);
        setFormat(pick.format as Format);
        setAudience(pick.audience);
        setContext(pick.context);
    }

    function clearAll() {
        setIdea('');
        setAudience('');
        setContext('');
        setState('idle');
        setResult(null);
        setError('');
        setActiveSlide(0);
    }

    async function generate() {
        if (!idea.trim()) return;
        setState('loading');
        setError('');
        setResult(null);
        setActiveSlide(0);

        try {
            const res = await fetch('/api/tools/content-game-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea, format, audience, context }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setError(data.error || 'Plan generation failed. Please try again.');
                setState('error');
                return;
            }

            setResult(data);
            setState('result');
        } catch {
            setError('Network error. Please check your connection.');
            setState('error');
        }
    }

    return (
        <div className={styles.page}>
            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={15} /> Back to Tools
            </Link>

            <header className={styles.header}>
                <p className={styles.eyebrow}>Tool 03</p>
                <h1 className={styles.title}>Content Game Plan</h1>
                <p className={styles.subtitle}>
                    Drop your raw, messy idea. We'll hand you back a full content plan —
                    strategic intent, 5 hooks, ready-to-post content, and dual CTAs.
                </p>
            </header>

            <div className={styles.grid}>
                {/* ── INPUT PANEL ── */}
                <div className={styles.inputPanel}>
                    <div className={styles.panelTop}>
                        <span className={styles.panelTitle}>Your Idea</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={styles.fillBtn} onClick={fillExample}>✨ Fill Example</button>
                            <button
                                className={styles.fillBtn}
                                onClick={clearAll}
                                disabled={!idea && state === 'idle'}
                                style={{ opacity: !idea && state === 'idle' ? 0.4 : 1 }}
                            >✕ Clear</button>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>What do you want to post about? *</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Dump your raw, unstructured idea here. Messy is fine — that's the point. e.g., 'I want to talk about how I almost quit Instagram at 3 months and what made me stay...'"
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Content Format</label>
                        <div className={styles.formatPills}>
                            {(['carousel', 'reel', 'caption'] as Format[]).map((f) => (
                                <button
                                    key={f}
                                    className={`${styles.formatPill} ${format === f ? styles.formatPillActive : ''}`}
                                    onClick={() => setFormat(f)}
                                >
                                    {f === 'carousel' ? '🃏 Carousel' : f === 'reel' ? '🎬 Reel' : '✍️ Caption'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>
                            Who is this for?
                            <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: '0.4rem', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '64px' }}
                            placeholder="e.g., Women 50+ who feel like they missed the social media window."
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>
                            Extra context
                            <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: '0.4rem', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '56px' }}
                            placeholder="e.g., I'm promoting my $27 guide. I post on Tuesdays and Thursdays."
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={generate}
                        disabled={state === 'loading' || !idea.trim()}
                    >
                        {state === 'loading' ? (
                            <><span className={styles.btnSpinner} />Building your plan...</>
                        ) : (
                            <><Map size={17} />Build My Content Plan</>
                        )}
                    </button>
                    <p className={styles.btnHint}>Takes about 15 seconds</p>
                </div>

                {/* ── OUTPUT PANEL ── */}
                <div className={styles.outputPanel}>
                    {state === 'idle' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🗺️</div>
                            <p className={styles.emptyTitle}>Your Content Game Plan will appear here</p>
                            <p className={styles.emptyText}>Enter your raw idea and choose a format — you'll receive a strategic brief, 5 hooks, full content draft, and a dual CTA set.</p>
                        </div>
                    )}

                    {state === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p className={styles.loadingText}>Analyzing your idea... building your plan...</p>
                        </div>
                    )}

                    {state === 'error' && (
                        <div className={styles.errorBox}>{error}</div>
                    )}

                    {state === 'result' && result && (
                        <div className={styles.results} ref={resultsRef}>
                            <p className={styles.resultsHeader}>Content Game Plan</p>

                            {/* ── Step 1: Strategic Intent ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Step 1 — Strategic Intent</p>
                                <div className={styles.intentGrid}>
                                    <div className={styles.intentCard}>
                                        <p className={styles.intentKey}>Audience</p>
                                        <p className={styles.intentVal}>{result.strategicIntent.audience}</p>
                                    </div>
                                    <div className={styles.intentCard}>
                                        <p className={styles.intentKey}>Desired Outcome</p>
                                        <p className={styles.intentVal}>{result.strategicIntent.desiredOutcome}</p>
                                    </div>
                                    <div className={styles.intentCard}>
                                        <p className={styles.intentKey}>Core Point</p>
                                        <p className={styles.intentVal}>{result.strategicIntent.corePoint}</p>
                                    </div>
                                    <div className={`${styles.intentCard} ${styles.intentHighlight}`}>
                                        <p className={styles.intentKey}>ONE Takeaway</p>
                                        <p className={styles.intentVal}><strong>{result.strategicIntent.oneTakeaway}</strong></p>
                                    </div>
                                </div>
                            </div>

                            {/* ── Step 2: 5 Hooks ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Step 2 — Hook Options (5 Variants)</p>
                                <div className={styles.hooksList}>
                                    {result.hooks?.map((hook, i) => (
                                        <div key={i} className={styles.hookRow}>
                                            <div className={styles.hookMeta}>
                                                <span className={styles.hookFramework}>{hook.framework}</span>
                                                <span className={`${styles.thumbBadge} ${THUMBSTOP_COLOR[hook.thumbstop] || ''}`}>
                                                    {hook.thumbstop} Thumbstop
                                                </span>
                                            </div>
                                            <p className={styles.hookText}>&ldquo;{hook.text}&rdquo;</p>
                                            <p className={styles.hookVisual}>💡 {hook.visualNote}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Step 3: Content ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>
                                    Step 3 — {format === 'carousel' ? '🃏 Carousel (10 Slides)' : format === 'reel' ? '🎬 Reel Script' : '✍️ Caption'}
                                </p>

                                {format === 'carousel' && result.carousel && (
                                    <div className={styles.carouselWrap}>
                                        <div className={styles.slideNav}>
                                            {result.carousel.map((s, i) => (
                                                <button
                                                    key={i}
                                                    className={`${styles.slideTab} ${activeSlide === i ? styles.slideTabActive : ''}`}
                                                    onClick={() => setActiveSlide(i)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        {result.carousel[activeSlide] && (
                                            <div className={styles.slidePreview}>
                                                <div className={styles.slidePhone}>
                                                    <div className={styles.slideRole}>{result.carousel[activeSlide].role}</div>
                                                    <p className={styles.slideHeadline}>{result.carousel[activeSlide].headline}</p>
                                                    <p className={styles.slideBody}>{result.carousel[activeSlide].body}</p>
                                                </div>
                                                <div className={styles.slideVisualNote}>
                                                    🎨 {result.carousel[activeSlide].visual}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {format === 'reel' && result.reelScript && (
                                    <div className={styles.reelScript}>
                                        {result.reelScript.map((line, i) => (
                                            <div key={i} className={styles.reelLine}>
                                                <div className={styles.reelMeta}>
                                                    <span className={styles.reelTime}>{line.seconds}s</span>
                                                    <span className={styles.reelCue}>{line.cue}</span>
                                                </div>
                                                <p className={styles.reelLineText}>{line.line}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {format === 'caption' && result.caption && (
                                    <div className={styles.captionBox}>
                                        {result.caption.split('\n').map((line, i) => (
                                            <p key={i} className={styles.captionLine}>{line || '\u00A0'}</p>
                                        ))}
                                        {result.hashtags && (
                                            <p className={styles.hashtagLine}>{result.hashtags.join(' ')}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* ── Step 4: CTAs ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Step 4 — CTA Pair</p>
                                <div className={styles.ctaRow}>
                                    <div className={styles.ctaCard}>
                                        <p className={styles.ctaLabel}>Soft CTA</p>
                                        <p className={styles.ctaText}>{result.softCta}</p>
                                    </div>
                                    <div className={`${styles.ctaCard} ${styles.ctaCardDirect}`}>
                                        <p className={styles.ctaLabel}>Direct CTA</p>
                                        <p className={styles.ctaText}>{result.directCta}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── Step 5: Mobile Check ── */}
                            {result.mobileCheck && (
                                <div className={styles.section}>
                                    <p className={styles.sectionLabel}>Step 5 — Mobile Verification</p>
                                    <div className={styles.mobileCard}>
                                        <div className={styles.mobilePreviewBar}>
                                            <span className={styles.mobileLens} />
                                            <span className={styles.mobileBarLabel}>Instagram mobile preview</span>
                                        </div>
                                        <div className={styles.mobilePreviewText}>
                                            <p className={styles.mobileHookText}>{result.mobileCheck.hookPreview}</p>
                                            <span className={styles.mobileMore}>...more</span>
                                        </div>
                                        <div className={styles.mobileNotes}>
                                            <p>
                                                <span className={result.mobileCheck.hookLandsBeforeCutoff ? styles.mobilePass : styles.mobileFail}>
                                                    {result.mobileCheck.hookLandsBeforeCutoff ? '✓' : '✕'}
                                                </span>
                                                {' '}Hook lands before 210-char cutoff
                                            </p>
                                            <p>📱 {result.mobileCheck.scannabilityNote}</p>
                                            <p>🎨 {result.mobileCheck.patternInterrupt}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Upgrade nudge ── */}
                            <div style={{ borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <div style={{ padding: '0.75rem 1.1rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--secondary-text)', margin: 0 }}>✨ What to do next</p>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pro members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Save this plan to your library</li>
                                        <li>Run your top hook through <strong>Find Your Hook</strong> for a score</li>
                                        <li>Pair this with <strong>Find Your Voice</strong> to write in your exact tone</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.04)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8880a', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🔥 Elite members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Expand this into a <strong>full content set</strong> (3 posts + 5 stories)</li>
                                        <li>Generate a <strong>complete Reel script</strong> from any hook</li>
                                        <li>Get a <strong>monthly content pack</strong> — 4 plans built in your voice</li>
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
