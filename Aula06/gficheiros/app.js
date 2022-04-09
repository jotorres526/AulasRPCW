var express = require('express');
var logger = require('morgan');
var templates = require('./html-templates')
var jsonfile = require('jsonfile')

var multer = require('multer')
var upload = multer({ dest: 'uploads'})

var app = express();

// pipeline vertical
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware q interseta todas as rotas
// Se chamar a funçao next ele continua pelo pipeline abaixo
/*app.get('*', (req, res, next) => {
    console.log('recebi um get')
    next()
})*/

app.get('/', (req, res) => {
    let d = new Date().toISOString().substring(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
    res.write(templates.fileList())
    res.end()
})

app.get('/files/upload', (req, res) => {
    let d = new Date().toISOString().substring(0, 16)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write(templates.fileForm(d))
    res.end()
})


// o upload.single precisa de saber o campo do form q deu upload do ficheiro
app.post('/files', upload.single('myFile'), (req,res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<pre>' + JSON.stringify(req.body) + '</pre>')
    res.write('<pre>' + JSON.stringify(req.file) + '</pre>')
    res.end()
})

app.listen(3030, () => console.log('Servidor à escuta na porta 3030...'))

module.exports = app;
