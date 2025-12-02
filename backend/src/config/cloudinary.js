require('dotenv').config({quiet: true})
const cloudinary  = require('cloudinary').v2
const cloudinaryName = process.env.CLOUDINARY_NAME
const cloudinaryKey = process.env.CLOUDINARY_API_KEY
const cloudinarySecretKey = process.env.CLOUDINARY_SECRET_KEY

exports.connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: cloudinaryName,
        api_key: cloudinaryKey,
        api_secret: cloudinarySecretKey
    })
}
