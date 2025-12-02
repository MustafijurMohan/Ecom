const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required: true},
    bestseller: {type: Boolean},
}, {versionKey: false, timestamps: true})

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel



