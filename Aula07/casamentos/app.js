var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
// configuração do mongo
var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/CurralDasFreiras'
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
var db = mongoose.connection
db.on('error', () => {
  console.log('Erro na conexão ao MongoDB...')
})
db.once('open', () => {
  console.log('Conexão ao MongoDB efetuada com sucesso.')
})

app.use(logger('dev'));
app.use(express.json()); //body
app.use(express.urlencoded({ extended: false })); //querystring
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
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
  res.jsonp('error');
});

module.exports = app;
