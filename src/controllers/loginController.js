const { validationResult } = require('express-validator');
const userLogin = require('../models/users');
const bcryptjs = require('bcryptjs');
const path = require('path');

const loginController = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'))
    },

    profile: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/profile.ejs'), {
            user: req.session.userLogged
        })
    },

    loginProcess: (req, res) => {
        let userToLogin = userLogin.findByField('email', req.body.email);
        if(userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.remember_user) {
					res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
                return res.redirect('profile');
            }
            return res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
                errors: {
                    password: {
                        msg: 'Las credenciales son inválidas.'
                    }
                },
                oldData: req.body
            });
        }
        return res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			},
            oldData: req.body
		});
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('email');
        res.redirect('/');
    }

}


module.exports = loginController;
