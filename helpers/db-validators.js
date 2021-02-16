// Importamos los modemos de la base de datos a la cual queremos ver la coincidencia
const Role = require('../models/role')
const Usuario = require('../models/usuario');


// Función que valida si el rol existe en la base de datos
const esRolValido = async( rol = '') => {
    // Buscamos una coincidencia en el modelo ROLE Por medio de una petición asincrona
    // findOne devuelve las coincidencias encontradas al compara el objeto que se manda por parámetro
    const existeRol = await Role.findOne({ rol });
    // Si no hay coincidencia, el rol no existe y lanza un error 
    if(!existeRol){
            // Error que pasamos a la ruta para devolver 
            throw new Error(`${rol} no es un rol válido`);
    }
}

const esEmailUnico = async( correo = '' ) => {
    // Busca en el modelo Usuarios, en el campo correo, 
    // una coincidencia con el correo pasado por body
    const validarCorreo = await Usuario.findOne({ correo });
    // condicional de verificación
    if ( validarCorreo ) {
        throw new Error(`${correo} ya está registrado en la base de datos`);
      }
}

const existeUsuarioPorId = async( id ) => {
    // Busca en el modelo Usuarios, en el campo correo, 
    // una coincidencia con el correo pasado por body
    const idValido = await Usuario.findById(id);
    // condicional de verificación
    if ( !idValido ) {
        throw new Error(`${id} no es un id registrado en base de datos`);
      }
}








module.exports = {
    esRolValido,
    esEmailUnico,
    existeUsuarioPorId
}