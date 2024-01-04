// Import the Mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// Import the dotenv library to load environment variables from the config.env file
const dotenv = require('dotenv');

// Configure dotenv to load environment variables from the config.env file
dotenv.config({ path: './config.env' });

// Import the Express application configured from the app.js file
const app = require('./app');

// Print the application's environment (usually 'development' or 'production')
console.log(app.get('env'));

// Define the database URL, replacing the password and username with environment variables
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
).replace(
    '<DBUSERNAME>',
    process.env.DBUSERNAME
).replace(
    '<DOMAIN>',
    process.env.DOMAIN);

// Connect to the MongoDB database using Mongoose
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB Conectada'); // Success log message on successful connection - Mensagem de log de sucesso na conexão
}).catch(error => {
    console.error('Erro na conexão com o banco de dados:', error); //// Log message in case of a connection error - Mensagem de log em caso de erro na conexão
});

// Start the Express server and make it listen on the port specified in the environment variables
app.listen(process.env.PORT, (err) => {
    if (err)
    if (err == MongooseServerSelectionError)
        console.error('Error starting the server:', err); // Start the server and provide a callback function
    else
        console.log('Server is running on port: ' + process.env.PORT); // Log a message indicating the server is running
});