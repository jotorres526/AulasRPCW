var http = require('http');
var url = require('url');

const myserver = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (req.url == "/soma") {
        var q = url.parse(req.url, true).query;
        resultado = parseInt(q.a) + parseInt(q.b);//q é um dicionario
        res.write("<p>" + JSON.stringify(q) + "</p>");
        res.end();
    } else {
        res.end('<p>Rota não suportada: ' + req.url + '</p>'); 
    }
    
});

myserver.listen(7777);
console.log("Servidor À escuta na porta 7777");