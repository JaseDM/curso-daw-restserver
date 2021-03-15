const { response } = require('express');
const bcryptjs = require('bcryptjs');
const  { jwebtoken } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const Usuario = require('../models/usuario');
    const { correo, password} = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario o password invalidos - correo'
            })
        } 

        // Si el usuario está activo

        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario incorrecto'
            })
        }


        // verificar la contraseña
        // metodo .compareSync(password, password) compara la contraseña en bd con la enviada en el body
        const passValido = bcryptjs.compareSync(password, usuario.password);
        if( !passValido ){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - contraseña'
            })
        }

        //generar token
        const token = await jwebtoken(usuario.id);




        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Ponte en contacto con el administrador'
        
        })
    }

    
}

const googleSignIn = async(req, res = response) =>{
    
    const { id_token } = req.body;

    try {
        res.json({msg: 'todo ok en SignIn', id_token})
    } catch (error) {
        res.status(400).json({msg: 'Token de Google no es válido', error})
    }

    
}



module.exports = {
    login,
    googleSignIn
}