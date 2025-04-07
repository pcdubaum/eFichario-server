const Usuario = require('./../models/usuarioModel');
const APIFeature = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handleFactory');

exports.pegarTodosUsuarios = catchAsync(async (req, res, next) => {

    const features = new APIFeature(Usuario.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
    const usuarios = await features.query;

        res.status(200).json({ usuarios });
  });

  exports.getMe = (req, res, next) => {
      req.params.id = req.user.id;
      next();
  };

  exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });

  exports.updateUser = catchAsync(async (req, res, next) => {
    res.status(505).json({
      status: 'error',
      erros: 'not implemented'
    })
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

  exports.getUser = factory.getOne(Usuario);

  // Rota para obter uma materia específica pelo seu ID
exports.getOne = catchAsync(async (req, res, next) => {
  // Consulta o banco de dados para encontrar uma lei pelo seu ID
  const usuario = await Usuario.findById(req.params.id);

  if (!usuario) {
    return new AppError("Não foi possível encontrar o recursos", 404);
  }

  // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
  res.status(200).json({ user: usuario });
});


  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };