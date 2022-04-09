var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static')

/* chavetas pq o querystring exporta varias funcionalidades, e nos so queremos o parse (nao carrega tudo) 
Só funciona em ECMA6 */
var { parse } = require('querystring') 

// Funções auxiliares
// callback é uma função que é executada no fim, e o retorno de recuperaInfo é o callback
function recuperaInfo(req, callback) {
    if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        req.on('data', block => {
            body += block.toString()
        })
        req.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

// Template para a página com a lista de alunos ------------------
function geraPagAlunos(alunos, d) {
    let pagHTML = `
    <html>
        <head>
            <title>Lista de alunos</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="icon" href="favicon.png">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Alunos</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Nome</th>
                    <th>Número</th>
                    <th>Git</th>
                </tr>
  `

    alunos.forEach(a => {
        pagHTML += `
            <tr>
                <td>
                    <a href="http://localhost:7777/alunos/${a.Id}">${a.Nome}</a>
                </td>
                <td>${a.Id}</td>
                <td>${a.Git}</td>
            </tr>
        `
    })

    pagHTML += `
        </table>
        <div class="w3-container w3-teal">
            <address>Gerado por galuno::RPCW2022 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
    return pagHTML
}

// Template para a página de aluno -------------------------------------
function geraPagAluno(aluno, d) {
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.Id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <link rel="icon" href="favicon.png">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.Id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.Nome}</li>
                    <li><b>Número: </b> ${aluno.Id}</li>
                    <li><b>Git (link): </b> <a href="${aluno.Git}">${aluno.Git}</a></li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Template para o formulário de aluno ------------------
function geraFormAluno(d) {
    return `
    <html>
        <head>
            <title>Registo de um aluno</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="icon" href="favicon.png">
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de Aluno</h2>
            </div>

            <form class="w3-container" action="/alunos" method="POST">
                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="Nome">
          
                <label class="w3-text-teal"><b>Número / Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="Id">

                <label class="w3-text-teal"><b>Link para o repositório no Git</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="Git">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

function geraPostConfirm(aluno, d) {
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.Id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
        <link rel="icon" href="favicon.png">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.Id} inserido</h1>
            </header>

            <div class="w3-container">
                <p<a href="/alunos/${aluno.Id}">Aceda aqui à sua página.</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    ` 
}

// Criação do servidor
var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    } else {
        // Tratamento do pedido
        switch (req.method) {
            case "GET":
                // GET /alunos --------------------------------------------------------------------
                if ((req.url == "/") || (req.url == "/alunos")) {
                    axios.get("http://localhost:3000/alunos")
                        .then(response => {
                            var aluno = response.data
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write(geraPagAlunos(aluno, d))
                            res.end()
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de alunos...")
                            res.end()
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                // em js as regex vao entre / /
                else if (/\/alunos\/(A|PG)[0-9]+$/.test(req.url)) {
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos?Id=" + idAluno)
                    let a = response.data
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(geraPagAluno(a[0], d))
                    res.end()
                    .then(response => {
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == "/alunos/registo") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(geraFormAluno(d))
                    res.end()
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if (req.url == '/alunos') {
                    recuperaInfo(req, resultado => {
                        // O JSON server precisa de ter um id minusculo, samething para o mongo
                        resultado['id'] = resultado['Id']
                        console.log('POST de aluno: ' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/alunos', resultado)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                res.write(geraPostConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<p>Post não suportado</p>')
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                }
                
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }

    
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')