const { body } = require("express-validator");
const path = require('path');

module.exports = [
    body('password')
        .notEmpty().withMessage('Escriba una contraseña').bail()
        .custom((value) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordRegex.test(value)) {
                throw new Error('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
            }
            return true;
        }),
    body('confirm_password')
        .notEmpty().withMessage('Las contraseñas no coinciden o son invalidas, por favor, vuelva a definir su contraseña').bail()
        .custom((value, { req }) => {
            if(req.body.password != req.body.confirm_password){
                throw new Error('Las contraseñas no coinciden o son invalidas, por favor, vuelva a definir su contraseña')
            } else { return true}
        }),
];