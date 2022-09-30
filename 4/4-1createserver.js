const http = require('http');

http.createServer((req,res)=> {
    res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
    res.write('<h1>hello</h1>');
    res.end()   ;
}).listen(8083, ()=>{
    console.log('8083 실행중..')
});