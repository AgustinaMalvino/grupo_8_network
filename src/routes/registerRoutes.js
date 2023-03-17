const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const {body} = require('express-validator');
const router = express.Router();
const registerController = require('../controllers/registerController')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'../../public/images/avatar');
    },
    filename:function (req, file, cb) {
        cb(null,
        `${Date.now()}_img_${path.extname(file.originalname)}`
        );
    }
})

const uploadFile = multer({storage});
var upload = multer().single('avatarFile')
app.post('/register', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.status(400).send('Algo salio mal');
        }
        res.send(req.file);
    });
});

var upload = multer({storage: storage})
app.post('/register', upload.single('avatarFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Por favor seleccione un archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

router.get('/register', registerController.register);

router.post('/register', registerController.create, uploadFile.single('avatar'));
// Validación → al subir archivos los validamos antes de permitir que sean almacenados
//se usa app.post para validar

module.exports = router