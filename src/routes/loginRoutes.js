const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const loginController = require('../controllers/loginController');
const validations = require('../middlewares/validationsMiddleware');
const passwordValidations = require('../middlewares/passwordValidation');

// MIDDLEWARES DE RUTAS
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// MIDDLEWARES: MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
        /* if (!file) {
        const error = new Error('Por favor seleccione un archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file) */
    }
})

const uploadFile = multer({ storage });

// RUTAS
router.get('/login', guestMiddleware, loginController.login);
router.post('/login', loginController.loginProcess);
router.get('/profile', authMiddleware, loginController.profile);
router.get('/profile/editar', authMiddleware, loginController.edit);
router.post('/profile/editar', uploadFile.single('image'), validations, loginController.update);
router.get('/profile/changePassword', authMiddleware, loginController.changePassword);
router.put('/profile/changePassword', passwordValidations, authMiddleware, loginController.updatePassword);
router.get('/profile/deleteUser', authMiddleware, loginController.deleteUser);
router.post('/', loginController.logout);

module.exports = router