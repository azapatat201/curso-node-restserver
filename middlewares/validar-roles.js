const { request, response } = require("express")


const esAdminRole = (req = request, res = response, next) => {
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } =  req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No tiene privilegios para eliminar usuario`
        });
    }    

    next();
}

const tieneRole = (...roles) => {
    return (req = request, response = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        //console.log(roles, req.usuario.rol);

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}