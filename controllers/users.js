const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

  const usersGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;  
    const query = {estado: true};
    
    /*const users = await User.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
    const totalRegistros = await User.countDocuments(query);*/

    const [totalRegistros, usuarios] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      totalRegistros,
      usuarios
    });
  }

  const usersPut = async(req, res) => {
    const {id} = req.params;
    const {_id, password, googel, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if (password){
          //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto )

    res.json({user});
  }

  const usersPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
 
    //Guardar en BD
    await user.save();

    res.json({
        user
    });
  }

  const usersDelete = async (req, res) => {
    const { id } = req.params;

    const usuario = await User.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario;
    
    res.json({
        usuario,
        usuarioAutenticado
    });
  }



  module.exports = {
      usersGet, 
      usersPut,
      usersPost,
      usersDelete
  }