// Importaciones 
require('dotenv').config();
const Server = require('./models/server')



// Inicializaciones


// Configuraciones
const server = new Server();

server.listen();