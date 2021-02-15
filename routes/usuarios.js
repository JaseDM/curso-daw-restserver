// Destructuramos el metodo Router 
const { Router } = require('express');
const { check } = require('express-validator');

// Importamos el controlador de usuarios
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios')


// Iniciamos las rutas 
const router = Router();




// Creamos las rutas especificas para el endpoint de usuarios
// La rutas se definen a la raiz del sitio porque desde la clase server el middleware encargado de cargar las rutas define la url
router.get('/', usuariosGet);

// Parametros  'ruta'/[middleware, middleware]/controlador
router.post('/', 
check('El email no es válido').isEmail() , 
usuariosPost);

router.put('/:id',  usuariosPut); // Petición con parametro de segción id

router.delete('/:id',  usuariosDelete);  // Petición con parametro de segción id 




module.exports = router;