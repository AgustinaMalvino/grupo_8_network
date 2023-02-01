const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products-test.json');

const productsController = {

	productList: (req, res) => {
		const productosLeidos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let productosCable = productosLeidos.filter(servicio => {
			return servicio.category == "Cable"
		});

		let productosInternet = productosLeidos.filter(servicio => {
			return servicio.category == "Internet"
		});

		let productosPaquetes = productosLeidos.filter(servicio => {
			return servicio.category == "Paquetes"
		});

		let productosAplicaciones = productosLeidos.filter(servicio => {
			return servicio.category == "Aplicaciones"
		});

		res.render(path.resolve(__dirname, '..', 'views', 'products', 'productList'), {
			cable: productosCable,
			internet: productosInternet,
			paquetes: productosPaquetes,
			aplicaciones: productosAplicaciones,
		});
	},

	productCart: (req, res) => {
		res.render(path.resolve(__dirname, '..', 'views', 'users', 'productCart'));
	},

	create: (req, res) => {
		let servicios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products-test.json')));
		res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'));
	},
	
	processCreate: (req, res) => {
		let servicios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products-test.json')));
        let ultimoServicio = servicios.pop();
        servicios.push(ultimoServicio);
        let nuevoProducto = {
            id: ultimoServicio.id +1,
            name: req.body.nombre,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
			category: req.body.category
        }
        servicios.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(servicios,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products-test.json'), nuevoProductoGuardar);
        res.redirect('/newProduct');
	},

	edit: (req, res) => {
		const productosLeidos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let id = req.params.id;
		let servicioFiltrado = productosLeidos.find(servicio => {
			return servicio.id == id;
		})

		res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), {servicioFiltrado});
	},

	update: (req, res) => {
		let servicio = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products-test.json')));
        req.body.id = req.params.id;
        let servicioUpdate = servicio.map(servicioBuscar =>{
            if(servicioBuscar.id == req.body.id){
                return servicioBuscar = req.body;
            }
            return servicioBuscar;
        })
        let servicioActualizar = JSON.stringify(servicioUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products-test.json'), servicioActualizar)
        res.redirect('/updateProducts');
	},

	destroy : (req, res) => {
		let servicio = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products-test.json')));
        const servicioBorrarId = req.params.id;
        const servicioFinal = servicio.filter(service => service.id != servicioBorrarId);
        let servicioGuardar = JSON.stringify(servicioFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../data/products-test.json'),servicioGuardar);
        res.redirect('/productList');
	}
};

module.exports = productsController;