// Importe a biblioteca mongoose para trabalhar com o MongoDB
const mongoose = require('mongoose');

const materiasSchema = new mongoose.Schema({
     // Nome da lei, é uma string obrigatória e não única
     nome: {
        type: String,
        required: [true, 'Toda lei precisa ter um nome.'], // Mensagem de erro personalizada se o nome não for fornecido
        unique: false, // Não é necessário que o nome seja único
        trim: true, // Os espaçoes em branco serão apagados
        maxlenght: [64, 'O Nome da lei tem que ter menos de 64 letras'], // Mensagem de aviso para nome muito grande
        minlenght: [4, 'Nome muito pequeno, tente usar um nome um pouco maior'] // Mensagem de avido para nome muito pequeno
    },

    tema: [String],

    concursos: {
        type: Array,
        required: true,
        default: [],
        min : [1, 'Dados precisão ter pelo menos 1 artigo']
    },

    autor: [String],

    criadoEm : [Date],

    editadoEm: [Number],

    materia: {
        type: Array,
        required: true,
        default: [],
        min : [1, 'Dados precisão ter pelo menos 1 artigo']
    },
})

// Cria o modelo "Lei" a partir do esquema e o exporta para ser usado em outros lugares
const Materia = mongoose.model('materia', materiasSchema);

module.exports = Materia;