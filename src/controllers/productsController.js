const { validationResult } = require('express-validator');
const path = require('path');
const products = require('../models/products.js');
const fs = require('fs');

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
		const successful = null;
		res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful });
	},
	
	processCreate: (req, res) => {
		const resultValidation = validationResult(req);
		var successful = false;
        if (resultValidation.errors.length > 0) {
			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        // REVISANDO QUE NO EXISTA UN PRODUCTO CON EL MISMO NOMBRE
        let productInDB = products.findByField('name', req.body.name);
        if (productInDB) {
			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful, 
				errors: {
					name: {
						msg: 'Ya existe un producto con este nombre'
					}
				},
				oldData: req.body
			});
		}

        // CREANDO EL PRODUCTO
		let crear = {
			...req.body
		}

		crear.price = req.body.price * 1;

		if(req.file){
            crear.image = req.file.filename;
        } else{
            crear.image = null;
        }

		if(req.body.offer == "true"){
            crear.offer = true;
			crear.discount = req.body.discount * 1;
        } else{
            crear.offer = false;
        }
		products.create(crear);
		var successful = true;
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful });
	},

	edit: (req, res) => {
		const successful = null;
		let id = req.params.id;
		let servicioFiltrado = products.findByPk(id);
		res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), {servicioFiltrado, successful});
	},

	update: (req, res) => {
		const resultValidation = validationResult(req);
		var successful = false;
        if (resultValidation.errors.length > 0) {
			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), { successful,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        // EDITANDO EL PRODUCTO
		let id = req.params.id * 1;
		let servicioAModificar = {
			...req.body
		}
		servicioAModificar.id = id;
		servicioAModificar.price = req.body.price * 1;

		if(req.body.offer == "true"){
            servicioAModificar.offer = true;
			servicioAModificar.discount = req.body.discount * 1;
        } else{
            servicioAModificar.offer = false;
        }

		if(req.file){
            servicioAModificar.image = req.file.filename;
        } else{
            servicioAModificar.image = null;
        }

		products.update(servicioAModificar, id);
		let servicioFiltrado = products.findByPk(id);
		var successful = true;
		return res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), {servicioFiltrado, successful});
	},

	destroy : (req, res) => {
        let servicioBorrarId = req.params.id;
        products.delete(servicioBorrarId);
        res.redirect('/productList');
	}
};

module.exports = productsController;