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
      let itemArrIndex = req.params.id;

        // type NaN cannot be equated using ===
        // need to use isNaN function to get a bool value for comparison
        if (isNaN(parseInt(itemArrIndex))) {
            res.send('id must be a number')
            return
        }

        if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
            res.redirect('/products')
        }

        let item = furnitureModel[itemArrIndex];

        res.render('products/show', {
            pageTitle: "Show Product",
            item: item,
            itemIndex: itemArrIndex
        })

    },

    editProduct: (req, res) => {
        let itemArrIndex = req.params.id;

        if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
            res.redirect('/products');
            return;
        }

        let item = furnitureModel[itemArrIndex];

        res.render('products/edit', {
            pageTitle: "Edit Form for " + item.name,
            item: item,
            itemIndex: itemArrIndex
        });


    },

    updateProduct: (req, res) => {
        let itemArrIndex = req.params.id;

        if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
            res.redirect('/products');
            return;
        }

        furnitureModel[itemArrIndex].name = req.body.name;
        furnitureModel[itemArrIndex].price = req.body.price;
        furnitureModel[itemArrIndex].image = req.body.image;
  
        res.redirect('/products/' + itemArrIndex);

    },

    newProduct: (req, res) => {
        res.render('products/new', {
            pageTitle: "Submit New Product"
        })
    },

    createProduct: (req, res) => {
        let newItemIndex = furnitureModel.length;

        furnitureModel.push({
            id: newItemIndex + 1,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        })

        res.redirect('/products/' + newItemIndex);

    },

    deleteProduct: (req, res) => {
        let itemArrIndex = req.params.id;

        if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
            res.redirect('/products');
            return;
        }

        furnitureModel.splice(itemArrIndex, 1);
        res.send('deleted product');


    }



}

function checkParamId(givenID, collection) {
    if (givenID < 0 || givenID > collection.length - 1) {
        return false;
    }
    return true;
}

module.exports = controllers;