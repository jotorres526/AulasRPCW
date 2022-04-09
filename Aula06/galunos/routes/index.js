var express = require('express');
var router = express.Router();
var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
})

router.get('/students', function (req, res, next) {
    // Está feito como uma promessa -> nao está agr mas vai estar um dia 
    Student.list()
        .then(data => res.render('students', { list: data }))
        .catch(err => res.render('error', { error: err }))
})

router.get('/students/register', (req, res, next) => {
    // Está feito como uma promessa -> nao está agr mas vai estar um dia 
    res.render('student-form')
})

router.get('/students/:id', (req, res, next) => {
    Student.lookup(req.params.id)
        .then(student => res.render('student-record', { s: student }))
        .catch(e => res.render('error', { error: e })) 
})

router.post('/students', (req, res, next) => {
    // A info vem do body do pedido, temos de construir o objeto primeiro
    let student = {
        numero: req.body.numero,
        nome: req.body.nome,
        git: req.body.git,
        tpc: [req.body.tpc1, req.body.tpc2, req.body.tpc3, req.body.tpc4, req.body.tpc5, req.body.tpc6, req.body.tpc7, req.body.tpc8]
    }
    Student.insert(student)
        .then(data => res.render('newStudent', { rec: data }))
        .catch(e => res.render('error', { error: e }))
})

module.exports = router;
