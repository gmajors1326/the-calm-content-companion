import Link from 'next/link';
import styles from './page.module.css';

const posts = [
    {
        slug: 'clarity-over-cleverness',
        title: 'Why Clarity Beats Cleverness Every Time',
        excerpt: 'In a noisy world, the most respectful thing you can do for your reader is to be clear. Here\'s how to strip away the fluff.',
        category: 'Philosophy',
        date: 'Feb 12, 2026'
    },
    {
        slug: 'hook-psychology',
        title: 'The Psychology of a Great Hook (Assume Indifference)',
        excerpt: 'Your reader is busy and slightly bored. Your first sentence has one job: disrupt their pattern without being annoying.',
        category: 'Tactical',
        date: 'Feb 08, 2026'
    },
    {
        slug: 'content-consistency',
        title: 'Consistency is a Function of System design, Not Willpower',
        excerpt: 'Stop relying on motivation to write. Build a system that makes writing the path of least resistance.',
        category: 'Systems',
        date: 'Jan 28, 2026'
    }
];

export default function BlogPage() {
    return (
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Notes on Craft</h1>
                <p className={styles.intro}>
                    Essays on writing, clarity, and building an audience without losing your mind.
                </p>
            </header>

            <div className={styles.posts}>
                {posts.map((post) => (
                    <article key={post.slug} className={styles.post}>
                        <div className={styles.category}>{post.category} • {post.date}</div>
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                        </Link>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                            Read Essay
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
