import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h1 className={styles.headline}>Turn messy ideas into calm, ready-to-post content.</h1>
                <p className={styles.subheadline}>
                    Less noise. More clarity. Tools that shape your message before you hit publish.
                </p>
                <div className={styles.actions}>
                    <Link href="/tools" className={styles.primaryCta}>Try the tools</Link>
                    <Link href="/how-it-works" className={styles.secondaryCta}>See how it works</Link>
                </div>
            </div>
            <div className={styles.visual}>
                <div className={styles.heroImageWrapper}>
                    <Image
                        src="/images/desktop_CCC.png"
                        alt="Calm content workspace illustration"
                        width={540}
                        height={540}
                        className={styles.heroImage}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
