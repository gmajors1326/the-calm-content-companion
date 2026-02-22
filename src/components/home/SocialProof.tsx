import styles from './SocialProof.module.css';

export default function SocialProof() {
    return (
        <section className={styles.section}>
            <p className={styles.text}>Used by creators and service businesses who prefer clarity over hype.</p>
            <div className={styles.logos}>
                <div className={styles.logoItem}>Essential.io</div>
                <div className={styles.logoItem}>Clarified</div>
                <div className={styles.logoItem}>MutedCo</div>
                <div className={styles.logoItem}>Tactical</div>
                <div className={styles.logoItem}>Foundry</div>
            </div>
        </section>
    );
}
