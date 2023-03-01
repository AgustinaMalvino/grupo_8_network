/* const fs = require('fs');
const path = require('path');
let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));

module.exports = (req, res, next) =>{
    res.locals.user = false;
    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    } else if(req.cookies.email){
        let user = usersFile.find(user => user.email == req.cookies.email)
        req.session.user = user;
        res.locals.user = user;
        return next();
    } else{
        return next();
    }
}
*/

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    if(req.session.userLogged){
        res.locals.isLogged = true;
    }
    next();
}

module.exports = userLoggedMiddleware;