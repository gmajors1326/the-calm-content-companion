import Link from 'next/link';
import styles from './FlagshipProduct.module.css';

export default function FlagshipProduct() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>The Calm Content Guide</h2>
            <p className={styles.description}>
                A foundational system for creators who want to build a library of high-value assets, not just a feed of fleeting posts.
            </p>
            <Link href="/guide" className={styles.button}>
                Start with the Guide
            </Link>
        </section>
    );
}
