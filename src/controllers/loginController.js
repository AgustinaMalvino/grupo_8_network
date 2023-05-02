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
    },
    edit: (req, res) => {
        const successful = null;
		User.findOne({ where: { id: req.session.userLogged.id } })
			.then((user) => {
				res.render(path.resolve(__dirname, '..', 'views', 'users', 'profileEdit'), { user, successful })
			})
			.catch(error => res.send(error))
    },
    update: async (req, res) => {
        const resultValidation = validationResult(req);
		var successful = false;
		if (resultValidation.errors.length > 0) {
			User.findOne({ where: { id: req.session.userLogged.id } })
				.then((user) => {
					return res.render(path.resolve(__dirname, '..', 'views', 'users', 'profileEdit'), {
						successful, user, 
						errors: resultValidation.mapped(),
						oldData: req.body
					})
				})
				.catch(error => res.send(error))
		}

        // EDITANDO EL PERFIL
		let id = req.session.userLogged.id * 1;
		let usuarioAModificar = {
			...req.body
		}
		usuarioAModificar.id = id;
		usuarioAModificar.first_name = req.body.first_name;
        usuarioAModificar.last_name = req.body.last_name;
        usuarioAModificar.email = req.body.email;
        usuarioAModificar.gender = req.body.gender;
        if(req.file){
            usuarioAModificar.image = req.file.filename;
        } else{
            usuarioAModificar.image = null;
        }
        if(req.body.notifications == 'on'){
            usuarioAModificar.notifications = 1
        } else{ usuarioAModificar.notifications = 0}

        //GUARDANDO CAMBIOS
		User.update(usuarioAModificar, {
			where: {
				id: req.session.userLogged.id
			}
		});

		var successful = true;

		await User.findOne({ where: { id: req.session.userLogged.id } })
			.then((user) => {
				res.render(path.resolve(__dirname, '..', 'views', 'users', 'profileEdit'), { user: req.body, successful })
			})
			.catch(error => res.send(error))
    },

    changePassword: (req, res) => {
        var successful = null;
        User.findOne({ where: { id: req.session.userLogged.id } })
			.then((user) => {
				res.render(path.resolve(__dirname, '..', 'views', 'users', 'changePassword'), {successful});
                res.clearCookie('email');
                req.session.destroy();
			})
			.catch(error => res.send(error))
    },

    updatePassword: async (req, res) => {
		var successful = false;
		let userInDB = await User.findOne({ where: { id: req.session.userLogged.id } });
        let passwordOk = bcryptjs.compareSync(req.body.oldPassword, userInDB.dataValues.password);

        if (passwordOk) {
            if (req.body.password == req.body.confirm_password) {
                let newPassword = { password: bcryptjs.hashSync(req.body.password, 10) }
                User.update(newPassword, { where: {id: req.session.userLogged.id}});
                res.clearCookie('email');
                req.session.destroy();
                var successful = true;
                return res.render(path.resolve(__dirname, '..', 'views', 'users', 'changePassword'), {successful})
            }
        } else {
            var successful = false;
            return res.render(path.resolve(__dirname, '../views/users/changePassword.ejs'), { successful,
				errors: {
					confirm_password: {
						msg: 'Las credenciales son inválidas'
					}
				}});
        }
    },

    deleteUser: (req, res) => {
		User.destroy({
			where: {
				id: req.session.userLogged.id
			}
		})
			.then(() => {
                res.clearCookie('email');
                req.session.destroy();
                res.redirect('/')})
			.catch(error => res.send(error))
	}

}


module.exports = loginController;
