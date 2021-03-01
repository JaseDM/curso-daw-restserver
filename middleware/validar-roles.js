const { response, request } = require('express');



const roleAdmin = (req = request, res = response, next) => {

    if(!req.usuario) return res.status(500).json({msg:'No se puede validar el rol sin validar el token'});
    
     const { rol, nombre } = req.usuario;

     if(rol !== 'ADMIN_ROLE') return res.status(400).json({msg: `El usuario ${nombre} no tiene privilegios para esta acción`});

    next();
}


const rolesValidos = ( ...roles ) => {

    return (req = request, res = response, next) => {
        if(!req.usuario) return res.status(500).json({msg:'No se puede validar el rol sin validar el token'});

        const esRol = roles.includes(req.usuario.rol);
        if(!esRol) return res.status(401).json({msg:'El servicio requiere un rol diferente'});

        next();


        //next();
    }

}




module.exports = {
    roleAdmin,
    rolesValidos
}