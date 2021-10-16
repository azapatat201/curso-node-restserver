
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type:String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type:String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type:String,
        require: [true, 'La contraseña es obligatoria']
    },
    img: {
        type:String
    },
    rol: {
        type:String,
        require: true
    },
    estado: {
        type:Boolean,
        default: true
    },
    google: {
        type:Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema)