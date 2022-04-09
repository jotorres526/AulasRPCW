var Casamento = require('../models/casamento')

module.exports.listar = () => {
    return Casamento
        .find({}, { _id:1, date:1, title:1 })
        .exec()
}

module.exports.consultar = (id) => {
    return Casamento
        .findOne({ _id: id })
        .exec()
}

module.exports.listarPorNome = (n) => {
    var nome = new RegExp(n, 'i')
    return Casamento
        .find({ title:nome })
        .exec()
}

module.exports.listarPorAno = (d) => {
    var data = new RegExp(d, 'i')
    return Casamento
        .find({ date: data })
        .exec()
}