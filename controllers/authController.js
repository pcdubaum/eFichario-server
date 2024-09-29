// Import the necessary libraries to create the auth
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Usuario = require('../models/usuarioModel');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Send Token
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    console.log('Token: ' + token);
      
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    });
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    console.log('Remove Password');
    // Remove password from output
    user.password = undefined;

    console.log('Send Data');
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };
  
  exports.signup = catchAsync(async (req, res, next) => {
    const newUsuario = await Usuario.create({
      email: req.body.email,
      password: req.body.password,
    });
  
    createSendToken(newUsuario, 201, req,res);
  });

  exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
 
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await Usuario.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    console.log('createSendToken');
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  });

  exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;

    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      
    }
  
    if (!token) {
      console.log('Sem Token!')
      return next(
        new AppError('Usuário não encontrado! Por favor faça o login novamente.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await Usuario.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });
  
  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };

  exports.logoff = catchAsync (async (req, res, next) => {
    
      req.session = null;

      res.send({});
    });
  