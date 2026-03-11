const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
    const filePath = path.join(docsDir, file);
    let md = fs.readFileSync(filePath, 'utf-8');

    // 替换 image%20N.png 为 image-N.png
    const newMd = md.replace(/image%20(\d+)\.png/g, 'image-$1.png');

    if (newMd !== md) {
        fs.writeFileSync(filePath, newMd);
        console.log(`Fixed img links in ${file}`);
    }
});
