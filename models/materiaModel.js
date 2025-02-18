// Importe a biblioteca mongoose para trabalhar com o MongoDB
const mongoose = require("mongoose");

const materiasSchema = new mongoose.Schema({

  // Nome da lei, é uma string obrigatória e não única
  nome: {
    type: String,
    required: [true, "Toda materia precisa ter um nome."], // Mensagem de erro personalizada se o nome não for fornecido
    unique: false, // Não é necessário que o nome seja único
    trim: true, // Os espaçoes em branco serão apagados
    maxlenght: [124, "O Nome da materia tem que ter menos de 64 letras"], // Mensagem de aviso para nome muito grande
    minlenght: [4, "Nome muito pequeno, tente usar um nome um pouco maior"], // Mensagem de avido para nome muito pequeno
  },

  descricao: {
    type: String,
    required: [false, "Toda materia precisa ter uma descrição."], // Mensagem de erro personalizada se o nome não for fornecido
    unique: false, // Não é necessário que o nome seja único
    maxlenght: [2048, "O Nome da materia tem que ter menos de 256 letras"], // Mensagem de aviso para nome muito grande
    minlenght: [4, "Nome muito pequeno, tente usar um nome um pouco maior"], // Mensagem de avido para nome muito pequeno,
  },

  autor: {
    type: String,
    required: [true, "Toda materia precisa ter um autor."], // Mensagem de erro personalizada se o nome não for fornecido
    unique: false, // Não é necessário que o nome seja único
    trim: true, // Os espaçoes em branco serão apagados
    maxlenght: [128, "O autor da materia tem que ter nome menor de 128 letras"], // Mensagem de aviso para nome muito grande
    minlenght: [0, "Nome muito pequeno, tente usar um nome um pouco maior"], // Mensagem de avido para nome muito pequeno
  },

  autorId: {
    type: String,
    required: [
      true,
      "Toda materia precisa ter um ID de autor. Você está logado?",
    ], // Mensagem de erro personalizada se o nome não for fornecido
    unique: false, // Não é necessário que o nome seja único
  },

  tipo: {
    type: String,
    required: [
      false,
      "Essa matéria precisa de um TIPO específico."
    ],
    unique: false,
    enum: ['Aula', 'Resumo', 'Anotacoes e Dicas', 'Dicinario', 'Caderno de Erros', 'Importante', 'Caderno Questoes'],
  },
  
  /* 
  Tipos de Materia:
  ======
  Aula
  Resumo,
  Anotações e Dicas,
  Dicinario
  Caderno de Erros
  Importante
  Caderno Questoes
  */

  disciplina: String,
  subTopico: String,
  assunto: String,
  especifico: String,
  blocos: Array,
  publico:  Boolean,
  criadoEm: Date,
  editadoEm: Date,
  notas: Array,
  notaMedia: Number,
  views: Number,

 
});

// Define uma função para ser executada antes de salvar um documento da coleção "Lei"
materiasSchema.pre("save", function (next) {
  // Define a data de criação como a data atual antes de salvar
  this.criadoEm = Date.now();
  this.editadoEm = Date.now();
  this.views = 0;

  if (process.env.NODE_ENV === "development") this.start = Date.now();

  next(); // Chama a próxima função no fluxo (no caso, a função de salvar)
});

// Cria o modelo "Materia" a partir do esquema e o exporta para ser usado em outros lugares
const Materia = mongoose.model("materia", materiasSchema);

module.exports = Materia;
