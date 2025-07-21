import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تحديد المسارات
const sourceDir = path.resolve(__dirname, '../attached_assets');
const publicDir = path.resolve(__dirname, '../client/public/images');
const clientPublicDir = path.resolve(__dirname, '../client/public/images');
const distDir = path.resolve(__dirname, '../dist/images');

// التأكد من وجود المجلدات
async function ensureDirectoryExists(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// نسخ الملفات من مجلد لآخر
async function copyFiles(source, dest) {
    // التأكد من وجود المجلد المصدر
    try {
        await fs.access(source);
    } catch {
        console.error(`المجلد المصدر غير موجود: ${source}`);
        return;
    }

    // التأكد من وجود المجلد الهدف
    await ensureDirectoryExists(dest);

    // قراءة محتويات المجلد المصدر وفلترة الصور
    const files = await fs.readdir(source);
    
    // تعيين أسماء الملفات الجديدة
    const fileMapping = {
        'WhatsApp Image 2025-07-18 at 4.44.59 PM_1753004100081.jpeg': 'bravo-mega-notebook.jpeg',
        'WhatsApp Image 2025-07-18 at 4.46.10 PM_1753004188486.jpeg': 'bravo-classic-notebook-pen.jpeg',
        'WhatsApp Image 2025-07-18 at 4.47.14 PM_1753004277535.jpeg': 'bravo-hardcover-notebook-a5.jpeg',
        'WhatsApp Image 2025-07-18 at 4.48.58 PM_1753004393155.jpeg': 'image-1.jpeg',
        'WhatsApp Image 2025-07-18 at 4.51.02 PM_1753004530158.jpeg': 'image-2.jpeg',
        'WhatsApp Image 2025-07-18 at 4.52.47 PM_1753004746844.jpeg': 'image-3.jpeg',
        'WhatsApp Image 2025-07-18 at 4.54.21 PM_1753004854164.jpeg': 'image-4.jpeg',
        'WhatsApp Image 2025-07-18 at 4.55.45 PM_1753004965344.jpeg': 'image-5.jpeg',
        'WhatsApp Image 2025-07-18 at 4.56.45 PM_1753005133584.jpeg': 'image-6.jpeg',
        'WhatsApp Image 2025-07-18 at 4.57.19 PM_1753005214112.jpeg': 'image-7.jpeg',
        'WhatsApp Image 2025-07-18 at 4.57.48 PM_1753005310092.jpeg': 'image-8.jpeg',
        'WhatsApp Image 2025-07-18 at 4.58.27 PM_1753005439636.jpeg': 'image-9.jpeg',
        'WhatsApp Image 2025-07-18 at 4.59.56 PM_1753005484619.jpeg': 'image-10.jpeg',
        'WhatsApp Image 2025-07-18 at 5.00.43 PM_1753005524356.jpeg': 'image-11.jpeg',
        'WhatsApp Image 2025-07-18 at 5.01.18 PM_1753005565773.jpeg': 'image-12.jpeg',
        'WhatsApp Image 2025-07-18 at 5.02.00 PM_1753005603720.jpeg': 'image-13.jpeg',
        'WhatsApp Image 2025-07-18 at 5.02.46 PM_1753005662219.jpeg': 'image-14.jpeg',
        'WhatsApp Image 2025-07-18 at 5.03.36 PM_1753005715129.jpeg': 'image-15.jpeg',
        'WhatsApp Image 2025-07-18 at 5.04.34 PM_1753005763524.jpeg': 'image-16.jpeg',
        'WhatsApp Image 2025-07-18 at 5.05.22 PM_1753005801173.jpeg': 'image-17.jpeg',
        'WhatsApp Image 2025-07-18 at 5.05.52 PM_1753005885372.jpeg': 'image-18.jpeg',
        'WhatsApp Image 2025-07-18 at 5.06.27 PM_1753005934751.jpeg': 'image-19.jpeg',
        'WhatsApp Image 2025-07-18 at 5.13.25 PM_1753004672367.jpeg': 'image-20.jpeg',
        'files_2723941-1752961293443-كشكول سلك 4 فواصل 200 A4 Hello-صورة-1_1753000650566.jpg': 'notebook-1.jpg',
        'files_2723941-1752961293443-كشكول سلك 4 فواصل 200 A4 Hello-صورة-1_1753003363031.jpg': 'notebook-2.jpg'
    };
    
    // نسخ كل ملف
    for (const file of files) {
        const sourceFile = path.join(source, file);
        const newFileName = fileMapping[file] || file;
        const destFile = path.join(dest, newFileName);

        // نسخ الملف فقط إذا كان صورة
        if (file.match(/.(jpg|jpeg|png|gif)$/i)) {
            await fs.copyFile(sourceFile, destFile);
            console.log(`تم نسخ الملف: ${file} -> ${newFileName}`);
        }
    }
}

// تنفيذ عملية النسخ
async function main() {
    try {
        // نسخ الملفات إلى المجلدات العامة
        await copyFiles(sourceDir, publicDir);
        
        // نسخ الملفات إلى مجلد client/public
        await copyFiles(sourceDir, clientPublicDir);

        // نسخ الملفات إلى مجلد dist
        await copyFiles(sourceDir, distDir);

        console.log('تم نسخ جميع الملفات بنجاح!');
    } catch (error) {
        console.error('حدث خطأ أثناء نسخ الملفات:', error);
    }
}

main();
