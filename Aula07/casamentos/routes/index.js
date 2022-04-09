var express = require('express');
var router = express.Router();
var Casamento = require('../controllers/casamento')

/* GET home page. */
router.get('/casamentos', function (req, res, next) {
    if (req.query['ano'] != undefined) {
        Casamento.listarPorAno(req.query['ano'])
            .then(dados => {
                res.status(200).jsonp(dados)
            })
            .catch(err => {
                // Podemos sequenciar os codigos de erro... cool
                res.status(500).jsonp({ error: err })
            })
    }
    else if (req.query['nome'] != undefined) {
        Casamento.listarPorNome(req.query['nome'])
            .then(dados => {
                res.status(200).jsonp(dados)
            })
            .catch(err => {
                // Podemos sequenciar os codigos de erro... cool
                res.status(501).jsonp({ error: err })
            })
    }
    else if (req.query['byAno'] != undefined && req.query['byAno'] == "true") {//funciona pq é lazy
        Casamento.listar()
            .then(dados => {
                var porAno = {}
                dados.forEach(c => {
                    var ano = c.date.substring(0, 4)
                    if (porAno[ano] != undefined) {
                        porAno[ano].push({ id: c._id, title: c.title })
                    } else {
                        porAno[ano] = [{ id: c._id, title: c.title }]
                    }
                })
                res.status(200).jsonp(porAno)
            })
            .catch(err => {
                // Podemos sequenciar os codigos de erro... cool
                res.status(504).jsonp({ error: err })
            })
    }    
    else {
        Casamento.listar()
            .then(dados => {
                res.status(200).jsonp(dados)
            })
            .catch(err => {
                // Podemos sequenciar os codigos de erro... cool
                res.status(502).jsonp({ error: err })
            })
    }
});

router.get('/casamentos/noivos', (req, res) => {
    Casamento.listar()
        .then(dados => {
            var noivos = []
            var nomeFiltro = /.+?:\s+(.+?)\s+c\.c\.\s+(.+?)/
            dados.forEach(c => {
                let nomes = c.title.match(nomeFiltro)
                if (!noivos.includes(nomes[1])) {
                    noivos.push({ noivo: nome[1], id: c._id })
                }
            })
            noivos.sort((n1,n2) => (n1.noivo > n2.noivo) ? 1 : -1)
            res.status(200).jsonp(noivos)
        }).catch(err => {
            // Podemos sequenciar os codigos de erro... cool
            res.status(505).jsonp({ error: err })
        })
})

router.get('/casamentos/:id', (req, res) => {
    Casamento.consultar(req.params.id)
        .then(dados => {
            res.status(200).jsonp(dados)
        }).catch(err => {
            // Podemos sequenciar os codigos de erro... cool
            res.status(500).jsonp({ error: err })
        })
})

module.exports = router;
