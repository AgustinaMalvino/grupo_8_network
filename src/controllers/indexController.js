const path = require('path')

const indexController = {
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/index.ejs'))
    }
}

module.exports = indexController;
