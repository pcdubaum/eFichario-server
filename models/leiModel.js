// Importe a biblioteca mongoose para trabalhar com o MongoDB
const mongoose = require('mongoose');

// Defina o esquema (schema) para a coleção "Lei" no banco de dados
const leiSchema = new mongoose.Schema({
    // Nome da lei, é uma string obrigatória e não única
    nome: {
        type: String,
        required: [true, 'Toda lei precisa ter um nome.'], // Mensagem de erro personalizada se o nome não for fornecido
        unique: false, // Não é necessário que o nome seja único
        trim: true, // Os espaçoes em branco serão apagados
        maxlenght: [64, 'O Nome da lei tem que ter menos de 64 letras'], // Mensagem de aviso para nome muito grande
        minlenght: [4, 'Nome muito pequeno, tente usar um nome um pouco maior'] // Mensagem de avido para nome muito pequeno
    },
    
    // Número de artigos na lei
    artigos: [Number],

    // Dados associados à lei, é um array obrigatório com valor padrão vazio
    dados: {
        type: Array,
        required: true,
        default: [],
        min : [1, 'Dados precisão ter pelo menos 1 artigo']
    },

    // Matérias relacionadas à lei, é um array com valor padrão vazio
    materias: {
        type: Array,
        default: []
    },

    // Alertas relacionados à lei, é um array com valor padrão vazio
    alertas: {
        type: Array,
        default: []
    },

    // Data de criação da lei, é uma data gerada automaticamente antes de salvar
    criadoEm : [Date],

    // Nome do autor da lei, é uma string obrigatória
    autor : {
        type: String,
        required: false
    },

    // ID do autor da lei, é um número obrigatório
    autorId : {
        type: Number,
        required: false
    }
});

// Define uma função para ser executada antes de salvar um documento da coleção "Lei"
leiSchema.pre('save', function(next) {
    // Define a data de criação como a data atual antes de salvar
    this.criadoEm = Date.now();

    if (process.env.NODE_ENV === 'development')
        this.start = Date.now();

    next(); // Chama a próxima função no fluxo (no caso, a função de salvar)
})



// Define uma função para ser executada antes de salvar um documento da coleção "Lei"

leiSchema.pre(/^find/, function(next)  {
    this.find({ teste : {$ne: true}});
    next();
});

// Define uma função para ser executada depois de salvar um documento da coleção "Lei"

leiSchema.post(/^find/, function(doc, next) {
    if (process.env.NODE_ENV === 'development')
        console.log(`Query executada em: ${ Date.now() - this.start } milisegundos`);

        next();
})


// Cria o modelo "Lei" a partir do esquema e o exporta para ser usado em outros lugares
const Lei = mongoose.model('Lei', leiSchema);

module.exports = Lei;