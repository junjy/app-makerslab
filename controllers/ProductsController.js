const _ = require('lodash'); // generate slug
// const furnitureModel = require('../models/furniture');
const ProductModel = require('../models/products');

const controllers = {
    redirectToMain: (req, res) => {
        res.redirect('/products')
        return

    },

    listProducts: (req, res) => {
        ProductModel.find()
        .then(results => {
            res.render('products/index', {
                pageTitle: "Our Furniture",
                products: results
            })
        })

        // res.render('products/index', {
        //     pageTitle: "List of Goods for Launch",
        //     products: furnitureModel
        // })

    },

    showProduct: (req, res) => {
        let slug = req.params.slug

        ProductModel.findOne({
            slug: slug
        })
            .then(result => {
                if (! result) {
                    res.redirect('/products')
                    return
                }
                res.render('products/show', {
                    pageTitle: result.name,
                    item: result,
                })
            })
            .catch(err => {
                res.send(err)
            })


    //   let itemArrIndex = req.params.id;

    //     // type NaN cannot be equated using ===
    //     // need to use isNaN function to get a bool value for comparison
    //     if (isNaN(parseInt(itemArrIndex))) {
    //         res.send('id must be a number')
    //         return
    //     }

    //     if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
    //         res.redirect('/products')
    //     }

    //     let item = furnitureModel[itemArrIndex];

    //     res.render('products/show', {
    //         pageTitle: "Show Product",
    //         item: item,
    //         itemIndex: itemArrIndex
    //     })

    },

    editProduct: (req, res) => {

        ProductModel.findOne({
            slug: req.params.slug
        })
            .then(result => {
                res.render('products/edit', {
                    pageTitle: "Edit Form for " + result.name,
                    item: result,
                    itemID: result.slug
                })
            })
            .catch(err => {
                res.redirect('/products')
            })

        // let itemArrIndex = req.params.id;

        // if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
        //     res.redirect('/products');
        //     return;
        // }

        // let item = furnitureModel[itemArrIndex];

        // res.render('products/edit', {
        //     pageTitle: "Edit Form for " + item.name,
        //     item: item,
        //     itemIndex: itemArrIndex
        // });


    },

    updateProduct: (req, res) => {
        const newSlug = _.kebabCase(req.body.name)

        // find the document in DB,
        // to ensure that whatever the user
        // wants to edit, is actually present
        ProductModel.findOne(
            {
                slug: req.params.slug
            }
        )
            .then(result => {

                ProductModel.updateOne(
                    {
                        slug: req.params.slug
                    },
                    {
                        name: req.body.name,
                        slug: newSlug,
                        price: req.body.price,
                        image: req.body.image
                    }
                )
                    .then(updateResult => {
                        res.redirect('/products/' + newSlug)
                    })
                    .catch(err => {
                        console.log(err)
                        res.redirect('/products')
                    })

            })
            .catch(err => {
                console.log(err)
                res.redirect('/products')
            })
        // let itemArrIndex = req.params.id;

        // if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
        //     res.redirect('/products');
        //     return;
        // }

        // furnitureModel[itemArrIndex].name = req.body.name;
        // furnitureModel[itemArrIndex].price = req.body.price;
        // furnitureModel[itemArrIndex].image = req.body.image;
  
        // res.redirect('/products/' + itemArrIndex);

    },

    newProduct: (req, res) => {
        res.render('products/new', {
            pageTitle: "Submit New Product"
        })
    },

    createProduct: (req, res) => {
        const slug = _.kebabCase(req.body.name)

        ProductModel.create({
            name: req.body.name,
            slug: slug,
            price: req.body.price,
            image: req.body.image
        })
            .then(result => {
                res.redirect('/products/' + slug)
            })
            .catch(err => {
                console.log(err)
                res.redirect('/products/new')
            })

        // let newItemIndex = furnitureModel.length;

        // furnitureModel.push({
        //     id: newItemIndex + 1,
        //     name: req.body.name,
        //     price: req.body.price,
        //     image: req.body.image
        // })

        // res.redirect('/products/' + newItemIndex);

    },

    deleteProduct: (req, res) => {

        ProductModel.findOne(
            {
                slug: req.params.slug
            }
        )
            .then(result => {

                ProductModel.deleteOne({
                    slug: req.params.slug
                })
                    .then(deleteResult => {
                        res.redirect('/products')
                    })
                    .catch(err => {
                        console.log(err)
                        res.redirect('/products')
                    })

            })
            .catch(err => {
                console.log(err)
                res.redirect('/products')
            })

        // let itemArrIndex = req.params.id;

        // if ( ! checkParamId(itemArrIndex, furnitureModel) ) {
        //     res.redirect('/products');
        //     return;
        // }

        // furnitureModel.splice(itemArrIndex, 1);
        // res.send('deleted product');


    }



}

// function checkParamId(givenID, collection) {
//     if (givenID < 0 || givenID > collection.length - 1) {
//         return false;
//     }
//     return true;
// }

module.exports = controllers;