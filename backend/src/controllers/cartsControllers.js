const UserModel = require("../models/UserModel")





// Add to CartData
exports.addCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await UserModel.findByIdAndUpdate(userId, {cartData})
        return res.status(201).json({success: true, message: ' Cart Added Successfull.'})

    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, message: error.message})
    }
}


// Update to Cart
exports.updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await UserModel.findByIdAndUpdate(userId, {cartData})
        return res.status(201).json({success: true, message: ' Cart Updated Successfull.'})

    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, message: error.message})
    }
}


// Get user Cart

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        return res.status(201).json({success: true, cartData})

    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, message: error.message})
    }
}