// Destructuramos el metodo Router 
const { Router } = require('express');
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

router.post('/',  usuariosPost);

router.put('/',  usuariosPut);

router.delete('/',  usuariosDelete);




module.exports = router;