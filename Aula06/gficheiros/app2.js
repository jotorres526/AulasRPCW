var express = require('express');
var logger = require('morgan');
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var fs = require('fs')

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
// dirname -> diretoria atual
app.post('/files', upload.single('myFile'), (req, res) => {
    let oldPath = __dirname + '/' + req.file.path
    let newPath = __dirname + '/fileStore/' + req.file.originalname
    fs.rename(oldPath, newPath, erro => {
        if (erro) throw erro
    })
    let d = new Date().toISOString().substring(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')
    files.push({
        date: d,
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
    })
    jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/')
})

app.listen(3030, () => console.log('Servidor à escuta na porta 3030...'))

module.exports = app;
