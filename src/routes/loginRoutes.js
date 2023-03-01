const express = require('express');

const router = express.Router();

const {body} = require('express-validator');

const loginController = require('../controllers/loginController')

router.get('/login', loginController.login);
router.get('/profile', loginController.profile);
router.post('/login', loginController.loginProcess);
router.get('/register', loginController.register);
router.post('/register', loginController.create);
router.post('/', loginController.logout);

module.exports = router