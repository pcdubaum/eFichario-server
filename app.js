// Import the necessary libraries to create the Express application
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const leiRouter = require('./routes/leiRoutes');
const usuarioRouter = require('./routes/usuariosRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// If the environment is set to development, use the Morgan middleware to log detailed HTTP requests
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
      whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
      ]
    })
  );

// Configure the Express application to handle JSON data and enable CORS
app.use(express.static(`${__dirname}/public`));
app.use(cors());

// Create routes for Leis, which will be managed by the router defined in leiRoutes
app.use('/api/v2/leis', leiRouter);
app.use('/api/v2/usuario', usuarioRouter);

// Print the application's environment (usually 'development' or 'production')
console.log(app.get('env'));

// Send a erro, request should not reach this point.
app.all('*', (req, res, next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Export the Express application to be used in other files 
module.exports = app;