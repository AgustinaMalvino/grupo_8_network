const { validationResult } = require('express-validator');
const userLogin = require('../models/userLogin.js');
const bcrypt = require('bcryptjs');
const path = require('path')



const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },

    
    create: (req, res) => {
        let crear = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            domicilio: req.body.domicilio,
            dni: req.body.dni,
            password: bcrypt.hashSync(req.body.password, 10), 
        }
        let userToCreate = userLogin.create(crear)       
    }
}


module.exports = registerController;
