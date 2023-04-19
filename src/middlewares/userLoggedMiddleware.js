const users = require('../models/users');

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.email;
	let userFromCookie = users.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;