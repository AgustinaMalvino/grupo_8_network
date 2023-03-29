const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const loginController = require('../controllers/loginController');

// MIDDLEWARES DE RUTAS
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

// RUTAS
router.get('/login', guestMiddleware, loginController.login);
router.get('/profile', authMiddleware, loginController.profile);
router.post('/login', loginController.loginProcess);
router.post('/', loginController.logout);

module.exports = router