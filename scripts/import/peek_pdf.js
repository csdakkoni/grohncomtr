
const fs = require('fs');
const pdf = require('pdf-parse');

async function readPdf(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    console.log(`\n--- START OF ${filePath} ---`);
    console.log(data.text.substring(0, 3000));
    console.log(`\n--- END OF PREVIEW ${filePath} ---`);
}

(async () => {
    try {
        await readPdf('./scripts/import/Grohn Chemical Katalog.pdf');
        await readPdf('./scripts/import/GrohnKatalog-TR.pdf');
    } catch (e) {
        console.error(e);
    }
})();
