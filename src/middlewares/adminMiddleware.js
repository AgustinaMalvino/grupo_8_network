function adminMiddleware(req, res, next) {
    if (!req.session.userLogged){
        return res.redirect('/productList');
    } else {
        if (req.session.userLogged.role === 'admin') {
		next();
	} else {
        return res.redirect('/productList');
    }
    }
}

module.exports = adminMiddleware;