const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config')

//Create server class
class Server{
    //add constructor
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath  = '/api/auth'

        //Conect to database
        this.conectarDB();

        //Middleware -- Functions that run when the server is raised
        this.middleware();

        //Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        //Cors
        this.app.use( cors() );

        //Body Reading and Parsing
        this.app.use(express.json());


        //public directory -- SERVIMOS EL index.html EN LA CARPETA PUBLICA
        this.app.use(express.static('public'));
    }

    //Add routes
    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/user'))
    }

    //Add port to listen server
    listen(){
        this.app.listen(this.port,  () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        
        });
    }
}

module.exports = Server;