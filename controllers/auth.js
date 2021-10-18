const { response, request, json } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req = request, res = response) => {
    const {id_token} = req.body;

    try {

        const {nombre, correo, img} = await googleVerify(id_token);
        //console.log(googleUser);

        let usuario = await User.findOne({correo});

        if(!usuario){
            const data ={
                nombre,
                correo,
                password: ':P',
                img,
                google:true
            };
            
            usuario = new User(data);
            await usuario.save();
        }

        //Si el usuario en la BD esta inhabilitado - negar el acceso
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Contacte con su administrador - este usuario se encuentra bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        })
    }


    
}

module.exports = {
    login, 
    googleSignIn
}