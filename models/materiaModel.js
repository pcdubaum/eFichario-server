// Importe a biblioteca mongoose para trabalhar com o MongoDB
const mongoose = require('mongoose');

const materiasSchema = new mongoose.Schema({
     // Nome da lei, é uma string obrigatória e não única
     nome: {
        type: String,
        required: [true, 'Toda materia precisa ter um nome.'], // Mensagem de erro personalizada se o nome não for fornecido
        unique: false, // Não é necessário que o nome seja único
        trim: true, // Os espaçoes em branco serão apagados
        maxlenght: [64, 'O Nome da materia tem que ter menos de 64 letras'], // Mensagem de aviso para nome muito grande
        minlenght: [4, 'Nome muito pequeno, tente usar um nome um pouco maior'] // Mensagem de avido para nome muito pequeno
    },

    tema: String,

    concursos: {
        type: Array,
        default: []
    },

    autor: String,
    criadoEm : Date,
    editadoEm: Date,

    materia: {
        type: Array,
        default: []
    },

    conteudo: {
        type: Array,
        default: []
    },
})



// Define uma função para ser executada antes de salvar um documento da coleção "Lei"
materiasSchema.pre('save', function(next) {
    // Define a data de criação como a data atual antes de salvar
    this.criadoEm = Date.now();
    this.editadoEm = Date.now();

    if (process.env.NODE_ENV === 'development')
        this.start = Date.now();

    next(); // Chama a próxima função no fluxo (no caso, a função de salvar)
})

// Cria o modelo "Materia" a partir do esquema e o exporta para ser usado em outros lugares
const Materia = mongoose.model('materia', materiasSchema);

module.exports = Materia;