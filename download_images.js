import fs from 'fs';
import https from 'https';
import path from 'path';

const imagesToDownload = [
    { url: 'https://force-test.com/wp-content/uploads/2018/11/digitalFT-left-front-1-600x600.jpg', name: 'ft1kpt.jpg' },
    { url: 'https://force-test.com/wp-content/uploads/2018/11/digitalFT-left-front-1-600x600.jpg', name: 'ft2kpt.jpg' },
    { url: 'https://force-test.com/wp-content/uploads/2018/11/analogFT-RSfixture-left-front-4-scaled-600x600.jpg', name: 'ftapt.jpg' },
    { url: 'https://force-test.com/wp-content/uploads/2018/11/PF-21SA-1.jpg', name: 'ftpffabric.jpg' }
];

const destDir = 'C:\\Users\\tdoan\\OneDrive\\Documents\\GitHub\\AutomateIT\\qualitytester\\public\\images';

imagesToDownload.forEach(img => {
    const dest = path.join(destDir, img.name);
    const file = fs.createWriteStream(dest);
    https.get(img.url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close();  // close() is async, call cb after close completes.
            console.log(`Downloaded ${img.name}`);
        });
    }).on('error', function (err) {
        fs.unlink(dest, () => { });
        console.error(`Error downloading ${img.name}: ${err.message}`);
    });
});
