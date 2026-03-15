"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, LogOut, Loader2, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && pathname !== "/admin/login") {
                router.push("/admin/login");
            }
            setLoading(false);
        };

        checkUser();
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    // If on login page, render only children (Login form)
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-primary">GROHN<span className="text-accent">ADMIN</span></h2>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname === '/admin' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        Genel Bakış
                    </Link>
                    <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname.startsWith('/admin/products') ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Package className="w-5 h-5" />
                        Ürün Yönetimi
                    </Link>
                    <Link href="/admin/categories" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname.startsWith('/admin/categories') ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        Kategoriler
                    </Link>
                    <Link href="/admin/messages" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname.startsWith('/admin/messages') ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <MessageSquare className="w-5 h-5" />
                        Mesajlar
                    </Link>
                    <Link href="/admin/blog" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname.startsWith('/admin/blog') ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <FileText className="w-5 h-5" />
                        Blog
                    </Link>
                    <Link href="/admin/files" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${pathname.startsWith('/admin/files') ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <FolderOpen className="w-5 h-5" />
                        Dosyalar
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push("/admin/login");
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 w-full text-start transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ms-64 p-8">
                {children}
            </main>
        </div>
    );
}
