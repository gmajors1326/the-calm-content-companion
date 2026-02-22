'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/actions/auth';
import styles from './page.module.css';

export default function GetStartedPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        const result = await signUp(formData);
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

                <h1 className={styles.title}>Start writing clearly.</h1>

                {error && (
                    <div style={{ color: '#e05e5e', fontSize: '0.9rem', marginBottom: '1rem', padding: '0.75rem', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '6px' }}>
                        {error}
                    </div>
                )}

                <form action={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Full Name</label>
                        <input type="text" id="name" name="name" className={styles.input} placeholder="Jane Doe" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input type="email" id="email" name="email" className={styles.input} placeholder="you@company.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Create Password</label>
                        <input type="password" id="password" name="password" className={styles.input} minLength={6} required />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                        style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className={styles.footer}>
                    Already have an account? <Link href="/sign-in" className={styles.link}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}
