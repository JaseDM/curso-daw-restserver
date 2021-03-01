// Middlewares
// Importamos el middleware creado para la función que manda los errores a la petición
const validarCampos  = require('./validar-campos');
// Importamos el middleware de validación de token
const validarJWT = require('./validar-jwt');
// Middleware para validar el rol del usuario 
const  validaRoles = require('./validar-roles');





module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}