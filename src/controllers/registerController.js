const { validationResult } = require('express-validator');
const users = require('../models/users.js');
const bcryptjs = require('bcryptjs');
const path = require('path')

const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },
   
    create: (req, res) => {
        let crear = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename,
            role: 'user'
        }
        users.create(crear);
        return res.redirect('login');
    }
}


module.exports = registerController;