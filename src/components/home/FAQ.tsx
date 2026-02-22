import styles from './FAQ.module.css';

const questions = [
    {
        q: "Is this another AI writer that generates generic text?",
        a: "No. The Calm Content Companion is not a generator; it is a clarity engine. We use AI to analyze, structure, and refine your own ideas, not to replace them. You provide the substance; we provide the form."
    },
    {
        q: "Who is this platform designed for?",
        a: "It is for creators, founders, and service professionals who value substance over noise. If you want to build trust through clear communication rather than viral tricks, this is for you."
    },
    {
        q: "How is this different from tools like ChatGPT?",
        a: "Standard LLMs range too wide. Our tools are constrained and tuned specifically for content strategy frameworks—hooks, positioning, and engagement—ensuring focused, high-quality output every time."
    },
    {
        q: "Do I need to be a professional writer?",
        a: "Not at all. The tools are built to guide you. If you can articulate a rough idea or a problem you solve, the system helps you shape it into a polished, professional piece."
    },
    {
        q: "Can I export directly to social media?",
        a: "We focus on the writing and structuring phase. Once your content is ready, you can copy it with one click to your clipboard, formatted perfectly for LinkedIn, Twitter/X, or your newsletter."
    },
    {
        q: "What is the 'Clarity Score'?",
        a: "It is our proprietary metric that evaluates how easily a reader can understand your core message. It checks for jargon, sentence structure, and logical flow."
    }
];

export default function FAQ() {
    return (
        <section className={styles.section}>
            <h2 className={styles.headline}>Common Questions</h2>
            <div className={styles.accordion}>
                {questions.map((item, i) => (
                    <details key={i} className={styles.item}>
                        <summary className={styles.question} style={{ listStyle: 'none' }}>
                            {item.q}
                            <span style={{ marginLeft: '1rem', color: 'var(--sage-accent)' }}>+</span>
                        </summary>
                        <p className={styles.answer} style={{ display: 'block', marginTop: '0.5rem', opacity: 0.9 }}>
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}
