import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Clarity over cleverness.</h1>
                <p className={styles.subtitle}>
                    We believe the internet is loud enough. Your message doesn't need to shout to be heard; it just needs to be clear.
                </p>
            </header>

            <div className={styles.mission}>
                <h2 className={styles.missionTitle}>Our Mission</h2>
                <p className={styles.manifesto}>
                    "To build tools that help creators refine their thoughts into calm, valuable signals amidst the noise."
                </p>
            </div>

            <div className={styles.content}>
                <p>
                    Content creation often feels like a race to be the loudest, the fastest, or the most provocative.
                    But sustainable influence isn't built on hype—it's built on trust. And trust comes from
                    consistently delivering clear, valuable ideas.
                </p>
                <p>
                    We built <strong>The Calm Content Companion</strong> because we were tired of &quot;growth hacks&quot; and &quot;viral templates.&quot;
                    We wanted a workspace that respected the craft of writing. A place where you could dismantle a
                    messy idea, examine its parts, and reassemble it into something stronger.
                </p>

                <h2>Design Philosophy</h2>
                <p>
                    Our tools are designed to be "invisible." They don't have gamified notifications or dopamine loops.
                    They are quiet utilities—like a well-balanced pen or a clean sheet of paper—that get out of your way
                    so you can think.
                </p>
                <p>
                    We use earth tones and minimalist interfaces to reduce cognitive load. When you open our app,
                    we want you to feel a sense of relief, not urgency.
                </p>
            </div>

            <section className={styles.team}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Who we are</h2>
                <p style={{ color: 'var(--secondary-text)' }}>A small team of writers and engineers.</p>

                <div className={styles.teamGrid}>
                    <div className={styles.member}>
                        <div className={styles.avatar}>G</div>
                        <h3>Greg M.</h3>
                        <p className={styles.role}>Founder & Lead Writer</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
