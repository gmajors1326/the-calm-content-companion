import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link href="/about" className={styles.link}>About</Link>
                <Link href="/tools" className={styles.link}>Tools</Link>
                <Link href="/pricing" className={styles.link}>Pricing</Link>
                <Link href="/blog" className={styles.link}>Blog</Link>
                <Link href="/privacy" className={styles.link}>Privacy</Link>
                <Link href="/terms" className={styles.link}>Terms</Link>
            </div>
            <p className={styles.copy}>
                &copy; {new Date().getFullYear()} The Calm Content Companion. Clarity over cleverness.
            </p>
        </footer>
    );
}
