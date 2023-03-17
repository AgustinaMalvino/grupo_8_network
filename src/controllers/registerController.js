const { validationResult, body } = require('express-validator');
const userLogin = require('../models/userLogin.js');
const bcrypt = require('bcryptjs');
const path = require('path')



const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },

    
    create: (req, res) => {
        let crear = {
            ...req.body
        }
        userLogin.create(crear);
        return res.redirect('login');
    }
}


module.exports = registerController;
