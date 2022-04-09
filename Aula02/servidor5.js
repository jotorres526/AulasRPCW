var http = require('http');

const myserver = http.createServer(function (req, res) {
    let d = new Date().toISOString().substring(0, 16);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method + " " + req.url + " " + d);
    res.write("<pre>" + req.method + " " + req.url + " " + d + "</pre>");
    res.end();
});

myserver.listen(7777);
console.log("Servidor À escuta na porta 7777");