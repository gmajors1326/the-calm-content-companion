import styles from './page.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <div className={styles.content}>
                <p>Last updated: Feb 12, 2026</p>
                <p>
                    At The Calm Content Companion, we prioritize your privacy and clarity. We collect minimal data necessary
                    to provide our services. We do not sell your data to third parties.
                </p>

                <h2>Data We Collect</h2>
                <p>
                    When you create an account, we collect your email address and name.
                    When you use our tools, the text you input is processed to provide analysis but is not used to train global AI models without your explicit consent.
                </p>

                <h2>Cookies</h2>
                <p>
                    We use essential cookies to keep you logged in. We do not use intrusive tracking pixels.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@calmcontent.com.
                </p>
            </div>
        </div>
    );
}
