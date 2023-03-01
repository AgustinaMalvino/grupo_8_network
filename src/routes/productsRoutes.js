const express = require('express');
const path  = require('path');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/productList', productsController.productList);
router.get('/productCart', productsController.productCart);
router.get('/newProduct', productsController.create);
router.post('/newProduct', productsController.processCreate);
router.get('/:id/edit', productsController.edit); 
router.put('/:id/update', productsController.update);
router.delete('/:id/delete', productsController.destroy);

module.exports = router;