require('dotenv').config({quiet: true})
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

const UserModel = require('../models/UserModel')



// create Token

const createToken = (id) => {
    return jwt.sign({id}, secretKey)
}


//  User Register
exports.registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // checking user already exits or not
        const userExists = await UserModel.findOne({email})
        if(userExists) {
            return res.json({success: 'false', message: 'User already exits !!!'})
        }

        // validator email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success: 'false', message: 'Please enter a valid email !!!'})
        }
        
        if(password.length < 8) {
            return res.json({success: 'false', message: 'Please enter a strong password !!!'})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const data = await UserModel.create({name, email, password: hashedPassword})
        const token = createToken(data._id)

        return res.status(201).json({success: true,  message: data, token})

    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


// User Login 
exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // checking user exits
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.json({success: 'false', message: "User doesn't exits !!!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
            const token = createToken(user._id)
            return res.status(201).json({success: true,  message: user, token})
        } else {
            return res.status(400).json({success: false,  message: 'Invalid Credentials !!!'})
        }

        
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email+password, secretKey)
            return res.status(200).json({success: true, token, message: 'Admin Login Successfull.'})
        } else {
            return res.status(400).json({success: false, message: 'Invalid Credentials !'})
        }
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}