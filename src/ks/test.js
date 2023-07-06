// 将修改后的内容写入到一个新的文件中
const newFilePath = filePath.replace('src', 'dist');
fs.writeFileSync(newFilePath, $.html(), 'utf-8');

// 或者使用流的方式将修改后的内容输出到一个新的文件中
const readStream = fs.createReadStream(filePath);
const writeStream = fs.createWriteStream(newFilePath);
readStream.pipe($.html()).pipe(writeStream);