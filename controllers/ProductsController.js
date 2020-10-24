// const ProductModel = require('../models/products');

const controllers = {

    listProducts: (req, res) => {
        res.render('products/index', {
            pageTitle: "List of Products for Launch"
        })

    }



}

module.exports = controllers;