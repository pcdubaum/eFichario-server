const Usuario = require('./../models/usuarioModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.pegarTodosUsuarios = catchAsync(async (req, res, next) => {

    const usuarios = await Usuario.find();
  
    // SEND RESPONSE
    res.status(201).json({
      status: 'success',
      results: usuarios.length,
      data: {
        usuarios
      }
    });
  });

  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };