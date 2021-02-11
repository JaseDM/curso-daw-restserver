// Requiero el modulo response de express para tener la ayuda de vsc 
const { response } = require('express');


const usuariosGet = (req, res = response) => {
    res.json({
        ok: true,
        status: 200,
        massege: 'get - controlador'
    })
  }

  const usuariosPost = (req, res = response) => {
    res.json({
        ok: true,
        status: 200,
        massege: 'post - controlador'
    })
  }

  const usuariosPut = (req, res = response) => {
    res.json({
        ok: true,
        status: 200,
        massege: 'put - controlador'
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