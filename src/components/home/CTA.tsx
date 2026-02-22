import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
    return (
        <section className={styles.section}>
            <h2 className={styles.headline}>Stop posting guesses.<br />Start posting with intent.</h2>
            <Link href="/get-started" className={styles.button}>
                Try The Calm Content Companion
            </Link>
        </section>
    );
}
