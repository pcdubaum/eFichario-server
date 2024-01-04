// Import the necessary libraries to create the Express application
const express = require('express');
const morgan = require('morgan');
const leiRouter = require('./routes/leiRoutes');
const cors = require('cors');
const AppError = require('./utils/appError');

const app = express();

// Configure the Express application to handle JSON data and enable CORS
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

// If the environment is set to development, use the Morgan middleware to log detailed HTTP requests
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Create routes for Leis, which will be managed by the router defined in leiRoutes
app.use('/api/v2/leis', leiRouter);


// Send a erro, request should not reach this point.
app.all('*', (req, res, next) =>{
    const err = new Error(`Não foi possível encontrar ${req.originalUrl} nesse servidor!`);
    err.status = 'falha';
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'erro';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Export the Express application to be used in other files 
module.exports = app;