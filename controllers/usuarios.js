// Requiero el modulo response de express para tener la ayuda de vsc
const {response} = require('express');
// Importamos el modelo de Usuaru¡rio y lo ponemos con la primera en mayuscula, para 
// crear instancias. La mayuscula no es obligatoria, pero es una convención
const Usuario = require('../models/usuario');
// Importamos el modulo de encriptación de contraseñas 
const bcrypt = require('bcryptjs');
const { Mongoose } = require('mongoose');



const usuariosGet = async(req, res = response) => {
    // captura los parametros mandados por url
    //const {nombre, apikey, estado} = req.query;
    // Paginación
    // Recogemos los parametros mandados en la url 
    const { limite = 5, desde = 0 } = req.query;
    // Constante con el filtro de estado true
    const query = { estado: true}
  
    // Cuando hay varias promesas, podemos lanzarlas con el metodo Promise.all()
    // Ejecuta las dos a la vez y si falla una, fallan todas
    const [usuarios, total] = await Promise.all([
      // Le pasamos las variables de limite y desde a las funciones de paginación .limit() y .skip()
      Usuario.find(query) // Se le pasa la constante query al metodo .find()
        .limit(Number(limite))
        .skip(Number(desde)),
        // Total de registros en una colección
        Usuario.countDocuments(query)
    ]);

    res.json({
      total,
      usuarios
    })
}

// Función asincrona ya que hace una inserción en base de datos online y esperamos respuesta
const usuariosPost = async(req, res = response) => {
    // Capturamos los datos que vienen en el body y los destructuramos por si vienen datos no solicitados
    const { nombre, correo, password, rol } = req.body;
    // Creamos una nueva instancia del modelo Usuarios y le pasamos los datos destructurados del body
    const usuario = new Usuario( {nombre, correo, password, rol });
    
    

    // Lamamos al metodo genSaltSync() del modulo bcryptjs, Se le puede pasar un parametro del 
    // número de vueltas. Por defecto son 10
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // sabe() Función de mongoose para guardar registros en la colección
    await usuario.save();


    // Creamos la respuesta del servidor
    res.json({
      usuario
    })
}

const usuariosPut = async(req, res = response) => {

    // Parametros de segmento
    const id = req.params.id;
    // Parámetros del body
    const { _id, password, google, correo, ...resto } = req.body;

    if(password) {
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);




    res.json({
      id,
      usuario
    })
}

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
  
    res.json({
      usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}