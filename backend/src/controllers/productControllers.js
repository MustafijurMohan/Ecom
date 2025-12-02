const cloudinary = require('cloudinary')
const ProductModel = require('../models/ProductsModel')



// Add Products
exports.addProducts = async(req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )
        
        const product = {
            name, description, price, image: imagesUrl, category, subCategory, 
            sizes: JSON.parse(sizes), bestseller: bestseller === 'true' ? true : false
        }

        const productData = await ProductModel.create(product)

        return res.status(201).json({success: true, message: 'Products add Successfull.', data: productData})
        
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


// List Products 
exports.listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        return res.status(200).json({success: true, products})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


// Remove Products 
exports.removeProducts = async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        await ProductModel.deleteOne(Query)

        return res.status(200).json({success: true, message: 'Products Delete Successfull.'})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


// Single Products Info
exports.singleProducts =async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}

        const product = await ProductModel.findOne(Query)

        return res.status(200).json({success: true, product})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}