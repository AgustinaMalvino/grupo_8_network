const { validationResult } = require('express-validator');
const userLogin = require('../models/userLogin.js');
const bcrypt = require('bcryptjs');
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

    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    },
    loginProcess: (req, res) => {
        let userToLogin = userLogin.findByField('email', req.body.email);
        if(userToLogin){
            if(req.body.password == userToLogin.password){
                req.session.userLogged = userToLogin;
                return res.redirect('profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'error'
                    }
                }
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/');
    }

}


module.exports = loginController;
