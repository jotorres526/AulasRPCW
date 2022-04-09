var http = require('http');
var meta = require('./metadados');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.write("<p>Criada com node.js por <b>" +
        meta.myName() + "</b> em " + meta.myDateTime())
    res.end('</p>');
}).listen(7777);