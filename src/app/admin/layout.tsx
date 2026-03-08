import "../globals.css";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
    title: 'Grohn Admin Paneli',
    description: 'Yönetim Paneli',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="bg-gray-50 min-h-screen text-sm">
                <AdminShell>
                    {children}
                </AdminShell>
            </body>
        </html>
    );
}
