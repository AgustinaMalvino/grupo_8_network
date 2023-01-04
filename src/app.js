const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(express.static("public"));

const port = process.env.PORT || 3000;
app.listen(port,()=> 
console.log("Servidor corriendo en http://localhost:" + port)
);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('./users/login');
});

app.get('/register', (req, res) => {
    res.render('./users/register');
});

app.get('/profile', (req, res) => {
    res.render('./users/profile');
});

app.get('/productCart', (req, res) => {
    res.render('./users/productCart');
});

app.get('/productDetail', (req, res) => {
    res.render('./products/productDetail');
});

app.get('/newProduct', (req, res) => {
    res.render('./products/newProduct');
});

app.get('/updateProduct', (req, res) => {
    res.render('./products/updateProduct');
});

app.get('/productList', (req, res) => {
    res.render('./products/productList');
});