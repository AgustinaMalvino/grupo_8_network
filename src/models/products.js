const fs = require('fs');

const products = {
    // UBICACIÓN DE LA BASE DE DATOS DE LOS PRODUCTOS
    productsDataBase: './src/data/products-test.json',

    // CONVERTIR LOS DATOS JSON A OBJETOS LITERALES
    getData: function(){
        return JSON.parse(fs.readFileSync(this.productsDataBase, 'utf-8'))
    },

    // GENERADOR DE NUEVOS IDs
    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct){
            return lastProduct.id + 1;
        } else {return 1}
    },

    // BUSCA A TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    findAll: function(){
        return this.getData();
    },

    // BUSCA UN PRODUCTO POR SU ID
    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.id == id);
        return productFound;
    },

    // BUSCA UN PRODUCTO POR UN CAMPO ESPECÍFICO
    findByField: function(field, text){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] == text);
        return productFound;
    },

    // BUSCA VARIOS PRODUCTOS POR UN CAMPO ESPECÍFICO
    filterByField: function(field, text){
        let allProducts = this.findAll();
        let productsByFieldFound = allProducts.filter(oneProduct => oneProduct[field] == text);
        return productsByFieldFound;
    },

    // GUARDA UN NUEVO PRODUCTO EN LA BASE DE DATOS
    create: function(productData){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.productsDataBase, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    // ELIMINAR PRODUCTO EN LA BASE DE DATOS
    delete: function(id){
        let allProducts = this.findAll();
        let finalProduct = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(this.productsDataBase, JSON.stringify(finalProduct, null, ' '));
    }
}

module.exports = products;