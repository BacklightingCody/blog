const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // 用于生成 MD5 哈希值
const grayMatter = require('gray-matter'); // 使用 CommonJS 格式导入

const postsDir = path.join(__dirname, '../posts'); // 文章文件目录

function processFiles(directoryPath) {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);
        
        // 检查是否是文件
        if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const parsed = grayMatter(content); // 使用 gray-matter 来解析 frontmatter

            // 如果没有 id，则基于 description 或当前时间生成 ID
            if (!parsed.data.id) {
                parsed.data.id = parsed.data.description
                    ? crypto.createHash('md5').update(parsed.data.description).digest('hex')
                    : Date.now().toString(); // 使用当前时间作为 ID
                const updatedContent = grayMatter.stringify(parsed.content, parsed.data);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Generated ID for ${file}: ${parsed.data.id}`);
            } else {
                console.log(`ID already exists for ${file}: ${parsed.data.id}`);
            }
        } else if (fs.statSync(filePath).isDirectory()) {
            // 如果是目录，递归处理
            processFiles(filePath);
        } else {
            console.log(`${file} is neither a file nor a directory, skipping.`);
        }
    });
}

processFiles(postsDir);
