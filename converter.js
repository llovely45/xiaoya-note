const fs = require('fs');
const path = require('path');

// 读取 HTML 文件内容
const htmlPath = path.join(__dirname, '小雅指南 d0d2ac78727382eba6b601ddf6a8c317.html');
const html = fs.readFileSync(htmlPath, 'utf8');

function convertHtmlToMd(html) {
    let md = html;

    // 提取主要内容区域
    const bodyMatch = md.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    if (bodyMatch) md = bodyMatch[1];

    // 0. 排除目录导航部分 (nav 标签)
    md = md.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');

    // 1. 处理特定的 summary 标题 (Notion 特色)
    md = md.replace(/<summary[^>]*>([\s\S]*?)<\/summary>/gi, (match, p1) => {
        const text = p1.replace(/<[^>]+>/g, '').trim();
        if (p1.includes('font-size:1.875em')) {
            return `\n\n# ${text}\n\n`;
        } else if (p1.includes('font-size:1.5em')) {
            return `\n\n## ${text}\n\n`;
        }
        return `\n\n${text}\n\n`;
    });

    // 2. 处理标准标题
    md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
    md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
    md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');

    // 3. 处理代码块 (加强匹配)
    md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, p1) => {
        const code = p1.replace(/<[^>]+>/g, '').trim();
        return `\n\n\`\`\`\n${code}\n\`\`\`\n\n`;
    });

    // 4. 处理图片
    md = md.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (match, p1) => {
        const imgMatch = p1.match(/src="([^"]*)"/);
        if (imgMatch) {
            const src = imgMatch[1];
            return `\n\n![${src}](${src})\n\n`;
        }
        return '';
    });
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/>/gi, '\n\n![$1]($1)\n\n');

    // 5. 处理链接
    md = md.replace(/<a href="([^"]*)">([\s\S]*?)<\/a>/gi, '[$2]($1)');

    // 6. 处理段落和列表
    md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');
    md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');

    // 清理 HTML 标签
    md = md.replace(/<[^>]+>/g, '');

    // 解码 HTML 实体
    md = md.replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'");

    // 格式化换行
    md = md.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n\n');

    // 特殊处理：确保 split.js 能识别的标题行（以 # 开头）
    md = md.split('\n\n').map(block => {
        if (block.match(/^[一二三四五六七]、/)) {
            // 如果块内容以 一、/ 二、 等开头，确保它是 # 一、
            return '# ' + block;
        }
        return block;
    }).join('\n\n');

    return md;
}

const markdown = convertHtmlToMd(html);

// 顶部保留小雅指南标题
const finalMd = "# 小雅指南\n\n" + markdown;

// 写入 docs/index.md
fs.writeFileSync(path.join(__dirname, 'docs', 'index.md'), finalMd);
console.log('转换完成，已写入 docs/index.md');
