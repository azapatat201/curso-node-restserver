const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');


const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticións'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
       
        const usuario = await Usuario.findById( uid );
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no se encuentra en la bd'
            });
        }


        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no válido, el usuario esta inactivo'
            });
        }

        req.usuario = usuario;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }    
}

module.exports = {
    validarJWT
}