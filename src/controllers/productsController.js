const { validationResult } = require('express-validator');
const path = require('path');
const products = require('../models/products.js');
const db = require('../database/models/');
const { assert } = require('console');
const Product = db.Product;
const Category = db.Category;
const Op = db.Sequelize.Op;

const productsController = {

	productList: async (req, res) => {
		try {
			let productosCable = await Product.findAll({
				include: [{
					model: Category,
					as: 'Category',
					where: { name: 'Cable' }
				}]
			});
			let productosInternet = await Product.findAll({
				include: [{
					model: Category,
					as: 'Category',
					where: { name: 'Internet' }
				}]
			});
			let productosPaquetes = await Product.findAll({
				include: [{
					model: Category,
					as: 'Category',
					where: { name: 'Paquetes' }
				}]
			});
			let productosAplicaciones = await Product.findAll({
				include: [{
					model: Category,
					as: 'Category',
					where: { name: 'Aplicaciones' }
				}]
			});

			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productList'), {
				cable: productosCable,
				internet: productosInternet,
				paquetes: productosPaquetes,
				aplicaciones: productosAplicaciones,
			});
		} catch (error) {
			console.log(error);
		}
	},

	productCart: (req, res) => {
		res.render(path.resolve(__dirname, '..', 'views', 'users', 'productCart'));
	},

	create: (req, res) => {
		const successful = null;
		res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful });
	},

	processCreate: async (req, res) => {
		const resultValidation = validationResult(req);
		var successful = false;
		if (resultValidation.errors.length > 0) {
			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), {
				successful,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		// REVISANDO QUE NO EXISTA UN PRODUCTO CON EL MISMO NOMBRE
		let productInDB = await Product.findOne({ where: { name: req.body.name } });
		if (productInDB) {
			return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), {
				successful,
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

		if (req.body.offer == "true") {
			crear.offer = true;
			crear.discount = req.body.discount * 1;
		} else {
			crear.offer = false;
		}

		crear.image = req.file.filename;

		switch (req.body.category) {
			case "Cable":
				crear.categoryId = 1;
				break;
			case "Internet":
				crear.categoryId = 2;
				break;
			case "Paquetes":
				crear.categoryId = 3;
				break;
			case "Aplicaciones":
				crear.categoryId = 4;
				break;
		}

		var successful = true
		Product.create(crear)
			.then(productos => {
				return res.render(path.resolve(__dirname, '..', 'views', 'products', 'newProduct'), { successful })
			})
	},

	edit: (req, res) => {
		const successful = null;
		Product.findOne({ where: { id: req.params.id } })
			.then((productos) => {
				res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), { productos, successful })
			})
			.catch(error => res.send(error))
	},

	update: async (req, res) => {
		const resultValidation = validationResult(req);
		var successful = false;
		if (resultValidation.errors.length > 0) {
			Product.findOne({ where: { id: req.params.id } })
				.then((productos) => {
					return res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), {
						successful, productos,
						errors: resultValidation.mapped(),
						oldData: req.body
					})
				})
				.catch(error => res.send(error))
		}

		// EDITANDO EL PRODUCTO
		let id = req.params.id * 1;
		let servicioAModificar = {
			...req.body
		}
		servicioAModificar.id = id;
		servicioAModificar.price = req.body.price * 1;

		// CAMBIANDO LA CONFIGURACIÓN DE LAS OFERTAS
		if (req.body.offer == "true") {
			servicioAModificar.offer = true;
			servicioAModificar.discount = req.body.discount * 1;
		} else {
			servicioAModificar.offer = false;
			servicioAModificar.discount = 0;
		}

		// GUARDANDO LA IMAGEN
		let product = await Product.findOne({ where: { id: req.params.id } });
		let oldImage = product.image;
		if(req.file){
			servicioAModificar.image = req.file.filename;
		} else {servicioAModificar.image = oldImage;}

		// ASIGNANDO LA CATEGORIA
		switch (req.body.category) {
			case "Cable":
				servicioAModificar.categoryId = 1;
				break;
			case "Internet":
				servicioAModificar.categoryId = 2;
				break;
			case "Paquetes":
				servicioAModificar.categoryId = 3;
				break;
			case "Aplicaciones":
				servicioAModificar.categoryId = 4;
				break;
		}

		//GUARDANDO CAMBIOS
		Product.update(servicioAModificar, {
			where: {
				id: req.params.id
			}
		});

		var successful = true;

		await Product.findOne({ where: { id: req.params.id } })
			.then((productos) => {
				res.render(path.resolve(__dirname, '..', 'views', 'products', 'updateProduct'), { productos: req.body, successful })
			})
			.catch(error => res.send(error))
	},

	destroy: (req, res) => {
		Product.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(() => res.redirect('/productList'))
			.catch(error => res.send(error))
	},

	find: (req, res) => {
		Product.findAll({
			where: {
				[Op.or]: [
					{ name: { [Op.like]: `%${req.body.busqueda}%` } },
					{ description: { [Op.like]: `%${req.body.busqueda}%` } },
					{ tags: { [Op.like]: `%${req.body.busqueda}%` } }
				]
			}
		})
			.then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'products', 'productsFind'), { productos: resultado }) })
			.catch(error => res.send(error))
	}
};

module.exports = productsController;