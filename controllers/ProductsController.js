const _ = require('lodash');
const furnitureModel = require('../models/furniture');
const ProductModel = require('../models/products');

const controllers = {
    redirectToMain: (req, res) => {
        res.redirect('/products')
        return

    },

    listProducts: (req, res) => {
        res.render('products/index', {
            pageTitle: "List of Goods for Launch",
            products: furnitureModel
        })
    },

    showProduct: (req, res) => {
      let arrIndex = req.params.id;

        // type NaN cannot be equated using ===
        // need to use isNaN function to get a bool value for comparison
        if (isNaN(parseInt(arrIndex))) {
            res.send('id must be a number')
            return
        }

        if ( ! checkParamId(arrIndex, furnitureModel) ) {
            res.redirect('/products')
        }

        res.render('products/show', {
            pageTitle: "Show Product",
            item: furnitureModel[arrIndex]
        })

    },

    newProduct: (req, res) => {
        res.render('products/new', {
            pageTitle: "Submit New Product"
        })
    },



}

module.exports = controllers;