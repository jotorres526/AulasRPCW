var http = require('http');
var meta = require('./metadados');

http.createServer(function (req, res) {
    console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.write(req.url); // req.url dá o path
    res.end('</p>');
}).listen(7777);