
const mongoose = require('mongoose'); // Import the Mongoose library for interacting with MongoDB
const dotenv = require('dotenv'); // Import the dotenv library to load environment variables from the config.env file
dotenv.config({ path: './config.env' }); // Configure dotenv to load environment variables from the config.env file
const app = require('./app'); // Import the Express application configured from the app.js file
const https = require('https')
const fs = require('fs');

const options = {
    key: fs.readFileSync('/var/lib/jelastic/keys/privkey.pem'),
    cert: fs.readFileSync('/var/lib/jelastic/keys/fullchain.pem')
  };

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

}).then(con => {
    if(process.env.NODE_ENV === 'development') {
        console.log('DB Conectada'); // Mensagem de log de sucesso na conexão
    }
    else {
        
    }
    
}).catch(error => {
    if(process.env.NODE_ENV === 'development') {
        console.error('Erro na conexão com o banco de dados:', error); // Mensagem de log em caso de erro na conexão
    }
    else {
        console.error('Erro na conexão com o banco de dados:', error); // Mensagem de log em caso de erro na conexão
    }
});

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(process.env.PORT);
  
  console.log("The HTTPS server has started at: https://localhost:443/");

/* Start the Express server and make it listen on the port specified in the environment variables
const server = app.listen(process.env.PORT, (err) => {
    if (err)
        if (err == MongooseServerSelectionError)
            console.error('Error starting the server:', err); // Start the server and provide a callback function
        else
            console.log('Server is running on port: ' + process.env.PORT); // Log a message indicating the server is running
}); */

// Catch any unhandled rejection
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Algo deu errado, desligando...')
    server.close(() => {
        process.exit(1);
    })
});