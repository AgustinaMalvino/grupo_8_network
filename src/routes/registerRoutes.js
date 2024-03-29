const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validations = require('../middlewares/validationsMiddleware')

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

// MIDDLEWARES DE RUTAS
const guestMiddleware = require('../middlewares/guestMiddleware');

const uploadFile = multer({ storage });

const registerController = require('../controllers/registerController');

router.get('/register', guestMiddleware, registerController.register)
router.post('/register', uploadFile.single('image'), validations, registerController.create);

module.exports = router