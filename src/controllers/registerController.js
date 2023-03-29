const { validationResult } = require('express-validator');
const users = require('../models/users.js');
const bcryptjs = require('bcryptjs');
const path = require('path')

const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },
   
    create: (req, res) => {
        // REVISANDO ERRORES EN EL FORMULARIO
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
			return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        // REVISANDO EL MAIL QUE SE VA A REGISTRAR
        let userInDB = users.findByField('email', req.body.email);
        if (userInDB) {
			return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        // CREANDO EL USUARIO
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