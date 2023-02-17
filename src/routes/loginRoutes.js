const express = require('express');

const router = express.Router();

const {body} = require('express-validator');

const loginController = require('../controllers/loginController')

router.get('/', loginController.login)
router.get('/profile', loginController.profile)

module.exports = router