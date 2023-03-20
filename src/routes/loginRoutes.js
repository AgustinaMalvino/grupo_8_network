const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const loginController = require('../controllers/loginController');

// VALIDACIONES
const validations = [
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Ingrese un formato de correo electrónico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('name').notEmpty().withMessage('Por favor, escriba su nombre en este campo'),
    body('surname').notEmpty().withMessage('Por favor, escriba su apellido en este campo'),
    body('dni').notEmpty().withMessage('Escriba su número de documento en este campo (sin puntos)'),
    body('sexo').notEmpty().withMessage('Seleccione su género'),
    body('password').notEmpty().withMessage('Las contraseñas no coinciden o son invalidas, por favor, vuelva a definir su contraseña'),
];

// MIDDLEWARES DE RUTAS
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

// RUTAS
router.get('/login', guestMiddleware, loginController.login);
router.get('/profile', authMiddleware, loginController.profile);
router.post('/login', loginController.loginProcess);
router.post('/', loginController.logout);

module.exports = router