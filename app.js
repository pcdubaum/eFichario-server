// Import the necessary libraries to create the Express application
// Importa as bibliotecas necessárias para criar o aplicativo Express
const express = require('express');
const app = express();
const morgan = require('morgan');
const leiRouter = require('./routes/leiRoutes');
const cors = require('cors');

// Configure the Express application to handle JSON data and enable CORS
// Configura o aplicativo Express para lidar com dados JSON e habilita o CORS
app.use(express.json());
app.use(cors());

// If the environment is set to development, use the Morgan middleware to log detailed HTTP requests
// Se o ambiente estiver definido como desenvolvimento, utiliza o middleware Morgan para fazer log de solicitações HTTP detalhadas
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Custom middleware: Log a message for each request that passes through it
// Middleware personalizado: Imprime uma mensagem de log para cada solicitação que passa por ele
app.use((req, res, next) => {
    console.log('Aqui tem um middleware'); // Mensagem de log
    next(); // Chama a próxima função/middleware na cadeia de execução
});

// Create routes for Leis, which will be managed by the router defined in leiRoutes
// Cria rotas para as Leis, que serão gerenciadas pelo router definido em leiRoutes
app.use('/api/v2/leis', leiRouter);

// Export the Express application to be used in other files (typically used in the main application file)
// Exporta o aplicativo Express para ser usado em outros arquivos (normalmente usado no arquivo principal do aplicativo)
module.exports = app;