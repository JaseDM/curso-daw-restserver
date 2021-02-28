const jwt = require('jsonwebtoken');

const jwebtoken = (uid = '') => {

    // Creamos un promesa y la retornamos
    return new Promise( (resolve, reject) => {

        const payload = { uid };
        // Parametros: Payload, secretKey, options, callback
        jwt.sign( payload, process.env.SECRETORPRYVATEKEY, {
            expiresIn: '3h'
        }, (error, token ) => { // Callback
            // En caso de haber algún error sacamos el error por consola y disparamos el reject
            if( error ){
                console.log(error);
                reject('No se pudo generar el token');
            } else {
                // Si todo está bien resolvemos el token
                resolve( token );
            }
        })

    })

}


module.exports = {
    jwebtoken
}