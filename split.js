const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('docs/index.md', 'utf-8');

// The original headings
const mapping = [
    { prefix: '一、', filename: 'what-is-xiaoya.md' },
    { prefix: '二、', filename: 'preparation.md' },
    { prefix: '三、', filename: 'installation.md' },
    { prefix: '四、', filename: 'usage.md' },
    { prefix: '五、', filename: 'advanced.md' },
    { prefix: '六、', filename: 'faq.md' },
    { prefix: '七、', filename: 'other.md' },
];

const lines = content.split('\n');
let currentFile = 'index.md';
let fileContents = { 'index.md': '' };

for (const line of lines) {
    if (line.startsWith('# ')) {
        const heading = line.substring(2).trim();
        if (heading.startsWith('小雅指南')) {
            currentFile = 'index.md';
        } else {
            const match = mapping.find(m => heading.startsWith(m.prefix));
            if (match) {
                currentFile = match.filename;
                if (!fileContents[currentFile]) fileContents[currentFile] = '';
            }
        }
    }

    if (fileContents[currentFile] !== undefined) {
        fileContents[currentFile] += line + '\n';
    }
}

for (const [filename, mdContent] of Object.entries(fileContents)) {
    fs.writeFileSync(path.join('docs', filename), mdContent.trim() + '\n');
    console.log(`Saved ${filename}`);
}
