const Role = require('../models/role')
const User = require('../models/user');

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
    }
};

const existeEmail = async(correo='') => {
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
      //return res.status(400).json({        msg: 'El correo ya esta registrado.'});
      throw new Error(`El correo ${ correo } ya esta registrado`)
    }
};
const existeUsuarioId = async(id) => {
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
      throw new Error(`El usuario id : ${ id } no existe en la base de datos`)
    }
};

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId
}