const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(app.get('env'));

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB Conectada');
}).catch(error => {
    console.error('Erro na conexão com o banco de dados:', error);
});


// IIniciar o servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta: ' + process.env.PORT);
});