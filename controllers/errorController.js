const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicatedEmail = () => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errorCode: 1
  }
  )};


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };
  
  const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
  
      // Programming or other unknown error: don't leak error details
    } else {
      // 1) Log error
      console.error('ERROR 💥', err);
  
      // 2) Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  };

  const handleJWTError = () =>
    new AppError('Erro, por favor faça o login novamente. (token invalido)', 401);

  const handleJWTExpiredError = () =>
    new AppError('Erro, por favor faça o login novamente. (token expirado)', 401);

module.exports = (err, req, res, next) => {
    // console.log(err.stack);
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };
  
      if (error.name === 'CastError') error = handleCastErrorDB(error);
      if (error.code === 11000) error = handleDuplicatedEmail(error);
      if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  
      sendErrorProd(error, res);
    }
  };