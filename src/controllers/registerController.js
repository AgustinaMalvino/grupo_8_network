const path = require('path')

const registerController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'))
    }
}

module.exports = registerController;
