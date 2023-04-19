const { body } = require("express-validator");
const path = require('path');

module.exports = [
    body('name').notEmpty().withMessage('Escriba un nombre para el producto/servicio'),
    body('description').notEmpty().withMessage('Por favor, escriba una descripción para el producto'),
    body('category').notEmpty().withMessage('Seleccione una categoría para este producto'),
    body('price')
        .notEmpty().withMessage('Ingrese el precio del producto o servicio').bail()
        .isInt({min: 1}).withMessage('Ingrese el precio del producto o servicio en números y sin decimales'),
    body('offer')
        .notEmpty().withMessage('Seleccione si el nuevo producto o servicio tendrá descuento o no').bail()
        .custom((value, { req } ) => {
            if(value == "true" && !req.body.discount){
                throw new Error('Escriba un porcentaje de descuento en el campo anterior; en caso de no ofrecer descuento, seleccione "No"')
            } else if(req.body.discount < 0 && req.body.discount > 100){
                throw new Error('Escriba un porcentaje de descuento entre los valores del 0 al 100%')
            } else {return true}
        })
];