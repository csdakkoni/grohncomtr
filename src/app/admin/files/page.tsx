"use client";

import { useState, useCallback } from "react";
import { Upload, Loader2, Trash2, Copy, FileText, Image as ImageIcon, Check } from "lucide-react";

interface UploadedFile {
    url: string;
    fileName: string;
    type: "image" | "pdf";
    size: number;
}

export default function AdminFilesPage() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [folder, setFolder] = useState("general");
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    const handleUpload = useCallback(async (fileList: FileList | null) => {
        if (!fileList) return;

        setUploading(true);
        for (const file of Array.from(fileList)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            try {
                const res = await fetch("/api/upload", { method: "POST", body: formData });
                const data = await res.json();
                if (data.success) {
                    setFiles(prev => [...prev, {
                        url: data.url,
                        fileName: data.fileName,
                        type: data.type,
                        size: data.size,
                    }]);
                } else {
                    alert(`Hata (${file.name}): ${data.error}`);
                }
            } catch {
                alert(`Yükleme hatası: ${file.name}`);
            }
        }
        setUploading(false);
    }, [folder]);

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dosya Yönetimi</h1>

            {/* Upload Area */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Klasör</label>
                        <select
                            value={folder}
                            onChange={e => setFolder(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        >
                            <option value="general">Genel</option>
                            <option value="blog">Blog Görselleri</option>
                            <option value="products">Ürün Görselleri</option>
                            <option value="sds">SDS (Güvenlik Bilgi Formu)</option>
                            <option value="tds">TDS (Teknik Veri Sayfası)</option>
                            <option value="certificates">Sertifikalar</option>
                        </select>
                    </div>
                </div>

                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition cursor-pointer">
                    {uploading ? (
                        <>
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                            <span className="text-sm text-gray-500">Yükleniyor...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 font-medium">Dosyaları sürükleyin veya tıklayın</span>
                            <span className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (10MB) • PDF (25MB)</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        multiple
                        onChange={e => handleUpload(e.target.files)}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Yüklenen Dosyalar ({files.length})</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {files.map((file, i) => (
                            <div key={i} className="px-6 py-3 flex items-center gap-4 hover:bg-gray-50 transition">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                    {file.type === "pdf" ? (
                                        <FileText className="w-5 h-5 text-red-500" />
                                    ) : (
                                        <ImageIcon className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{file.fileName}</p>
                                    <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => copyUrl(file.url)}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                                        title="URL kopyala"
                                    >
                                        {copiedUrl === file.url ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => removeFile(i)}
                                        className="p-2 text-gray-400 hover:text-red-600 transition"
                                        title="Listeden kaldır"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 text-sm text-blue-800">
                <h3 className="font-semibold mb-2">Kullanım Kılavuzu</h3>
                <ul className="space-y-1 text-blue-700">
                    <li>• <strong>SDS/TDS</strong>: Ürün güvenlik ve teknik dokümanlarını &quot;SDS&quot; veya &quot;TDS&quot; klasörüne yükleyin</li>
                    <li>• <strong>Blog görseli</strong>: Blog yazısı kapak fotoğraflarını &quot;Blog Görselleri&quot; klasörüne yükleyin</li>
                    <li>• <strong>URL kopyala</strong>: Yüklenen dosyanın URL&apos;ini kopyalayıp istediğiniz yerde kullanın</li>
                    <li>• Dosyalar Cloudflare R2&apos;de saklanır — hızlı ve güvenli</li>
                </ul>
            </div>
        </div>
    );
}
