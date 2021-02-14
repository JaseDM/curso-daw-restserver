// Requiero el modulo response de express para tener la ayuda de vsc
const {response} = require('express');
// Importamos el modelo de Usuaru¡rio y lo ponemos con la primera en mayuscula, para 
// crear instancias. La mayuscula no es obligatoria, pero es una convención
const Usuario = require('../models/usuario');
// Importamos el modulo de encriptación de contraseñas 
const bcrypt = require('bcryptjs');
const { Mongoose } = require('mongoose');

const { validationResult } = require('express-validator');









const usuariosGet = (req, res = response) => {
    // captura los parametros mandados por url
    //const {nombre, apikey, estado} = req.query;

    res.json({
        massege: 'get - controlador - desarrollo'
    })
}

// Función asincrona ya que hace una inserción en base de datos online y esperamos respuesta
const usuariosPost = async(req, res = response) => {
    // Capturamos los datos que vienen en el body y los destructuramos por si vienen datos no solicitados
    const { nombre, correo, password, rol } = req.body;
    // Creamos una nueva instancia del modelo Usuarios y le pasamos los datos destructurados del body
    const usuario = new Usuario( {nombre, correo, password, rol });

    // Susca en el modelo Usuarios, en el campo correo, 
    // una coincidencia cin el correo pasado por body
    const validarCorreo = await Usuario.findOne({ correo });
    // condicional de verificación
    if ( validarCorreo ) {
      return res.status(400).json({
        error: 'El correo existe en la base de datos'
      })
    }
    

    // Lamamos al metodo genSaltSync() del modulo bcryptjs, Se le puede pasar un parametro del 
    // número de vueltas. Por defecto son 10
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)
    // sabe() Función de mongoose para guardar registros en la colección
    await usuario.save();


    // Creamos la respuesta del servidor
    res.json({
      usuario
    })
}

const usuariosPut = (req, res = response) => {

    // Parametros de segmento
    const id = req.params.id;

    res.json({ok: true, status: 200, massege: 'put - controlador', id})
}

const usuariosDelete = (req, res = response) => {
    res.json({ok: true, status: 200, massege: 'delete - controlador'})
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}