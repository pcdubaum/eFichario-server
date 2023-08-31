const express = require('express');
const app = express();
const morgan = require('morgan');
const leiRouter = require('./routes/leiRoutes');
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Midleware
app.use((req, res, next) =>{
    console.log('Aqui tem um middleware');
    next();
});

// Criar rotas para as Leis
app.use('/api/v2/leis', leiRouter);

module.exports = app;

