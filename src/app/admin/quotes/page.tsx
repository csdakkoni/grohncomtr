"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Plus, Download, X } from "lucide-react";

interface Quote {
    id: string;
    created_at: string;
    source: string;
    product: string;
    quantity: number | null;
    unit: string | null;
    country: string | null;
    port: string | null;
    incoterm: string | null;
    target_price: string | null;
    name: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
    page_url: string | null;
    status: string;
    quoted_price: string | null;
    notes: string | null;
}

const SOURCES: Record<string, string> = { web: "Web formu", whatsapp: "WhatsApp", email: "E-posta", phone: "Telefon", other: "Diğer" };
const STATUSES: Record<string, string> = { new: "Yeni", quoted: "Teklif verildi", won: "Satış oldu", lost: "Olmadı" };
const UNITS: Record<string, string> = { ton: "ton", kg: "kg", ibc: "IBC", container: "konteyner" };

const EMPTY_LEAD = { source: "whatsapp", product: "", quantity: "", unit: "ton", country: "", incoterm: "", target_price: "", name: "", company: "", phone: "", email: "", message: "" };

const statusColor = (s: string) =>
    s === "won" ? "bg-green-100 text-green-800" : s === "lost" ? "bg-gray-100 text-gray-500" : s === "quoted" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800";

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [tableMissing, setTableMissing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [lead, setLead] = useState(EMPTY_LEAD);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        const { data, error } = await supabase
            .from("quote_requests")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.error(error);
            setTableMissing(true);
        }
        if (data) setQuotes(data);
        setLoading(false);
    };

    const updateQuote = async (id: string, fields: Partial<Quote>) => {
        setQuotes(prev => prev.map(q => (q.id === id ? { ...q, ...fields } : q)));
        await supabase.from("quote_requests").update(fields).eq("id", id);
    };

    const addLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from("quote_requests").insert({
            ...lead,
            quantity: Number(lead.quantity) > 0 ? Number(lead.quantity) : null,
            incoterm: lead.incoterm || null,
        });
        setSaving(false);
        if (error) {
            alert("Kaydedilemedi: " + error.message);
            return;
        }
        setLead(EMPTY_LEAD);
        setShowForm(false);
        fetchQuotes();
    };

    // Demand summary: which products and countries come up most
    const byProduct = useMemo(() => {
        const map = new Map<string, { name: string; count: number; countries: Set<string> }>();
        for (const q of quotes) {
            const key = q.product.trim().toLocaleLowerCase("tr");
            const row = map.get(key) ?? { name: q.product.trim(), count: 0, countries: new Set<string>() };
            row.count++;
            if (q.country) row.countries.add(q.country.trim());
            map.set(key, row);
        }
        return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 10);
    }, [quotes]);

    const byCountry = useMemo(() => {
        const map = new Map<string, number>();
        for (const q of quotes) {
            const c = q.country?.trim();
            if (c) map.set(c, (map.get(c) ?? 0) + 1);
        }
        return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    }, [quotes]);

    const exportCsv = () => {
        const cols: (keyof Quote)[] = ["created_at", "source", "status", "product", "quantity", "unit", "country", "port", "incoterm", "target_price", "quoted_price", "name", "company", "email", "phone", "message", "notes", "page_url"];
        const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
        const csv = [cols.join(","), ...quotes.map(q => cols.map(c => esc(q[c])).join(","))].join("\n");
        const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `teklif-talepleri-${format(new Date(), "yyyy-MM-dd")}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    if (tableMissing) {
        return (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-6 max-w-2xl">
                <h1 className="text-lg font-bold mb-2">Teklif tablosu henüz kurulmamış</h1>
                <p>Supabase SQL Editor&apos;da projedeki <code>quote-requests.sql</code> dosyasını bir kez çalıştırın. O zamana kadar web formundan gelen talepler &quot;Mesajlar&quot; bölümüne düşer.</p>
            </div>
        );
    }

    const input = "w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-primary";

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Teklif Talepleri</h1>
                    <p className="text-gray-500 mt-1">Web formundan gelenler ve elle eklediğiniz WhatsApp, e-posta, telefon talepleri.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium">
                        <Download className="w-4 h-4" /> Excel (CSV)
                    </button>
                    <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 font-medium">
                        {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} Talep ekle
                    </button>
                </div>
            </div>

            {showForm && (
                <form onSubmit={addLead} className="bg-white rounded-xl border border-gray-200 p-6 mb-8 grid md:grid-cols-4 gap-4">
                    <label className="md:col-span-1">
                        <span className="block text-xs text-gray-500 mb-1">Kaynak</span>
                        <select className={input} value={lead.source} onChange={e => setLead({ ...lead, source: e.target.value })}>
                            {Object.entries(SOURCES).filter(([k]) => k !== "web").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </label>
                    <label className="md:col-span-3">
                        <span className="block text-xs text-gray-500 mb-1">Ürün *</span>
                        <input required className={input} value={lead.product} onChange={e => setLead({ ...lead, product: e.target.value })} placeholder="ör. Hidroklorik asit %32" />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Miktar</span>
                        <div className="flex gap-2">
                            <input type="number" step="any" min="0" className={input} value={lead.quantity} onChange={e => setLead({ ...lead, quantity: e.target.value })} />
                            <select className={`${input} w-auto`} value={lead.unit} onChange={e => setLead({ ...lead, unit: e.target.value })}>
                                {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                            </select>
                        </div>
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Ülke</span>
                        <input className={input} value={lead.country} onChange={e => setLead({ ...lead, country: e.target.value })} />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Incoterm</span>
                        <input className={input} value={lead.incoterm} onChange={e => setLead({ ...lead, incoterm: e.target.value })} placeholder="FOB, CIF..." />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Müşterinin hedef fiyatı</span>
                        <input className={input} value={lead.target_price} onChange={e => setLead({ ...lead, target_price: e.target.value })} />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Kişi</span>
                        <input className={input} value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Firma</span>
                        <input className={input} value={lead.company} onChange={e => setLead({ ...lead, company: e.target.value })} />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">Telefon</span>
                        <input className={input} value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} />
                    </label>
                    <label>
                        <span className="block text-xs text-gray-500 mb-1">E-posta</span>
                        <input className={input} value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} />
                    </label>
                    <label className="md:col-span-4">
                        <span className="block text-xs text-gray-500 mb-1">Not</span>
                        <textarea rows={2} className={input} value={lead.message} onChange={e => setLead({ ...lead, message: e.target.value })} />
                    </label>
                    <div className="md:col-span-4">
                        <button disabled={saving} className="px-6 py-2 rounded-lg bg-primary text-white font-medium disabled:opacity-50">
                            {saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </form>
            )}

            {quotes.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">En çok istenen ürünler</h2>
                        <table className="w-full">
                            <tbody>
                                {byProduct.map(p => (
                                    <tr key={p.name} className="border-t border-gray-100">
                                        <td className="py-2">{p.name}</td>
                                        <td className="py-2 text-gray-500 text-xs">{[...p.countries].join(", ")}</td>
                                        <td className="py-2 text-end font-semibold">{p.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Ülkeler</h2>
                        <table className="w-full">
                            <tbody>
                                {byCountry.map(([c, n]) => (
                                    <tr key={c} className="border-t border-gray-100">
                                        <td className="py-2">{c}</td>
                                        <td className="py-2 text-end font-semibold">{n}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {quotes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                        Henüz teklif talebi yok.
                    </div>
                ) : (
                    quotes.map(q => (
                        <div key={q.id} className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">
                                        {q.product}
                                        {q.quantity ? <span className="font-normal text-gray-600"> · {q.quantity} {UNITS[q.unit ?? ""] ?? q.unit ?? ""}</span> : null}
                                    </h3>
                                    <p className="text-gray-500 mt-1">
                                        {[q.country, q.port, q.incoterm && q.incoterm !== "unsure" ? q.incoterm : null].filter(Boolean).join(" · ") || "Ülke belirtilmemiş"}
                                        {q.target_price ? <> · Hedef fiyat: <span className="text-gray-900">{q.target_price}</span></> : null}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">{SOURCES[q.source] ?? q.source}</span>
                                    <span className="text-gray-500">{format(new Date(q.created_at), "dd MMM yyyy HH:mm", { locale: tr })}</span>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                                {[q.name, q.company].filter(Boolean).join(", ")}
                                {q.email ? <> · <a href={`mailto:${q.email}`} className="text-primary hover:underline">{q.email}</a></> : null}
                                {q.phone ? <> · <a href={`https://wa.me/${q.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{q.phone}</a></> : null}
                            </p>
                            {q.message && <p className="bg-gray-50 p-3 rounded-lg text-gray-600 whitespace-pre-wrap mb-4">{q.message}</p>}

                            <div className="grid md:grid-cols-3 gap-3">
                                <select
                                    value={q.status}
                                    onChange={e => updateQuote(q.id, { status: e.target.value })}
                                    className={`px-3 py-2 rounded-lg font-medium border-0 ${statusColor(q.status)}`}
                                >
                                    {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                                <input
                                    defaultValue={q.quoted_price ?? ""}
                                    onBlur={e => e.target.value !== (q.quoted_price ?? "") && updateQuote(q.id, { quoted_price: e.target.value || null })}
                                    placeholder="Verdiğim fiyat"
                                    className={input}
                                />
                                <input
                                    defaultValue={q.notes ?? ""}
                                    onBlur={e => e.target.value !== (q.notes ?? "") && updateQuote(q.id, { notes: e.target.value || null })}
                                    placeholder="Not (maliyet, rakip fiyatı...)"
                                    className={input}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
