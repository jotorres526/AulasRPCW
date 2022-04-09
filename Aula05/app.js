var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // Serve para trabalhar com cookies, para já not needed
var logger = require('morgan');
var axios = require('axios')

// Separar rotas por tipologia de funcionalidade
var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users');

var app = express();

// Configurar motor de views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

// App use faz uma pipeline de funções
// Tudo q é argumento é uma função e executa em cascata
// Ou seja o output do logger passa como pedido para o express e por ai vai
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/musicas', usersRouter);

// Se nao encontrar uma rota available entra no erro
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
