var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', (req, res) => {
  console.log('Na cb da homepage...')
  console.log(req.sessionID)
  res.render('index')
});

router.get('/login', (req, res) => {
  console.log('Na callback do get login')
  res.render('login-form')
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Na callback do post login')
  console.log('Auth: ' + JSON.stringify(req.user))
  res.redirect('/protegida')
});

function verificaAutenticacao(req, res, next) {
  console.log('User (verif.): ' + JSON.stringify(req.user))
  if (req.isAuthenticated())
    next()
  else
    res.redirect('/login')
  
}

router.get('/protegida', verificaAutenticacao, (req, res) => {
  res.send('<p>Atingiste a área protegida!!!' + 'User: ' + JSON.stringify(req.user) + '</p>')
})


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/protegida')
})

module.exports = router;
