import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, isR2Configured } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PDF_SIZE = 25 * 1024 * 1024;   // 25MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const ALLOWED_PDF_TYPES = ['application/pdf'];

export async function POST(request: NextRequest) {
    try {
        if (!isR2Configured) {
            return NextResponse.json(
                { error: 'Dosya depolama yapılandırılmamış. R2 env değişkenlerini kontrol edin.' },
                { status: 503 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
        }

        const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
        const isPDF = ALLOWED_PDF_TYPES.includes(file.type);

        if (!isImage && !isPDF) {
            return NextResponse.json(
                { error: 'Geçersiz dosya tipi. Sadece JPEG, PNG, WebP ve PDF desteklenir.' },
                { status: 400 }
            );
        }

        const maxSize = isPDF ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: `Dosya çok büyük. Maks: ${maxSize / 1024 / 1024}MB` },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const ext = isPDF ? 'pdf' : file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const baseName = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-z0-9]/gi, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-')
            .toLowerCase() || 'file';
        const fileName = `${baseName}-${timestamp}.${ext}`;
        const key = `${folder}/${fileName}`;

        // Read file buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to R2
        const result = await uploadToR2(key, buffer, file.type);

        if (!result.success) {
            return NextResponse.json(
                { error: `Yükleme hatası: ${result.error}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            url: result.url,
            key,
            fileName,
            size: file.size,
            type: isPDF ? 'pdf' : 'image',
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Yükleme sırasında bir hata oluştu.' },
            { status: 500 }
        );
    }
}
