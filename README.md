# WebServer + RestServer

Descripción del proyecto: 

Práctica para la finalización del módulo MF0492_3: Programación web en el entorno servidor para el curso  18/5683 IFCD0210 Desarrollo de aplicaciones con tecnología web.

La finalidad de esta práctica es la de crear un Api Rest para la gestión de usuarios de sistema por medio de un backend, con direrentes roles y accesos desarrollado con JavaScript. Desde otra aplicación, se podra consumir esta Api con diferentes EndPoint que describiré en el documento.

Patrón - Model View Controller

JavaScript - Nodejs - Express

Programación orientada a objetos


Para iniciar el proyecto instalar los modulos de Node ``` npm install ```



## Dependencias usadas en el proyecto 

### express
Descripción
 
Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para:

- Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
- Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.
- Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.
- Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición.

Instalación
``` npm install express```

Importación
``` const express = require('express')   ```

Inicialización 
``` const app = express() ```



Uso 

He creado un modelo con la clase server para inicializar Express 
```
class Server {

}
```

En el constructor inicializo:

El metodo ``` listen() ``` para levantar el servidor por el puerto definido en la variable de entorno PORT
```
listen() {
    this.app.listen(this.port, () => {
        console.log(`Sevidor corriendo en el puerto ${this.port}`);
    });
}
```
El metodo ``` routes() ``` para cargar los diferentes EndPoint del RestServer
```
routes () {
    // Se llama al archivo de rutas de usuario y se define la ruta especifica para estas peticiones
    this.app.use( this.usuariosPath, require('../routes/usuarios') );
        
}
```
El metodo ``` middleware() ``` para cargar los Middleware que afectan al servidor
```
middleware() {
    // CORS
    this.app.use( cors() );
    // Lectura e iterar Json
    this.app.use( express.json() );
    // Directorio público
    this.app.use( express.static('public') );
}
```


### Cors

Descripción
Intercambio de Recursos de Origen Cruzado (CORS). Middleware para el control de acceso HTTP 

Instalación
 ``` npm install cors ```


Importación
``` const cors = require('cors') ```

Uso
He incluido en la clase Server un metodo para añadir Middlewares. La forma simple de utización de este metodo es la sigiente 
```  
middleware() {
  // CORS
  this.app.use( cors() );
}
 ```

### Dotenv

Instalación
``` npm install dotenv```

Importación
``` require('dotenv').config() ```

Descripción
Módulo que carga variables de entorno desde un archivo .env a process.env

Uso 
Declaración y uso de las variables en el archivo .env
``` PORT=8080 ``` 
``` process.env.PORT ```

### Mongoose

### Dotenv

Instalación
``` npm install mongoose```

Importación
``` const mongoose = require('mongoose') ```

Descripción
Mongoose es una biblioteca de JavaScript que le permite definir esquemas con datos fuertemente tipados. Una vez que se define un esquema, Mongoose le permite crear un Modelo basado en un esquema específico. 

Uso 
creamos una función asincriona (async/await) de conexión a la base de datos. Para validar la respuesta utilizamos try/catch 

```
const dbConnection = async() =>{

    // Para conesiones remotas, utilizamos try/catch por si hubiera algun error
    try {
       await mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true, useUnifiedTopology: true});
       console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión de la base de datos')
    }
}
```




### bcryptjs

### JWT (Json Web Token)
Un JWT se compone de tres partes. 
- Header
- Payload
- Firma



### express-validator@6.9.2

### Heroku CLI Comandos

##Conectar remote
``` heroku git:remote -a nombre ```

## Variables de entorno

``` heroku congig ```
Muestra todas las variables de entorno

``` heroku config:set saludo=hola ```
Establece la variable de entorno saludo con el valor hola

``` heroku config:unset saludo  ```
Elimina la variable saludo

