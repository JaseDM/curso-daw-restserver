const { response, request } = require('express');
// requerimos el modulo de JsonWebToken
const jwt = require('jsonwebtoken');

// creamos la función de validación del toquen, pasando los parametros de req, res, next
const validarJWT = (req = request, res = response, next) => {
    // recuperamos la cabecera mandada en la petición y guardamos el token
    const token = req.header('x-token');

    if( !token ){
        return res.json({
            msg: 'No hay token en la petición'
        });
    }
    

}


module.exports = {
    validarJWT
}