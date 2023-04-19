const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// MIDDLEWARES DE RUTAS
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// RUTAS
router.get('/login', guestMiddleware, loginController.login);
router.post('/login', loginController.loginProcess);
router.get('/profile', authMiddleware, loginController.profile);
router.post('/', loginController.logout);

module.exports = router