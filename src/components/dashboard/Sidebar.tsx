'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, History, CreditCard, LogOut, Home } from 'lucide-react';
import styles from './Sidebar.module.css';
import { signOut } from '@/lib/actions/auth';

const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tools', href: '/dashboard/tools', icon: PenTool },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.logo}>
                <div className={styles.monogram}>CCT</div>
                <span>Calm Content Tools</span>
            </Link>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.link} ${isActive ? styles.active : ''}`}
                        >
                            <item.icon size={18} className={styles.icon} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className={styles.bottomSection}>
                <Link href="/" className={styles.bottomLink}>
                    <Home size={16} />
                    Back to Home
                </Link>

                <form action={signOut}>
                    <button type="submit" className={styles.signOutBtn}>
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
