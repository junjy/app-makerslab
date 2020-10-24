const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image: String,
    product_id: {
        type: String,
        required: true
    }
    
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel