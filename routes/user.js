const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators')

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPut);

router.post('/', [
    check('nombre', 'El nombre es un campo obligatorio.').not().isEmpty(),
    check('password', 'La clave debe contener al menos 6 caracteres').isLength({ min:6 }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usersDelete);


module.exports = router;