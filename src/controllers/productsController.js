const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let id = req.params.id;

const controller = {
	index: (req, res) => {
		
	},

	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let servicioFiltrado = products.find(servicio => {
			return servicio.id == id
		})

		res.render("productDetail", {servicio: servicioFiltrado})
	},

	create: (req, res) => {
		res.render("newProduct")
	},
	
	processCreate: (req, res) => {
		res.send(req.body);
	},

	edit: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let servicioFiltrado = products.find(servicio => {
			return servicio.id == id
		})

		res.render("updateProduct", {servicio: servicioFiltrado})
	},

	update: (req, res) => {
		
	},

	destroy : (req, res) => {
	}
};

module.exports = controller;