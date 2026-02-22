'use client';

import { use } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Mock content
const posts: Record<string, { title: string; category: string; date: string; content: React.ReactNode }> = {
    'clarity-over-cleverness': {
        title: 'Why Clarity Beats Cleverness Every Time',
        category: 'Philosophy',
        date: 'Feb 12, 2026',
        content: (
            <>
                <p>
                    We live in an attention economy, and the natural reaction for most creators is to shout.
                    They use neon colors, clickbait headlines, and aggressive hooks to stop the scroll.
                </p>
                <p>
                    But there is a different way to win.
                </p>
                <h2>The Signal to Noise Ratio</h2>
                <p>
                    When everyone is shouting, a whisper is the most disruptive sound in the room.
                    Clarity is that whisper. It respects the reader's time. It delivers value without the
                    performance art of "engagement farming."
                </p>
                <blockquote>
                    "Clear writing is a sign of clear thinking."
                </blockquote>
                <p>
                    Our tools are built on this premise. We don't want to help you write "viral" content.
                    We want to help you write content that lasts. Content that builds trust because it is
                    undeniably useful and easy to understand.
                </p>
            </>
        )
    },
    'hook-psychology': {
        title: 'The Psychology of a Great Hook',
        category: 'Tactical',
        date: 'Feb 08, 2026',
        content: (
            <>
                <p>
                    A hook isn't about tricking someone into reading. It's about opening a loop in their mind
                    that they feel compelled to close.
                </p>
                <h2>Curiosity Gaps</h2>
                <p>
                    The most effective hooks create a gap between what the reader knows and what they
                    <em>want</em> to know.
                </p>
                <p>
                    Bad hook: "Here is how to write better." (Boring, no gap)<br />
                    Good hook: "I spent 10 years writing bad copy until I learned one rule that changed everything." (Gap created: What is the rule?)
                </p>
            </>
        )
    },
    'content-consistency': {
        title: 'Consistency is a Function of System Design',
        category: 'Systems',
        date: 'Jan 28, 2026',
        content: (
            <>
                <p>
                    You don't need more willpower. You need a better environment.
                </p>
                <p>
                    If you have to make 10 decisions before you start writing (Which tool? What font? What topic?),
                    you will fail. Reduce the friction.
                </p>
            </>
        )
    }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = posts[slug];

    if (!post) {
        return (
            <div className={styles.container}>
                <h1>Post not found</h1>
                <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.category}>{post.category}</div>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.date}>{post.date}</div>
            </header>

            <article className={styles.content}>
                {post.content}
            </article>

            <Link href="/blog" className={styles.backLink}>
                ← Back to all essays
            </Link>
        </div>
    );
}
