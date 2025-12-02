require('dotenv').config({quiet: true})
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD


exports.adminAuthMiddleware = async(req, res, next) => {
    try {
        const token = req.headers['token']

        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return res.status(401).json({success: false, message: 'Unauthorized'})
            } else {
                // res.json({decode})
                next()
            }
        })
    } catch (error) {
        return res.status(401).json({success: false, message: 'Unauthorized'})
    }
}



// exports.adminAuthMiddleware = async(req, res, next) => {
//     try {
//         const Token = req.headers['token']

//         if(!Token) {
//             return res.status(401).json({success: false, message: 'Unauthorized'})
//         }
        
//         const decode_token = jwt.verify(Token, secretKey)
//         if(decode_token !== adminEmail+adminPassword) {
//             return res.status(401).json({success: false, message: 'Unauthorized'})
//         }
//         next()
        
//     } catch (error) {
//         return res.status(401).json({success: false, message: 'Unauthorized'})
//     }
// }




