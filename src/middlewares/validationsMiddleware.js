const { body } = require("express-validator");
const path = require('path');

module.exports = [
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Ingrese un formato de correo electrónico válido'),
    body('first_name')
        .notEmpty().withMessage('Por favor, escriba su nombre en este campo').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),
    body('last_name')
        .notEmpty().withMessage('Por favor, escriba su apellido en este campo').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido solo puede contener letras y espacios'),
    body('DNI')
        .notEmpty().withMessage('Escriba su número de documento en este campo (sin puntos)')
        .isInt({min: 100000}).withMessage('Ingrese su número de documento sin espacios y sin puntos'),
    body('gender').notEmpty().withMessage('Seleccione su género'),
    body('address')
        .notEmpty().withMessage('Escriba la dirección de su domicilio').bail()
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('La dirección solo puede contener letras y números.'),
    body('birth_date').notEmpty().withMessage('Ingrese su fecha de nacimiento'),
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
    body('condiciones').isIn(['on']).withMessage('Tienes que aceptar los términos y condiciones para registrarte'),
    body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.svg'];

		if (file) {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		} else {return true}
		return true;
        })
];