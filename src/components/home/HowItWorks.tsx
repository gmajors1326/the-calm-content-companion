import { PenTool, Layout, Send } from 'lucide-react';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
    return (
        <section className={styles.section}>
            <h2 className={styles.headline}>How It Works</h2>
            <div className={styles.grid}>
                <div className={styles.step}>
                    <div className={styles.icon}>
                        <PenTool size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.title}>Input</h3>
                    <p className={styles.description}>Dump your messy thoughts, half-baked ideas, or rough notes.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.icon}>
                        <Layout size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.title}>Structure</h3>
                    <p className={styles.description}>Our tools organize, clarify, and format your thoughts into coherence.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.icon}>
                        <Send size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.title}>Publish</h3>
                    <p className={styles.description}>Copy the polished result and share it with your audience.</p>
                </div>
            </div>
        </section>
    );
}
