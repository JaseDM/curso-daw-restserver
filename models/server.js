const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        // Rutas 
        this.usuariosPath = '/api/usuarios'

        // Middlewares
        this.middleware();

        // Rutas de la api
        this.routes();
    }

    middleware() {
        // CORS
        this.app.use( cors() );
        // Directorio público
        this.app.use( express.static('public') )
    }

    routes () {
        // Se llama al archivo de rutas de usuario y se define la ruta especifica para estas peticiones
        this.app.use( this.usuariosPath, require('../routes/usuarios') );
           
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log(`Sevidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;

