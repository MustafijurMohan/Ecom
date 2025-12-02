const express = require('express')
const {registerUser, loginUser, adminLogin} = require('../controllers/userControllers')
const { addProducts, listProducts, removeProducts, singleProducts } = require('../controllers/productControllers')
const uploadMiddleware = require('../middlewares/multer')
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware')
const { addCart, updateCart, getCart } = require('../controllers/cartsControllers')
const { authVerifyMiddleware } = require('../middlewares/authVerifyMiddleware')
const { placeOrderCash, userOrders, allOrders, updateStatus, placeOrderStripe, verifySripe } = require('../controllers/orderControllers')


const router = new express.Router()


// User api
router.post('/register', registerUser)
router.post('/login', loginUser)


// Admin api
router.post('/admin-login', adminLogin)
router.post('/admin-auth', adminAuthMiddleware)


// Products api
router.post('/add-products', uploadMiddleware, adminAuthMiddleware, addProducts)
router.get('/list-products', listProducts)
router.get('/single-products/:id',adminAuthMiddleware, singleProducts)
router.delete('/remove-products/:id',adminAuthMiddleware, removeProducts)


// Carts api
router.post('/add-cart', authVerifyMiddleware, addCart)
router.post('/update-cart', authVerifyMiddleware, updateCart)
router.post('/get-cart', authVerifyMiddleware, getCart)


// Order api 
// Payment Method
router.post('/cash', authVerifyMiddleware, placeOrderCash)
router.post('/stripe', authVerifyMiddleware, placeOrderStripe)
router.post('/verify', authVerifyMiddleware, verifySripe)


// Admin Panel
router.post('/orders-list', adminAuthMiddleware, allOrders)
router.post('/update-status', adminAuthMiddleware, updateStatus)

// user api
router.post('/user-order', authVerifyMiddleware, userOrders)


module.exports = router



