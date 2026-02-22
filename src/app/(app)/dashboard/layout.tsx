import Sidebar from "@/components/dashboard/Sidebar";
import styles from "./layout.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebarWrapper} style={{ position: 'fixed', left: 0, top: 0, width: '260px', zIndex: 100 }}>
                <Sidebar />
            </div>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
