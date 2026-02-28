const fs = require('fs');
let md = fs.readFileSync('docs/index.md', 'utf-8');
md = md.replace(/image%20(\d+)\.png/g, 'image-$1.png');
fs.writeFileSync('docs/index.md', md);
console.log('Fixed index.md img links.');
