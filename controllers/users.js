const {response} = require('express')


const usersGet = (req, res = response) => {
    const query = req.query;

    res.json({
        msg: 'get API - controller',
        query
    });
  }

  const usersPut = (req, res) => {
    const {id} = req.params;

    res.json({
        msg: 'put API - controller',
        id
    });
  }

  const usersPost = (req, res) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
  }

  const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
  }



  module.exports = {
      usersGet, 
      usersPut,
      usersPost,
      usersDelete
  }