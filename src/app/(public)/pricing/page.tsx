import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import styles from './page.module.css';

export default function PricingPage() {
    return (
        <div className={styles.page}>
            <header className={styles.intro}>
                <h1 className={styles.title}>Invest in clarity.</h1>
                <p className={styles.subtitle}>
                    Choose a plan that fits your writing volume. Upgrade, downgrade, or cancel anytime.
                    All plans include our "Calm Guarantee"—no upsells, no ads.
                </p>
            </header>

            <Pricing />

            <div className={styles.faqSection}>
                <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '3rem' }}>
                    Common Questions
                </h2>
                <FAQ />
            </div>
        </div>
    );
}
