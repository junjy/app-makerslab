const mongoose = require('mongoose')
const { StringDecoder } = require('string_decoder')

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
    description: {
        type: String
    }
    // likes: {
    //     type: Boolean,
    //     default: false
    // },
    // likes_count: {
    //     type: Number,
    //     default: 0
    // }
    // product_id: {
    //     type: String,
    //     required: true
    // }
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel