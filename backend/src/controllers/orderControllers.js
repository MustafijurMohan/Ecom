require('dotenv').config({quiet: true})
const OrderModel = require('../models/OrderModel')
const UserModel = require('../models/UserModel')
const Stripe = require('stripe')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY


const stripe = new Stripe(stripeSecretKey)
const currency = 'usd'
const deliveryCharge = 10


// Payment Method
// Placing Orders using cash on delivary COD Methos
exports.placeOrderCash = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId, items, amount, address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const ordersData = await OrderModel.create(orderData)
        await UserModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, ordersData, message: 'Order Placed'})

    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}


// Placing Orders using cash on delivary Stripe Methos
exports.placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const {origin} = req.headers
        const orderData = {
            userId, items, amount, address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const ordersData = await OrderModel.create(orderData)

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${ordersData._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${ordersData._id}`,
            line_items,
            mode: 'payment'
        })

        res.status(200).json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}

// Verify Stripe
exports.verifySripe = async (req, res) => {
    const {orderId, success, userId} = req.body

    try {
        if(success === 'true') {
            await OrderModel.findByIdAndUpdate(orderId, {payment: true})
            await UserModel.findByIdAndUpdate(userId, {cartData: {}})
            res.status(200).json({success: true})
        } else {
            await OrderModel.findByIdAndDelete(orderId)
            res.status(200).json({success: false})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}


// All Orders Data for Admin Panel
exports.allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: true, message: error.message})
    }
}

// Update Orders Status from Admin Panel
exports.updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await OrderModel.findByIdAndUpdate(orderId, {status})
        res.status(200).json({success: true, message: 'Status Update Successfull.'})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: true, message: error.message})
    }
}

// User Order Data for frontend
exports.userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orderData = await OrderModel.find({userId})
        res.status(200).json({success: true, orderData})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}