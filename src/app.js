const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');

//Middlewares
app.use(session({
    secret : 'nuestro mensaje secreto',
    resave: false,
    saveUninitialized: false,
}))
app.use(userLoggedMiddleware);
app.use(cookies());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// RUTAS
const rutaIndex = require('./routes/indexRoutes');
const rutaLogin = require('./routes/loginRoutes');
const rutaRegister = require('./routes/registerRoutes');
const rutaProduct = require('./routes/productsRoutes');

const port = process.env.PORT || 3000;
app.listen(port,()=> 
console.log("Servidor corriendo en http://localhost:" + port)
);

app.use('/', rutaIndex);
app.use(rutaLogin);
app.use(rutaProduct);
app.use(rutaRegister);