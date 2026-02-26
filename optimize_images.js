import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImages = [
    'C:\\Users\\tdoan\\OneDrive\\qualitytesters\\website\\pictures\\abatestkit.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\tensile-tester.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\fixtures.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\hero-background.jpg',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\logo.png',
    'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images\\icon.png'
];

const destDir = 'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images';

async function processImages() {
    for (const src of sourceImages) {
        if (!fs.existsSync(src)) {
            console.log(`Skipping ${src} - not found`);
            continue;
        }

        const parsed = path.parse(src);
        const basename = parsed.name; // e.g., 'abatestkit'

        // For logos and icons, simply ensure they are in the destDir and maybe optimize slightly. We won't resize logos to multiple widths.
        if (basename === 'logo' || basename === 'icon') {
            const dest = path.join(destDir, parsed.base);
            if (src !== dest) {
                fs.copyFileSync(src, dest);
            }
            await sharp(src)
                .webp({ quality: 90 })
                .toFile(path.join(destDir, `${basename}.webp`));
            console.log(`Optimized ${basename}`);
            continue;
        }

        console.log(`Processing ${basename}...`);

        try {
            // Desktop / Large size WebP (800w)
            await sharp(src)
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 80 })
                .withMetadata() // Preserve EXIF/metadata per user request earlier
                .toFile(path.join(destDir, `${basename}.webp`));

            // Mobile / Small size WebP (400w)
            await sharp(src)
                .resize({ width: 400, withoutEnlargement: true })
                .webp({ quality: 80 })
                .withMetadata()
                .toFile(path.join(destDir, `${basename}-sm.webp`));

            // Desktop / Large size standard (fallback)
            await sharp(src)
                .resize({ width: 800, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .withMetadata()
                .toFile(path.join(destDir, `${basename}.jpg`));

            // Mobile / Small size standard (fallback)
            await sharp(src)
                .resize({ width: 400, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .withMetadata()
                .toFile(path.join(destDir, `${basename}-sm.jpg`));

            console.log(`Successfully generated responsive versions for ${basename}`);
        } catch (e) {
            console.error(`Error processing ${basename}:`, e);
        }
    }
}

processImages();
