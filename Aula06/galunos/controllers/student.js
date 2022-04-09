const mongoose = require('mongoose')
let Student = require('../models/students') // Criar modelo, letra maiuscula por convenção?

// funcionalidades, função list
module.exports.list = () => {
    return Student
        .find()
        .sort({ nome: 1 })
        .exec()
}

// função lookup
module.exports.lookup = (id) => {
    return Student
        .findById(id)
        .findOne({ _id: mongoose.Types.ObjectId(id) }) //transformar id q recebo (texto), para um type ObjectId
        .exec()
}


module.exports.insert = (student) => {
    let newStudent = new Student(student) // cria um objecto q abstrai o objeto com a schema
    return newStudent.save()
}