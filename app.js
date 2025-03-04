// Import the necessary libraries to create the Express application
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const leiRouter = require('./routes/leiRoutes');
const usuarioRouter = require('./routes/usuariosRoutes');
const materiaRouter = require('./routes/materiaRoute');


const app = express();

const corsOptions = {
  origin: process.env.ORIGIN, // 'http://env-8459876.sp1.br.saveincloud.net.br',//(https://your-client-app.com)
 optionsSuccessStatus: 200,
};

app.use(cors());
//app.use(cors());

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


app.use(express.json({ limit: '100mb' })); // Body parser, reading data from body into req.bodyd
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS

// Prevent parameter pollution
app.use(
    hpp({
      whitelist: [
        'concurso',
        'materiasd',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty'
      ]
    })
  );

  app.use(compression());

// Configure the Express application to handle JSON data and enable CORS
app.use(express.static(`${__dirname}/public`));


// Create routes for Leis, which will be managed by the router defined in leiRoutes
app.use('/api/v2/leis', leiRouter);
app.use('/api/v2/usuarios', usuarioRouter);
app.use('/api/v2/materias', materiaRouter);

// Print the application's environment (usually 'development' or 'production')
if(process.env.NODE_ENV === 'development')
  console.log('A aplicação está sendo executada em modo de desenvolvimento!');

if(process.env.NODE_ENV === 'production')
  console.log('A aplicação está rodando na pordta: ' + process.env.PORT);

// Send a erro, request should not reach this point.
app.all('*', (req, res, next) =>{
    next(new AppError(`Não é possível encontrar a url ${req.originalUrl} nesse server!`, 404));
});

app.use(globalErrorHandler);

// Export the Express application to be used in other files 
module.exports = app;