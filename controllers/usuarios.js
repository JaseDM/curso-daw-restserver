// Requiero el modulo response de express para tener la ayuda de vsc 
const { response } = require('express');


const usuariosGet = (req, res = response) => {

    const { nombre, apikey, estado } = req.query;

    res.json({
        ok: true,
        status: 200,
        massege: 'get - controlador',
        nombre, 
        apikey, 
        estado
    })
  }

const usuariosPost = (req, res = response) => {
        // Desectructurando ignoramos cosas que nos puedan mandar que no hayamos solicitado
        const { nombre, edad} = req.body;

        res.json({
            ok: true,
            status: 200,
            massege: 'post - controlador',
            nombre, 
            edad
        })
  }

  const usuariosPut = (req, res = response) => {

    // Parametros de segmento
    const id = req.params.id;

    res.json({
        ok: true,
        status: 200,
        massege: 'put - controlador',
        id
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        status: 200,
        massege: 'delete - controlador'
    })
  }



  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
    
  }