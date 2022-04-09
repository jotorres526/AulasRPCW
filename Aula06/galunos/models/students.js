const mongoose = require('mongoose')

// Primeira coisa é preciso *definir* um schema
// meio weird pq é schemaless mas é a vida
let studentSchema = mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
})

// Compilar o schema e exportar
// vai ser criado no mongo uma coleçao? chamada student
module.exports = mongoose.model('student', studentSchema)
