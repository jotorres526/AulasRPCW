var Para = require('../models/para')

module.exports.list = () => {
  return Para
    .find()
    .exec()
}

module.exports.insert = p => {
  let d = new Date()
  let n = new Para(p)
  p.data = d.toISOString().substring(0, 16)
  return n.save()
}