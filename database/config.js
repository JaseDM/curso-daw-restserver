// Importamos el modulo de mongoose
const mongoose = require('mongoose');

// Configuramos useCreateIndex en true para quitar un warning que aparece en consola
mongoose.set('useCreateIndex', true);

// creamos una función asincriona de conexión a la base de datos
const dbConnection = async() =>{

    // Para conesiones remotas, utilizamos try/catch por si hubiera algun error
    try {
       await mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
       console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión de la base de datos')
    }
}


// Exportamos las conexiones
module.exports = {
    dbConnection
}