const { validationResult } = require('express-validator');
const userLogin = require('../models/users');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models/');
const User = db.User;

const loginController = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'))
    },

    profile: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/profile.ejs'), {
            user: req.session.userLogged
        })
    },

    loginProcess: async (req, res) => {
        const userToLogin = await User.findOne({ where: { email: req.body.email } });
        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.remember_user) {
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
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
    }

}


module.exports = loginController;
