// El siguiente Middleware en el encargado de validar el token que llega 
// desde el header de la petición 

// Requerimos del modulo Express los metodos response y request para tener la ayuda contextual
const { response, request } = require('express');
// requerimos el modulo de JsonWebToken
const jwt = require('jsonwebtoken');
// Importamos el modelo de usuario para poder hacer una busqueda en la colección
const Usuario = require('../models/usuario');

// creamos la función de validación del toquen, pasando los parametros de req, res, next
const validarJWT = async(req = request, res = response, next) => {
    // recuperamos la cabecera mandada en la petición y guardamos el token
    const token = req.header('x-token');

    // Validación de token vacío
    if( !token ){
        return res.json({
            msg: 'No hay token en la petición'
        });
    }

    
    try {
        // jwt.verify() Hace la comparación del token generado con el token enviado
        // Los parametros que se le envia a la función son el token y la SECRETKEY
        // Devuelve un objeto con los datos guardados en el Payload del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRYVATEKEY);
        
        // Para devolver la información del usuario logado que esta haciendo la petición,
        // Hacemos una busqueda en el modelo usuario con el id que viene en el payload
        const usuario = await Usuario.findById( uid )

        // Validación de si el usuario no existe en la base de datos
        if(!usuario){
            return res.status(401).json({msg: 'Token no válido - Usuario no existe en db'})
        }

        // Validar si el usuario que hace la petición entá activo
        // En el caso de que estado sea false
        if(!usuario.estado){
            // Retornamos las response para cortar el flujo de la función
            return res.status(401).json({msg: 'Token no válido - usuario no activo'})
        }

        // Valadamos tambien que el usuario tenga privilegios de super admin


        // Insertamos en la request los datos del usuario 
        //para poder hacer uso de ellos en el controlador de unuarios
        req.usuario = usuario;

        // Si todo ha ido bien, el metodo next() hace pasar al siguiente middleware
        next();

    } catch (error) {
        // En el caso de que algo salga mal se dispara el cath con un status 400 
        // Y el mensaje de error por consola.
        console.log(error);
        res.status(400).json({ 
            msg: 'No hay token'
        })
    }



}


module.exports = {
    validarJWT
}