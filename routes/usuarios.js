// Destructuramos el metodo Router 
const { Router } = require('express');
// Importamos el método check del modulo express-validator
// Este modulo es el encargado de validar los campos enviados desde el frontend
// Documentación: https://express-validator.github.io/docs/
const { check } = require('express-validator');

// Importamos el modelo creado para la colección de roles
const Role = require('../models/role');

// Importamos un helper creado para la validación custom que busca y compara el resultado en la base de datos
const { esRolValido, esEmailUnico, existeUsuarioPorId } = require('../helpers/db-validators')
// Importamos el middleware creado para la función que manda los errores a la petición
const { validarCampos } = require('../middleware/validar-campos');
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
        // El metodo check hace validaciones según las necesidades de cada campo
        [check('correo', 'El correo no el válido').isEmail(), // isEmail() Si es un email
        check('correo').custom( esEmailUnico ), // Validación personalizada. creadas en el helper db-validators.js
        // password must be at least 5 chars long
        check('password', 'La contraseña debe de tener un mínimo de 8 caracteres').isLength({ min: 8 }),  // isLength valida en numero de caracteres min: max:
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // .not().isEmpty() Validación de si está vacío
        // Validación custom que hace comparación en la base de datos
        check('rol').custom( esRolValido ),
        // Función para los mensajes de error 
        validarCampos],
        // Controlador de usuarios
        usuariosPost);

router.put('/:id',[
        check('id', 'La id no es válida').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
] , usuariosPut); // Petición con parametro de segción id

router.delete('/:id', [
        check('id', 'La id no es válida').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete);  // Petición con parametro de segción id 




module.exports = router;