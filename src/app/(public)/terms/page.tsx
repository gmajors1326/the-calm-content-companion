import styles from './page.module.css';

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms of Service</h1>
            <div className={styles.content}>
                <p>Last updated: Feb 12, 2026</p>
                <p>
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using
                    The Calm Content Companion website operated by The Calm Content Companion ("us", "we", or "our").
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using the Service you agree to be bound by these Terms.
                    If you disagree with any part of the terms then you may not access the Service.
                </p>

                <h2>2. Subscriptions</h2>
                <p>
                    Some parts of the Service are billed on a subscription basis ("Subscription(s)").
                    You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
                </p>

                <h2>3. Content</h2>
                <p>
                    Our Service allows you to post, link, store, share and otherwise make available certain information,
                    text, graphics, videos, or other material ("Content"). You are responsible for the Content that you
                    post to the Service, including its legality, reliability, and appropriateness.
                </p>

                <h2>4. Termination</h2>
                <p>
                    We may terminate or suspend access to our Service immediately, without prior notice or liability,
                    for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
            </div>
        </div>
    );
}
