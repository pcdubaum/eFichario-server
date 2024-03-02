const Usuario = require('./../models/usuarioModel');
const APIFeature = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.pegarTodosUsuarios = catchAsync(async (req, res, next) => {

    const features = new APIFeature(Usuario.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
    const usuarios = await features.query;

        // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
        res.status(200).json({ usuarios });
  });

  exports.removeUser = catchAsync(async (req, res, next) => {

    const user = await Usuario.findByIdAndDelete(req.params.id)

    if (!user) {
      return next(new AppError('Não há usuário com essa ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
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