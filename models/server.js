const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        // Rutas 
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        // Conexión a la base de datos
        this.conectarDB();

        // Middlewares
        this.middleware();

        // Rutas de la api
        this.routes();
    }

    middleware() {
        // CORS
        this.app.use( cors() );
        // Lectura e iterar Json
        this.app.use( express.json() );
        // Directorio público
        this.app.use( express.static('public') );
    }

    // metodo asincrono para conectarse a la base de datos
    async conectarDB(){
        // esperamos la respuesta de la función dbConnection() importada de ../database/config
        await dbConnection();
    }

    routes () {
        // Se llama al archivo de rutas de usuario y se define la ruta especifica para estas peticiones
        this.app.use( this.authPath, require('../routes/auth') )
        this.app.use( this.usuariosPath, require('../routes/usuarios') )
           
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log(`Sevidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;

