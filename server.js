// Import the Mongoose library for interacting with MongoDB
// Importa a biblioteca Mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Import the dotenv library to load environment variables from the config.env file
// Importa a biblioteca dotenv para carregar variáveis de ambiente a partir do arquivo config.env
const dotenv = require('dotenv');

// Configure dotenv to load environment variables from the config.env file
// Configura o dotenv para carregar variáveis de ambiente do arquivo config.env
dotenv.config({ path: './config.env' });

// Import the Express application configured from the app.js file
// Importa o aplicativo Express configurado a partir do arquivo app.js
const app = require('./app');

// Print the application's environment (usually 'development' or 'production')
// Imprime o ambiente do aplicativo (geralmente, 'development' ou 'production')
console.log(app.get('env'));

// Define the database URL, replacing the password and username with environment variables
// Define a URL do banco de dados, substituindo a senha pelas variáveis de ambiente
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
).replace(
    '<USERNAME>',
    process.env.USERNAME
);

// Connect to the MongoDB database using Mongoose
// Conecta-se ao banco de dados MongoDB usando o Mongoose
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB Conectada'); // Success log message on successful connection - Mensagem de log de sucesso na conexão
}).catch(error => {
    console.error('Erro na conexão com o banco de dados:', error); //// Log message in case of a connection error - Mensagem de log em caso de erro na conexão
});

// Start the Express server and make it listen on the port specified in the environment variables
// Inicia o servidor Express e faz com que ele escute a porta especificada nas variáveis de ambiente
app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta: ' + process.env.PORT); // Mensagem de log informando que o servidor está ativo
});