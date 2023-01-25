const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(express.static("public"));

const rutaIndex = require('./routes/indexRoutes')
const rutaLogin = require('./routes/loginRoutes')
const rutaRegister = require('./routes/registerRoutes')


const port = process.env.PORT || 3000;
app.listen(port,()=> 
console.log("Servidor corriendo en http://localhost:" + port)
);

app.use('/', rutaIndex)
app.use('/login', rutaLogin)
app.use('/register', rutaRegister)


app.get('/profile', (req, res) => {
    res.render('./users/profile');
});

app.get('/productCart', (req, res) => {
    res.render('./users/productCart');
});

app.get('/newProduct', (req, res) => {
    res.render('./products/newProduct');
});

app.get('/productDetail', (req, res) => {
    res.render('./products/productDetail');
});


app.get('/updateProduct', (req, res) => {
    res.render('./products/updateProduct');
});

app.get('/productList', (req, res) => {
    res.render('./products/productList');
});

