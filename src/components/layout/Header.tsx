import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <div className={styles.monogram}>CCC</div>
                <span>The Calm Content Companion</span>
            </Link>

            <nav className={styles.nav}>
                <Link href="/tools" className={styles.link}>Tools</Link>
                <Link href="/pricing" className={styles.link}>Pricing</Link>
                <Link href="/blog" className={styles.link}>Blog</Link>
                <Link href="/about" className={styles.link}>About</Link>
                <Link href="/sign-in" className={styles.link}>Sign In</Link>
                <Link href="/get-started" className={`${styles.link} ${styles.cta}`}>Get Started</Link>
            </nav>
        </header>
    );
}
