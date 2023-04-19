const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const productsController = require('../controllers/productsController');

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

// MIDDLEWARES DE RUTAS Y VALIDACIONES
const adminMiddleware = require('../middlewares/adminMiddleware');
const validations = require("../middlewares/productsValidations");
const uploadFile = multer({ storage });

// RUTAS
router.get('/productList', productsController.productList);
router.get('/productCart', productsController.productCart);
router.get('/newProduct', adminMiddleware, productsController.create);
router.post('/newProduct', uploadFile.single('image'), validations, productsController.processCreate);
router.get('/:id/edit', adminMiddleware, productsController.edit); 
router.put('/:id/edit',uploadFile.single('image'), validations, productsController.update);
router.get('/:id/delete', productsController.destroy);

module.exports = router;