const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Defina o esquema (schema) para a coleção "Usuario" no banco de dados
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [false, 'Insira seu nome.'], 
        unique: false,
        minlenght: [4, 'Nome muito pequeno, tente usar um nome um pouco maior'], // Mensagem de avido para nome muito pequeno
        default: 'Sem nome'
    },

    usuarioCriadoAt: Date,

    email: {
        type: String,
        required: [true, 'Insira seu email.'], 
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Insira um email valido.']
    },

    foto: [String],

    role: {
      type: String,
      enum: ['concurseiro', 'professor', 'colaborador', 'admin'],
      default: 'concurseiro'
    },

    password: {
        type: String,
        required: [true, 'Insira uma senha.'],
        minlength: 8,
        maxlenght: 20,
        select: false
      },
    passwordConfirm
      : {
        type: String,
        required: [false, 'Confirme sua senha.'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'As senhas fornecidas não são iguais!'
        }
      },
      
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,

      active: {
        type: Boolean,
        default: true,
        select: false
      }

});

usuarioSchema.pre('save', async function(next) {
  // Esse bloco só rodará se o password for diferent
  if(!this.isModified('password')) return next();

  // Hash do password com custo de 12
  //this.password = await bcrypt.hash(this.password, 10);

  // Passamos undefined para que o campo não seja gravado no BD
  this.passwordConfirm = undefined;

  // Passa para o próximo middleware
  next();

});

usuarioSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return candidatePassword === userPassword;
};

usuarioSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;