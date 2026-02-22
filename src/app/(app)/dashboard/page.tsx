import Link from 'next/link';
import { PenTool, History, BookOpen, Plus } from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.welcome}>Good morning, Mike.</h1>
                <p className={styles.date}>{currentDate}</p>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.grid}>
                    <Link href="/dashboard/tools" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <Plus size={24} />
                        </div>
                        <div>
                            <div className={styles.cardName}>New Analysis</div>
                            <div className={styles.cardDesc}>Evaluate a hook or positioning statement.</div>
                        </div>
                    </Link>

                    <Link href="/dashboard/history" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <History size={24} />
                        </div>
                        <div>
                            <div className={styles.cardName}>Recent History</div>
                            <div className={styles.cardDesc}>View your past 5 analyses.</div>
                        </div>
                    </Link>

                    <Link href="/dashboard/guide" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <div className={styles.cardName}>The Guide</div>
                            <div className={styles.cardDesc}>Review your core messaging framework.</div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', color: 'var(--secondary-text)' }}>
                    <p>You haven't analyzed anything yet this week.</p>
                </div>
            </section>
        </div>
    );
}
