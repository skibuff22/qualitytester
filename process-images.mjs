import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = 'C:/Users/tdoan/OneDrive/qualitytesters/website/pictures';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Map logical names to source files for the redesign
const imageMap = {
    'hero-background.jpg': 'force-measurement-systems-banner.jpg',
    'pull-tester.jpg': 'Digital-Pull-Tester-Package-v21.jpg',
    'tensile-tester.jpg': 'tesniltester.jpg',
    'fixtures.jpg': 'fixturesgrips.jpg',
    'logo.png': 'qtslogo.png',
    'logo-large.png': 'QTSlogo_larger.png',
    'icon.png': 'QTSicon_larger.png'
};

async function processImages() {
    console.log('Starting image optimization process...');

    for (const [destName, srcName] of Object.entries(imageMap)) {
        const srcPath = path.join(SOURCE_DIR, srcName);
        const destPath = path.join(OUTPUT_DIR, destName);

        if (fs.existsSync(srcPath)) {
            try {
                let pipeline = sharp(srcPath);

                // Custom resizing based on the image's role
                if (destName === 'hero-background.jpg') {
                    // Optimized for full-width hero banners
                    pipeline = pipeline.resize(1920, 1080, { fit: 'cover', position: 'center' }).jpeg({ quality: 80 });
                } else if (destName.endsWith('.png')) {
                    // Keep logos as transparent PNGs but compress them
                    pipeline = pipeline.png({ quality: 90 });
                } else {
                    // Optimized for product showcase cards
                    pipeline = pipeline.resize(800, 600, { fit: 'cover' }).jpeg({ quality: 85 });
                }

                // Add SEO metadata injection
                pipeline = pipeline.withMetadata({
                    exif: {
                        IFD0: {
                            ImageDescription: `Quality Tester Solutions - ${destName.replace('.jpg', '').replace('-', ' ')}`,
                            Make: "Quality Tester Solutions LLC"
                        }
                    }
                });

                await pipeline.toFile(destPath);
                console.log(`✅ Processed: ${destName}`);
            } catch (err) {
                console.error(`❌ Error processing ${srcName}:`, err.message);
            }
        } else {
            console.warn(`⚠️ Warning: Source file not found: ${srcName}`);
        }
    }
    console.log('Image processing complete!');
}

processImages();
