const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/detail/:id/', productsController.detail); 


router.get('/create/', productsController.create);
router.post('/create/', productsController.processCreate);

router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 

router.delete('/:id', productsController.destroy);


module.exports = router;