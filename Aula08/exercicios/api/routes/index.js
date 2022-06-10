var express = require('express');
var router = express.Router();
var Para = require('../controllers/para')


/* GET home page. */
router.get('/', (req, res) => {
  Para.list()
    .then(data => {
      res.status(200).jsonp(data)
    })
    .catch(err => {
      res.status(500).jsonp({ error:err })
    })
});

router.post('/', (req, res) => {
  Para.insert(req.body)
    .then(data => {
      res.status(200).jsonp(data)
    })
    .catch(err => res.status(501).jsonp(err))
})
module.exports = router;
