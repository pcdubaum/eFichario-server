// Importe a biblioteca mongoose para trabalhar com o MongoDB
const mongoose = require('mongoose');

// Defina o esquema (schema) para a coleção "Lei" no banco de dados
const anotacaoSchema = new mongoose.Schema({ 

     // ID do autor, é um número obrigatório
     autorId : {
        type: String,
        required: true
    },

     // ID da aula, é um número obrigatório
     aulaId : {
        type: String,
        required: true
    },

     // Data de criação da lei, é uma data gerada automaticamente antes de salvar
     criadoEm : [Date],

     anotacoes: Array,

     notas: Array
});

// Cria o modelo "Materia" a partir do esquema e o exporta para ser usado em outros lugares
const Anotacao = mongoose.model("anotacao", anotacaoSchema);

module.exports = Anotacao;