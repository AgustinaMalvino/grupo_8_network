const { body } = require("express-validator");
const path = require('path');

module.exports = [
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Ingrese un formato de correo electrónico válido'),
    body('first_name').notEmpty().withMessage('Por favor, escriba su nombre en este campo'),
    body('last_name').notEmpty().withMessage('Por favor, escriba su apellido en este campo'),
    body('DNI').notEmpty().withMessage('Escriba su número de documento en este campo (sin puntos)'),
    body('gender').notEmpty().withMessage('Seleccione su género'),
    body('address').notEmpty().withMessage('Escriba la dirección de su domicilio'),
    body('birth_date').notEmpty().withMessage('Ingrese su fecha de nacimiento'),
    body('password').notEmpty().withMessage('Escriba una contraseña'),
    body('confirm_password').notEmpty().withMessage('Las contraseñas no coinciden o son invalidas, por favor, vuelva a definir su contraseña'),
    body('condiciones').isIn(['on']).withMessage('Tienes que aceptar los términos y condiciones para registrarte'),
    body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (file) {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		} else {return true}
		return true;
        })
];