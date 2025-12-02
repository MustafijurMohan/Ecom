require('dotenv').config({quiet: true})
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY



exports.authVerifyMiddleware = async (req, res, next) => {
    const Token = req.headers['token']
    if(!Token) {
        res.status(401).json({success: false, message: 'Unauthorized!!'})
    }

    try {
        const token_decoded = jwt.verify(Token, secretKey)
        req.body.userId = token_decoded.id
        next()
    } catch (error) {
        res.status(401).json({success: false, message: 'Unauthorized!!'})
    }

}




