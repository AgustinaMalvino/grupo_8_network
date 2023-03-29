const fs = require('fs');
const path = require('path');
const products = require('../models/products');

const productsController = {

	productList: (req, res) => {
		let productosCable = products.filterByField('category', 'Cable')
		let productosInternet = products.filterByField('category', 'Internet')
		let productosPaquetes = products.filterByField('category', 'Paquetes')
		let productosAplicaciones = products.filterByField('category', 'Aplicaciones')

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
		res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'));
	},
	
	processCreate: (req, res) => {
		let crear = {
			...req.body
		}
		products.create(crear);
        return res.redirect('/newProduct');
	},

	edit: (req, res) => {
		let id = req.params.id;
		let servicioFiltrado = products.findByPk(id);
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