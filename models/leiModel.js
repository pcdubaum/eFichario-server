const mongoose = require('mongoose');

const leiSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Toda lei precisa ter um nome.'],
        unique: false
    },
    artigos: {
        type: Number
    },
    dados: {
        type: Array,
        required: true,
        default: []
    },
    materias: {
        type: Array,
        default: []
    },
    alertas: {
        type: Array,
        default: []
    }
});

const Lei = mongoose.model('Lei', leiSchema);

module.exports = Lei;