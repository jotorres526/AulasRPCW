var http = require('http');
var meta = require('./metadados');

const myserver = http.createServer(function (req, res) {
    console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(req.url); // req.url dá o path
    res.end('</p>');
});

myserver.listen(7777);
console.log("Servidor À escuta na porta 7777");