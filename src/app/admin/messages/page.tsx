"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Message {
    id: string;
    full_name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    status: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setMessages(data);
        setLoading(false);
    };

    const markAsRead = async (id: string) => {
        await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id);
        fetchMessages(); // Refresh
    };

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gelen Mesajlar</h1>
                <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-medium">Topam: {messages.length}</span>
            </div>

            <div className="grid gap-4">
                {messages.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                        Henüz mesaj yok.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`bg-white p-6 rounded-xl border transition ${msg.status === 'new' ? 'border-primary/50 ring-1 ring-primary/20' : 'border-gray-200'}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.status === 'new' ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{msg.full_name}</h3>
                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {format(new Date(msg.created_at), 'dd MMM yyyy HH:mm', { locale: tr })}
                                    </div>
                                    {msg.status === 'new' && (
                                        <button
                                            onClick={() => markAsRead(msg.id)}
                                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                                        >
                                            <CheckCircle className="w-3 h-3" /> Okundu İşaretle
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-900 mb-1">{msg.subject}</p>
                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{msg.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
