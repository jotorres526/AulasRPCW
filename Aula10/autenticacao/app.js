var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var FileStore = require('session-file-store')(session) 
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var axios = require('axios')
const { v4: uuidv4 } = require('uuid')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session
app.use(session({
  genid: req => {
    console.log('Dentro do middleware da session')
    console.log(req.sessionID)
    return uuidv4()
  },
  store: new FileStore(),
  secret: 'O meu segredo',
  resave: true,
  saveUninitialized: true
}))
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  axios.get('http://localhost:3000/users?email=' + email) // se tivesse guardado em mongo era uma query
    .then(dados => {
      const user = dados.data[0]
      if (!user) {
        return done(null, false, { message: 'Utilizador não existente!\n' })
      }
      // se passei o if anterior user é válido
      if (password != user.password)  
        return done(null, false, { message: 'Password inválida!\n' })
      
      return done(null, user)
    })
    .catch(erro => done(erro))
}))
passport.serializeUser((user, done) => {
  console.log('Vou serializar o user na sessão: ' + JSON.stringify(user))
  // O passport grava o utilizador na sessão aqui (tem de se guardar o id)
  done(null, user.id)
})
passport.deserializeUser((uid, done) => {
  console.log('Vou deserializar o user na sessão: ' + JSON.stringify(uid))
  // O passport grava o utilizador na sessão aqui (usa-se o id gravado para procurar info do user)
  axios.get('http://localhost:3000/users/' + uid)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Depois das sessoes
app.use(passport.initialize())
app.use(passport.session())
// antes dos roteadores\
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
