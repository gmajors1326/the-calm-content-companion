'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/lib/actions/auth';
import styles from './page.module.css';

export default function SignInPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        const result = await signIn(formData);
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <div className={styles.monogram}>CCC</div>
                    <span>The Calm Content Companion</span>
                </div>

                <h1 className={styles.title}>Welcome back.</h1>

                {error && (
                    <div style={{ color: '#e05e5e', fontSize: '0.9rem', marginBottom: '1rem', padding: '0.75rem', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '6px' }}>
                        {error}
                    </div>
                )}

                <form action={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input type="email" id="email" name="email" className={styles.input} placeholder="you@company.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label htmlFor="password" className={styles.label} style={{ marginBottom: 0 }}>Password</label>
                            <Link href="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--sage-accent)' }}>Forgot?</Link>
                        </div>
                        <input type="password" id="password" name="password" className={styles.input} required />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                        style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.footer}>
                    Don&apos;t have an account? <Link href="/get-started" className={styles.link}>Get started</Link>
                </div>
            </div>
        </div>
    );
}
