// Se importan los metodos Schema y model de mongoose
const { Schema, model } = require('mongoose');


// Se crea el esquema de la colección de la base de datos
const usuarioSchema = Schema({
    // Se especifica cada campo 
    nombre: {
        // Tipo
        type: String,
        // SI es requerido y se pasa un array en el que el primer dato es boleano 
        //y el segundo el error a mostra en caso de no venir este dato
        required: [true, 'El nombre es obligatorio']

    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        // Este campo debe de ser único
        unique: true

    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],

    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        // Crea las opciones validas para este campo
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        // Dato por defecto
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    fecha_creacion: {
        // Tipo fhecha
        type : Date, 
        // fecha y hora actual
        default: Date.now 
    }
})


// Se exporta el metodo model pasando como parametro el nombre del modelo y el equema creado
module.exports = model('Usuario', usuarioSchema);