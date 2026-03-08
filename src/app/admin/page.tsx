"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Package, Inbox } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        messages: 0,
        unread: 0
    });

    useEffect(() => {
        // Quick stats loader
        const loadStats = async () => {
            const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
            const { count: msgCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });
            const { count: unreadCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new');

            setStats({
                products: productCount || 0,
                messages: msgCount || 0,
                unread: unreadCount || 0
            });
        };

        // Only fetch if connected
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            loadStats();
        }
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Panel Özeti</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Toplam Ürün</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.products}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                        <Package className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Toplam Mesaj</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.messages}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <Inbox className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Okunmamış Mesaj</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.unread}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
