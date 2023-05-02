const { validationResult } = require('express-validator');
const users = require('../models/users.js');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models/');
const User = db.User;

const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },
   
    create: async (req, res) => {
        // REVISANDO ERRORES EN EL FORMULARIO
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
			return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        // REVISANDO EL MAIL Y DNI QUE SE VA A REGISTRAR
        let userInDB = await User.findOne({ where: { email: req.body.email } });
        let dniInDB = await User.findOne({ where: { DNI: req.body.DNI } });
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
        if (dniInDB) {
			return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
				errors: {
					DNI: {
                        msg: 'Este número de documento ya está registrado'
                    }
				},
				oldData: req.body
			});
		}

        // CREANDO EL USUARIO
        let crear = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            birth_date: req.body.birth_date,
            role: 'user'
        }
        if(req.file){
            crear.image = req.file.filename;
        } else{
            crear.image = null;
        }
        User
        .create(crear)
        .then((storedUser) => {
            return  res.redirect('/login');
        })
      .catch(error => console.log(error));
        return res.redirect('login');
    }
}


module.exports = registerController;