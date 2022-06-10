const mongoose = require('mongoose')

var paraSchema = new mongoose.Schema({
  _id: String,
  date: String,
  para: String
})

// A collection chama-se casamentos, mas o mongoose consegue inferir casamentos de casamento
module.exports = mongoose.model('para', paraSchema)