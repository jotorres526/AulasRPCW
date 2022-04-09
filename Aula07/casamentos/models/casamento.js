const mongoose = require('mongoose')

var casamentoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    href: String
})

// A collection chama-se casamentos, mas o mongoose consegue inferir casamentos de casamento
module.exports = mongoose.model('casamento', casamentoSchema)