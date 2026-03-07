import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'public');
const files = fs.readdirSync(directoryPath);

async function convertImages() {
    for (const file of files) {
        if (file.endsWith('.png')) {
            const filePath = path.join(directoryPath, file);
            const newFilePath = path.join(directoryPath, file.replace('.png', '.webp'));

            try {
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(newFilePath);
                console.log(`Converted ${file} to ${path.basename(newFilePath)}`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }
    }
}

convertImages();
