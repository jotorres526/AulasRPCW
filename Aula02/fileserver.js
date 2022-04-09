var http = require('http')  // instancia o modulo http para a variavel http
var fs = require('fs')

http.createServer(function (req, res) {
    let arquivo = './arquivo/pag' + req.url[1] + '.html';
    console.log(req.url[1]);
    fs.readFile(arquivo, function (err, data) { // é necessario tratar sempre os erros
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (err) {
            res.write("<p>Erro</p>");
        } else {
            res.write(data);
        }
    })
    
}).listen(7777);