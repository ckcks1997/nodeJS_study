const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./4-2htmlFile.html');
        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        res.end(data);
    } catch(err){
        res.writeHead(500, {'Content-Type':'text/plain;charset=utf-8'});
        res.end(err.message);
    }
})
.listen(8083, () => {
    console.log("8083..");
})