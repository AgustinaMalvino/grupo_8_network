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
    create: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                domicilio: req.body.domicilio,
                dni: req.body.dni,
                role: 1
            }
            let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), {
                encoding: 'utf-8'
            });
            let users;
            if (archivoUsers == "") {
                users = [];
            } else {
                users = JSON.parse(archivoUsers);
            };

            users.push(user);
            usersJSON = JSON.stringify(users, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), usersJSON);
            res.redirect('/login');
        } else {
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                errors: errors.errors, old: req.body
            });
        }
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
