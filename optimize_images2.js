import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImages = [
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\ft1kpt.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\ft2kpt.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\ftapt.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\ftpffabric.jpg'
];

const destDir = 'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images';

async function processImages() {
    for (const src of sourceImages) {
        if (!fs.existsSync(src)) {
            console.log(`Skipping ${src} - not found`);
            continue;
        }

        const parsed = path.parse(src);
        const basename = parsed.name;
        console.log(`Processing ${basename}...`);

        try {
            await sharp(src)
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(path.join(destDir, `${basename}.webp`));

            await sharp(src)
                .resize({ width: 400, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(path.join(destDir, `${basename}-sm.webp`));

            await sharp(src)
                .resize({ width: 400, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(path.join(destDir, `${basename}-sm.jpg`));

            console.log(`Successfully generated responsive versions for ${basename}`);
        } catch (e) {
            if (e.message.includes('same file for input and output')) {
                // ignore, we just keep the original as the large JPG fallback
                console.log(`Kept original ${basename}.jpg`);
            } else {
                console.error(`Error processing ${basename}:`, e);
            }
        }
    }
}

processImages();
