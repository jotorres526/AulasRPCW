var http = require('http');
var url = require('url');

const myserver = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    let q = url.parse(req.url, true).query
    res.write("True: <pre>" + JSON.stringify(q) + "</pre>");
    let qtext = url.parse(req.url, false).query
    res.end("False: <pre>" + JSON.stringify(qtext) + "</pre>");
});

myserver.listen(7777);
console.log("Servidor À escuta na porta 7777");