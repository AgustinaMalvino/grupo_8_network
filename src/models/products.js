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
        let productsByFieldFound = allProducts.filter(someProducts => someProducts[field] == text);
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

    // EDITAR UN PRODUCTO YA EXISTENTE EN LA BASE DE DATOS
    update: function(productData, id){
        let allProducts = this.findAll();
        let updateProduct = this.findByPk(id);
        updateProduct = {
            ...productData
        }
        let removeProduct = allProducts.filter(oneProduct => oneProduct.id != id);
        removeProduct.push(updateProduct);
        fs.writeFileSync(this.productsDataBase, JSON.stringify(removeProduct, null, 2));
        return updateProduct;
    },

    // ELIMINAR PRODUCTO EN LA BASE DE DATOS
    delete: function(id){
        let allProducts = this.findAll();
        let finalProduct = allProducts.filter(oneProduct => oneProduct.id != id);
        fs.writeFileSync(this.productsDataBase, JSON.stringify(finalProduct, null, 2));
    }
}

module.exports = products;