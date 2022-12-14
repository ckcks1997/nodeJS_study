const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme2.txt.gz');

readStream.pipe(zlibStream).pipe(writeStream);