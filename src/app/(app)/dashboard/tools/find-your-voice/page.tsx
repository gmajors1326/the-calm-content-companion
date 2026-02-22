'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import styles from './page.module.css';

/* ─── Examples ─────────────────────────────────────────────── */
const EXAMPLES = [
    {
        story: 'I was a middle school teacher for 24 years. I loved the kids but the system wore me down completely. I retired early at 57 and had no idea what to do next. My daughter suggested Instagram. I felt ridiculous even making the account.',
        audience: 'Women in their 50s and 60s who feel like they wasted years in jobs that didn\'t see them. They want to start over but don\'t know where.',
        desiredVoice: 'Warm and honest. Like I\'m talking to a friend over coffee, not performing for a camera.',
        context: '',
    },
    {
        story: 'I got laid off at 52 after 18 years in the same company. Spent six months in shock. Then I found digital products by accident — I was watching YouTube at midnight — and I just started. My first product made $37 and I screamed.',
        audience: 'Women who got pushed out of careers they built their identity around and are figuring out what\'s next.',
        desiredVoice: 'Direct and no-nonsense. I don\'t want to sound fluffy. But I also want people to feel safe.',
        context: 'I want to use Instagram to eventually sell a digital course about career reinvention.',
    },
    {
        story: 'I\'ve been a stay-at-home mom for 19 years. My youngest just started college. I don\'t know who I am outside of being a mom. I started posting on Instagram about my feelings and accidentally got 800 followers in a month.',
        audience: 'Empty nesters who feel lost after their kids leave. Women who gave everything to their family and forgot themselves.',
        desiredVoice: 'Vulnerable and real. I don\'t want to pretend I have it figured out. I want to grow alongside my audience.',
        context: '',
    },
    {
        story: 'I was a nurse for 31 years. Burned out hard. Left. Spent a year recovering. Now I help other women in healthcare who are breaking down quietly. I know what they\'re going through because I lived it.',
        audience: 'Healthcare workers — mostly women — who are burning out and don\'t have the language for what\'s happening to them.',
        desiredVoice: 'Calm. Clinical enough to feel credible, human enough to feel safe. Like a mentor, not a guru.',
        context: 'I sell a digital journal called "The Quiet Recovery" designed specifically for nurses and caregivers.',
    },
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Types ─────────────────────────────────────────────────── */
type VoiceResult = {
    voiceMap: {
        yes: string[];
        no: string[];
        essence: string;
    };
    voiceRules: {
        powerVerbs: string[];
        wordsToAvoid: string[];
        sentenceStyle: string;
        toneSummary: string;
    };
    hooks: {
        boldStatement: string;
        dataPoint: string;
        intriguingQuestion: string;
        relatableStory: string;
        patternInterrupt: string;
    };
    readyToPost: {
        caption: string;
        softCta: string;
        directCta: string;
        mobileScanNote: string;
    };
    voiceGuide: {
        headline: string;
        audienceStatement: string;
        coreBeliefs: string[];
        implementationNotes: string;
    };
};

type State = 'idle' | 'loading' | 'result' | 'error';

/* ─── Component ─────────────────────────────────────────────── */
export default function FindYourVoicePage() {
    const [story, setStory] = useState('');
    const [audience, setAudience] = useState('');
    const [desiredVoice, setDesiredVoice] = useState('');
    const [context, setContext] = useState('');
    const [state, setState] = useState<State>('idle');
    const [result, setResult] = useState<VoiceResult | null>(null);
    const [error, setError] = useState('');
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'result' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [state]);

    function fillExample() {
        const pick = randomFrom(EXAMPLES);
        setStory(pick.story);
        setAudience(pick.audience);
        setDesiredVoice(pick.desiredVoice);
        setContext(pick.context);
    }

    function clearAll() {
        setStory('');
        setAudience('');
        setDesiredVoice('');
        setContext('');
        setState('idle');
        setResult(null);
        setError('');
    }

    async function generate() {
        if (!story.trim()) return;
        setState('loading');
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/find-your-voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ story, audience, desiredVoice, context }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setError(data.error || 'Analysis failed. Please try again.');
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
                <p className={styles.eyebrow}>Tool 02</p>
                <h1 className={styles.title}>Find Your Voice</h1>
                <p className={styles.subtitle}>
                    Tell us who you are and who you help. We'll build your personal Voice Guide —
                    a complete fingerprint for how you sound on Instagram.
                </p>
            </header>

            <div className={styles.grid}>
                {/* ── INPUT PANEL ── */}
                <div className={styles.inputPanel}>
                    <div className={styles.panelTop}>
                        <span className={styles.panelTitle}>Your Story</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={styles.fillBtn} onClick={fillExample}>
                                ✨ Fill Example
                            </button>
                            <button
                                className={styles.fillBtn}
                                onClick={clearAll}
                                disabled={!story && state === 'idle'}
                                style={{ opacity: (!story && state === 'idle') ? 0.4 : 1, cursor: (!story && state === 'idle') ? 'not-allowed' : 'pointer' }}
                            >
                                ✕ Clear
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Who you are — your background, your moment *</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="e.g., I was a nurse for 28 years. I burned out completely and left. Now I help other women who are quietly breaking down in jobs that were never right for them."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>
                            Who you help
                            <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: '0.4rem', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '72px' }}
                            placeholder="e.g., Women in their 40s and 50s who feel stuck in careers or lives that stopped feeling like theirs."
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>
                            How you want to sound
                            <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: '0.4rem', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '72px' }}
                            placeholder="e.g., Warm but not soft. Real but not messy. Like a mentor who has been through it — not a cheerleader."
                            value={desiredVoice}
                            onChange={(e) => setDesiredVoice(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>
                            Extra context
                            <span style={{ fontWeight: 400, opacity: 0.5, marginLeft: '0.4rem', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            style={{ minHeight: '60px' }}
                            placeholder="e.g., I sell a digital journal. I post 3x a week. I've been on Instagram for 2 months."
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={generate}
                        disabled={state === 'loading' || !story.trim()}
                    >
                        {state === 'loading' ? (
                            <>
                                <span className={styles.spinner} style={{ width: 18, height: 18, borderWidth: 2 }} />
                                Building your Voice Guide...
                            </>
                        ) : (
                            <>
                                <Sparkles size={17} />
                                Build My Voice Guide
                            </>
                        )}
                    </button>
                    <p className={styles.btnHint}>Takes about 10 seconds</p>
                </div>

                {/* ── OUTPUT PANEL ── */}
                <div className={styles.outputPanel}>
                    {state === 'idle' && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🎙️</div>
                            <p className={styles.emptyTitle}>Your Voice Guide will appear here</p>
                            <p className={styles.emptyText}>
                                Fill in your story and click "Build My Voice Guide" to receive
                                your Voice Map, 5 hook types, a ready-to-post caption, and your complete voice rules.
                            </p>
                        </div>
                    )}

                    {state === 'loading' && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner} />
                            <p className={styles.loadingText}>Filtering your language... building your fingerprint...</p>
                        </div>
                    )}

                    {state === 'error' && (
                        <div className={styles.errorBox}>{error}</div>
                    )}

                    {state === 'result' && result && (
                        <div className={styles.results} ref={resultsRef}>
                            <p className={styles.resultsHeader}>Voice Guide 1.0</p>

                            {/* ── Voice Map ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Voice Map</p>
                                <p className={styles.essence}>&ldquo;{result.voiceMap.essence}&rdquo;</p>
                                <div className={styles.yesNoGrid}>
                                    <div className={styles.yesBox}>
                                        <p className={styles.yesNoLabel}>✓ You are</p>
                                        {result.voiceMap.yes.map((w) => (
                                            <span key={w} className={`${styles.pill} ${styles.pillYes}`}>{w}</span>
                                        ))}
                                    </div>
                                    <div className={styles.noBox}>
                                        <p className={styles.yesNoLabel}>✕ Not</p>
                                        {result.voiceMap.no.map((w) => (
                                            <span key={w} className={`${styles.pill} ${styles.pillNo}`}>{w}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ── Voice Rules ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Your Language Rules</p>
                                <div className={styles.rulesGrid}>
                                    <div>
                                        <p className={styles.ruleTitle}>Power Verbs</p>
                                        <div className={styles.pillRow}>
                                            {result.voiceRules.powerVerbs.map((v) => (
                                                <span key={v} className={`${styles.pill} ${styles.pillVerb}`}>{v}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.ruleTitle}>Avoid</p>
                                        <div className={styles.pillRow}>
                                            {result.voiceRules.wordsToAvoid.map((w) => (
                                                <span key={w} className={`${styles.pill} ${styles.pillAvoid}`}>{w}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.ruleNote}>
                                    <strong>Sentence style:</strong> {result.voiceRules.sentenceStyle}
                                </div>
                                <div className={styles.ruleNote} style={{ marginTop: '0.5rem' }}>
                                    {result.voiceRules.toneSummary}
                                </div>
                            </div>

                            {/* ── 5 Hook Variants ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>5 Hook Variants</p>
                                <div className={styles.hooksGrid}>
                                    {[
                                        { key: 'boldStatement', label: 'Bold Statement', color: styles.hookBlue },
                                        { key: 'dataPoint', label: 'Specific Data Point', color: styles.hookPurple },
                                        { key: 'intriguingQuestion', label: 'Intriguing Question', color: styles.hookOlive },
                                        { key: 'relatableStory', label: 'Relatable Story', color: styles.hookAmber },
                                        { key: 'patternInterrupt', label: 'Pattern Interrupt', color: styles.hookRose },
                                    ].map(({ key, label, color }) => (
                                        <div key={key} className={`${styles.hookCard} ${color}`}>
                                            <p className={styles.hookLabel}>{label}</p>
                                            <p className={styles.hookText}>
                                                {result.hooks[key as keyof typeof result.hooks]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Ready to Post ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Ready-to-Post Caption</p>
                                <div className={styles.captionBox}>
                                    {result.readyToPost.caption.split('\n').map((line, i) => (
                                        <p key={i} className={styles.captionLine}>{line || '\u00A0'}</p>
                                    ))}
                                </div>
                                <div className={styles.ctaRow}>
                                    <div className={styles.ctaCard}>
                                        <p className={styles.ctaLabel}>Soft CTA</p>
                                        <p className={styles.ctaText}>{result.readyToPost.softCta}</p>
                                    </div>
                                    <div className={`${styles.ctaCard} ${styles.ctaCardDirect}`}>
                                        <p className={styles.ctaLabel}>Direct CTA</p>
                                        <p className={styles.ctaText}>{result.readyToPost.directCta}</p>
                                    </div>
                                </div>
                                <p className={styles.mobileNote}>📱 {result.readyToPost.mobileScanNote}</p>
                            </div>

                            {/* ── Voice Guide ── */}
                            <div className={styles.section}>
                                <p className={styles.sectionLabel}>Voice Guide 1.0</p>
                                <div className={styles.guideHeadline}>{result.voiceGuide.headline}</div>
                                <p className={styles.guideAudience}>{result.voiceGuide.audienceStatement}</p>
                                <div className={styles.beliefsList}>
                                    {result.voiceGuide.coreBeliefs.map((b, i) => (
                                        <div key={i} className={styles.belief}>
                                            <span className={styles.beliefArrow}>→</span>
                                            {b}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.implNotes}>
                                    <p className={styles.implLabel}>How your voice was built</p>
                                    <p className={styles.implText}>{result.voiceGuide.implementationNotes}</p>
                                </div>
                            </div>

                            {/* ── Upgrade nudge ── */}
                            <div style={{ borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <div style={{ padding: '0.75rem 1.1rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--secondary-text)', margin: 0 }}>
                                        ✨ What to do next
                                    </p>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pro members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Save this Voice Guide to your library</li>
                                        <li>Run your hooks through <strong>Find Your Hook</strong> for scores</li>
                                        <li>Use the caption in your <strong>Content Game Plan</strong></li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,0.04)' }}>
                                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b8880a', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🔥 Elite members</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--secondary-text)', fontSize: '0.875rem', lineHeight: 1.9 }}>
                                        <li>Expand any of these 5 hooks into a <strong>full Reel script</strong></li>
                                        <li>Turn the caption into a <strong>complete content set</strong> (3 posts, 3 stories)</li>
                                        <li>Track how your voice evolves with <strong>Voice History</strong></li>
                                        <li>Get a monthly <strong>custom content pack</strong> built in your exact voice</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '0.9rem 1.1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <a href="/get-started?plan=pro" style={{ fontSize: '0.82rem', fontWeight: 600, padding: '0.5rem 1.1rem', borderRadius: '20px', background: 'var(--deep-olive)', color: '#fff', textDecoration: 'none' }}>
                                        Upgrade to Pro — $17/mo
                                    </a>
                                    <a href="/get-started?plan=elite" style={{ fontSize: '0.82rem', fontWeight: 600, padding: '0.5rem 1.1rem', borderRadius: '20px', background: 'linear-gradient(135deg, #b8880a, #d4a017)', color: '#fff', textDecoration: 'none' }}>
                                        Go Elite — $47/mo
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
