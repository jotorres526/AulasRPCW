var http = require('http')  // instancia o modulo http para a variavel http

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Olá mundo!');
}).listen(7777);