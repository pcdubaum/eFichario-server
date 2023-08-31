const mongoose = require('mongoose');

const leiSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Toda lei precisa ter um nome.'],
        unique: false
    },
    artigos: {
        type: Number,
        required: true
    },
    dados: {
        type: Array,
        default: []
    }
});

const Lei = mongoose.model('Lei', leiSchema);

module.exports = Lei;