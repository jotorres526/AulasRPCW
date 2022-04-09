var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alunos', function (req, res, next) {
  axios.get('http://localhost:3000/alunos')
    .then(response => {
      var lista = response.data
      res.render('alunos', { alunos: lista }) //'alunos' é um template -> views/alunos.jade
    })
    .catch(function (erro) {
      res.render('error', { error: erro,  })
    })
});

router.get('/alunos/:id', function (req, res, next) {
  axios.get("http://localhost:3000/alunos/" + req.params.id)
    .then(response => {
      var lista = response.data
      res.render('alunos', { alunos: lista }) //'alunos' é um template -> views/alunos.jade
    })
    .catch(function (err) {
      res.render('error', { error: err })
    })
});

module.exports = router;
