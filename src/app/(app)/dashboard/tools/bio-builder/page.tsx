'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Check, Copy } from 'lucide-react';
import styles from './page.module.css';

/* ─── localStorage key ──────────────────────────────────────── */
const LS_KEY = 'bio-builder-draft';

/* ─── Examples ─────────────────────────────────────────────── */
const EXAMPLES = [
    {
        name: 'Sarah M.',
        story: 'I was a middle school teacher for 22 years. Burned out completely at 54. Started selling lesson plan templates on Etsy and made $1,200 in my first month. Never looked back.',
        whoYouHelp: 'Burned-out teachers who want to earn money from what they already know',
        offer: '$27 digital template packs for teachers and a $97 course called Teach & Earn',
        result: '$4,800/month in passive income, 18 months after leaving teaching',
        tone: 'Warm, direct, a little dry humor',
    },
    {
        name: 'Linda R.',
        story: 'Empty nester at 57. Kids moved out and I had no idea who I was anymore. Found Instagram, started posting about starting over, now I have 6,200 followers and a small community.',
        whoYouHelp: 'Women in their 50s figuring out who they are after the kids leave',
        offer: 'Free community + $37/month membership called The Restart Club',
        result: '200 paying members in 9 months, built entirely from Instagram',
        tone: 'Honest, a little vulnerable, calm and grounded',
    },
    {
        name: 'Diane K.',
        story: 'Retired HR director. Always wrote, never published. Started a newsletter about navigating workplace dynamics after 60. Didn\'t know what I was doing — figured it out as I went.',
        whoYouHelp: 'Women over 50 who want to monetize their expertise without becoming "influencers"',
        offer: 'Free newsletter + consulting calls + a $197 guide on building a simple digital income',
        result: '3,100 newsletter subscribers, 5 consulting clients per month at $300/session',
        tone: 'Authoritative but approachable, no nonsense',
    },
    {
        name: 'Carol T.',
        story: 'I was a home cook who posted recipes for fun. Hit 1,000 followers without trying. Then someone asked if I did virtual cooking classes. I said yes. That was 2 years ago — now it\'s my main income.',
        whoYouHelp: 'Home cooks who want to share what they love and actually get paid for it',
        offer: 'Virtual cooking classes ($45/session) and a $29 digital meal planning kit',
        result: 'First $10k month at age 62, no ads, just organic Instagram content',
        tone: 'Warm, joyful, unpretentious',
    },
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Types ─────────────────────────────────────────────────── */
type Bio = {
    style: string;
    lines: string[];
    charCount: number;
    hook: string;
    conversionNote: string;
};

type BioResult = {
    audienceClarity: { who: string; outcome: string; niche: string };
    coreOffer: string;
    bios: Bio[];
    nameFieldSuggestion: string;
    keywordNote: string;
    softCta: string;
    directCta: string;
    linkInBioSuggestion: string;
    strengthNote: string;
};

type State = 'idle' | 'loading' | 'result' | 'error';

const STYLE_COLORS: Record<string, string> = {
    'Direct & Data-Led': styles.styleBlue,
    'Story-First': styles.styleAmber,
    'Benefit-Driven': styles.styleGreen,
    'Persona Statement': styles.stylePurple,
    'Problem-Solver': styles.styleRose,
};

/* ─── Component ─────────────────────────────────────────────── */
export default function BioBuilderPage() {
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [whoYouHelp, setWhoYouHelp] = useState('');
    const [offer, setOffer] = useState('');
    const [result, setResult] = useState('');
    const [tone, setTone] = useState('');

    const [pageState, setPageState] = useState<State>('idle');
    const [bioResult, setBioResult] = useState<BioResult | null>(null);
    const [error, setError] = useState('');
    const [activeBio, setActiveBio] = useState(0);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    /* ── Restore draft from localStorage ── */
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                const d = JSON.parse(saved);
                if (d.name) setName(d.name);
                if (d.story) setStory(d.story);
                if (d.whoYouHelp) setWhoYouHelp(d.whoYouHelp);
                if (d.offer) setOffer(d.offer);
                if (d.result) setResult(d.result);
                if (d.tone) setTone(d.tone);
            }
        } catch { /* ignore */ }
    }, []);

    /* ── Auto-save draft ── */
    const saveDraft = useCallback(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify({ name, story, whoYouHelp, offer, result, tone }));
        } catch { /* ignore */ }
    }, [name, story, whoYouHelp, offer, result, tone]);

    useEffect(() => { saveDraft(); }, [saveDraft]);

    useEffect(() => {
        if (pageState === 'result' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [pageState]);

    function fillExample() {
        const pick = randomFrom(EXAMPLES);
        setName(pick.name);
        setStory(pick.story);
        setWhoYouHelp(pick.whoYouHelp);
        setOffer(pick.offer);
        setResult(pick.result);
        setTone(pick.tone);
    }

    function clearAll() {
        setName(''); setStory(''); setWhoYouHelp('');
        setOffer(''); setResult(''); setTone('');
        setPageState('idle'); setBioResult(null);
        setError(''); setActiveBio(0);
        try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
    }

    async function generate() {
        if (!story.trim() && !whoYouHelp.trim()) return;
        setPageState('loading');
        setError('');
        setBioResult(null);
        setActiveBio(0);

        try {
            const res = await fetch('/api/tools/bio-builder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, story, whoYouHelp, offer, result, tone }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setError(data.error || 'Bio generation failed. Please try again.');
                setPageState('error');
                return;
            }

            setBioResult(data);
            setPageState('result');
        } catch {
            setError('Network error. Please check your connection.');
            setPageState('error');
        }
    }

    async function copyBio(idx: number) {
        if (!bioResult?.bios[idx]) return;
        const text = bioResult.bios[idx].lines.join('\n');
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000);
        } catch { /* ignore */ }
    }

    const canGenerate = story.trim() || whoYouHelp.trim();
    const currentBio = bioResult?.bios[activeBio];

    return (
        <div className={styles.page}>
            <Link href="/dashboard/tools" className={styles.backLink}>
                <ArrowLeft size={15} /> Back to Tools
            </Link>

            <header className={styles.header}>
                <p className={styles.eyebrow}>Tool 05</p>
                <h1 className={styles.title}>Bio Builder</h1>
                <p className={styles.subtitle}>
                    Tell us who you are and who you help. We&apos;ll write 5 Instagram bio
                    variants — each under 150 characters, each with a different strategic angle.
                </p>
            </header>

            <div className={styles.grid}>
                {/* ── INPUT PANEL ── */}
                <div className={styles.inputPanel}>
                    <div className={styles.panelTop}>
                        <span className={styles.panelTitle}>Your Details</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={styles.fillBtn} onClick={fillExample}>✨ Fill Example</button>
                            <button
                                className={styles.fillBtn}
                                onClick={clearAll}
                                disabled={!story && !whoYouHelp && pageState === 'idle'}
                                style={{ opacity: !story && !whoYouHelp && pageState === 'idle' ? 0.4 : 1 }}
                            >✕ Clear</button>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Your name or handle <span className={styles.optional}>(optional)</span></label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="e.g., Sarah M. or @sarahteaches"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Who you are / your story *</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Your background, how you got here, what makes you different. Messy is fine — just tell us the truth."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Who you help *</label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '64px' }}
                            placeholder="e.g., Burned-out teachers who want to earn money from what they already know"
                            value={whoYouHelp}
                            onChange={(e) => setWhoYouHelp(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>What you sell or offer <span className={styles.optional}>(optional)</span></label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '64px' }}
                            placeholder="e.g., $27 digital template packs and a $97 online course"
                            value={offer}
                            onChange={(e) => setOffer(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Best result you&apos;ve gotten <span className={styles.optional}>(optional)</span></label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '56px' }}
                            placeholder="e.g., $4,800/month passive income 18 months after leaving teaching"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Your tone / personality <span className={styles.optional}>(optional)</span></label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="e.g., Warm and direct, a little dry humor"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                        />
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={generate}
                        disabled={pageState === 'loading' || !canGenerate}
                    >
                        {pageState === 'loading' ? (
                            <><span className={styles.btnSpinner} />Building your bios...</>
                        ) : (
                            <><User size={17} />Build My 5 Bios</>
                        )}
                    </button>
                    <p className={styles.btnHint}>Draft auto-saved · Takes about 10 seconds</p>
                </div>

                {/* ── OUTPUT PANEL ── */}
                <div className={styles.outputPanel}>
                    {pageState === 'idle' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🪪</div>
                            <p className={styles.emptyTitle}>Your 5 bio variants will appear here</p>
                            <p className={styles.emptyText}>
                                Each bio uses a different strategic angle — story-led, data-led,
                                benefit-driven, persona, and problem-solver. All under 150 characters.
                            </p>
                        </div>
                    )}

                    {pageState === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p className={styles.loadingText}>Crafting 5 bio variants in your voice...</p>
                        </div>
                    )}

                    {pageState === 'error' && (
                        <div className={styles.errorBox}>{error}</div>
                    )}

                    {pageState === 'result' && bioResult && (
                        <div className={styles.results} ref={resultsRef}>
                            <p className={styles.resultsHeader}>Bio Builder — 5 Variants</p>

                            {/* ── Audience Clarity ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Your Positioning</p>
                                <div className={styles.clarityGrid}>
                                    <div className={styles.clarityCard}>
                                        <p className={styles.clarityKey}>You help</p>
                                        <p className={styles.clarityVal}>{bioResult.audienceClarity.who}</p>
                                    </div>
                                    <div className={styles.clarityCard}>
                                        <p className={styles.clarityKey}>They get</p>
                                        <p className={styles.clarityVal}>{bioResult.audienceClarity.outcome}</p>
                                    </div>
                                    <div className={`${styles.clarityCard} ${styles.clarityFull}`}>
                                        <p className={styles.clarityKey}>Core offer</p>
                                        <p className={styles.clarityVal}>{bioResult.coreOffer}</p>
                                    </div>
                                </div>
                                {bioResult.strengthNote && (
                                    <p className={styles.strengthNote}>💡 {bioResult.strengthNote}</p>
                                )}
                            </div>

                            {/* ── Bio Selector Tabs ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>5 Bio Variants — click to preview</p>
                                <div className={styles.bioTabs}>
                                    {bioResult.bios.map((bio, i) => (
                                        <button
                                            key={i}
                                            className={`${styles.bioTab} ${activeBio === i ? styles.bioTabActive : ''} ${STYLE_COLORS[bio.style] || ''}`}
                                            onClick={() => setActiveBio(i)}
                                        >
                                            {bio.style}
                                        </button>
                                    ))}
                                </div>

                                {/* ── Active Bio Preview ── */}
                                {currentBio && (
                                    <div className={styles.bioPreviewWrap}>
                                        {/* Phone mockup */}
                                        <div className={styles.phoneFrame}>
                                            <div className={styles.phoneNotch} />
                                            <div className={styles.phoneScreen}>
                                                <div className={styles.igHeader}>
                                                    <div className={styles.igAvatar} />
                                                    <div className={styles.igMeta}>
                                                        <p className={styles.igHandle}>{name || 'yourhandle'}</p>
                                                        {bioResult.nameFieldSuggestion && (
                                                            <p className={styles.igName}>{bioResult.nameFieldSuggestion}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={styles.igBio}>
                                                    {currentBio.lines.map((line, i) => (
                                                        <p key={i} className={styles.igBioLine}>{line}</p>
                                                    ))}
                                                </div>
                                                <div className={styles.igFollowBtn}>Follow</div>
                                            </div>
                                        </div>

                                        {/* Bio Details */}
                                        <div className={styles.bioDetail}>
                                            <div className={styles.bioDetailTop}>
                                                <span className={`${styles.stylePill} ${STYLE_COLORS[currentBio.style] || ''}`}>
                                                    {currentBio.style}
                                                </span>
                                                <span className={`${styles.charBadge} ${currentBio.charCount > 145 ? styles.charWarn : styles.charOk}`}>
                                                    {currentBio.charCount}/150 chars
                                                </span>
                                            </div>

                                            <div className={styles.bioText}>
                                                {currentBio.lines.map((line, i) => (
                                                    <p key={i} className={styles.bioLine}>{line}</p>
                                                ))}
                                            </div>

                                            <button
                                                className={styles.copyBtn}
                                                onClick={() => copyBio(activeBio)}
                                            >
                                                {copiedIdx === activeBio
                                                    ? <><Check size={14} /> Copied!</>
                                                    : <><Copy size={14} /> Copy Bio</>
                                                }
                                            </button>

                                            <div className={styles.conversionNote}>
                                                <span className={styles.conversionLabel}>Why this works →</span>
                                                {currentBio.conversionNote}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Name Field + Keywords ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Name Field & Search Keywords</p>
                                <div className={styles.metaGrid}>
                                    <div className={styles.metaCard}>
                                        <p className={styles.metaKey}>Suggested name field</p>
                                        <p className={styles.metaVal}>{bioResult.nameFieldSuggestion}</p>
                                        <p className={styles.metaNote}>{bioResult.nameFieldSuggestion.length}/30 characters</p>
                                    </div>
                                    <div className={styles.metaCard}>
                                        <p className={styles.metaKey}>Keywords to include</p>
                                        <p className={styles.metaVal}>{bioResult.keywordNote}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── CTAs ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>CTA Options</p>
                                <div className={styles.ctaRow}>
                                    <div className={styles.ctaCard}>
                                        <p className={styles.ctaLabel}>Soft CTA</p>
                                        <p className={styles.ctaText}>{bioResult.softCta}</p>
                                    </div>
                                    <div className={`${styles.ctaCard} ${styles.ctaCardDirect}`}>
                                        <p className={styles.ctaLabel}>Direct CTA</p>
                                        <p className={styles.ctaText}>{bioResult.directCta}</p>
                                    </div>
                                </div>
                                {bioResult.linkInBioSuggestion && (
                                    <p className={styles.linkNote}>🔗 {bioResult.linkInBioSuggestion}</p>
                                )}
                            </div>

                            {/* ── Upgrade nudge ── */}
                            <div style={{ borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <div style={{ padding: '0.75rem 1.1rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--secondary-text)', margin: 0 }}>✨ What to do next</p>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pro members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Save all 5 bios to your library</li>
                                        <li>Run your hook line through <strong>Find Your Hook</strong> to test its strength</li>
                                        <li>Build your first post using <strong>Content Game Plan</strong> with this bio&apos;s angle</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.04)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8880a', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🔥 Elite members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Get a full <strong>profile audit</strong> — bio, highlights, grid strategy</li>
                                        <li>Monthly 1-on-1 to refine your positioning as you grow</li>
                                        <li>Custom content pack written in the voice of your chosen bio</li>
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
