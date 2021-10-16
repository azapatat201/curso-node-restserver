const { response } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try{

        //Verificar si el email existe
        const usuario = await User.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - correo'
            });
        }

        //Verificar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - estado = false'
            });
        }

        //Verificar la clave
        const  validarPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - password'
            });
        }

        //Generar el JWt
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        });

    }catch(error){
        console.log(Error);
        return res(500).json({
            msg: 'Ha ocurrido un error por favor comuniquese con su administrador de sistemas'
        })
    }    
};

module.exports = {
    login
}