require('dotenv').config({ quiet: true })
const mongoose = require('mongoose')
const URL = process.env.MONGO_URI


// mongoose.connect(URL)
// .then(() => {
//     console.log(`Database Connection Successfull.`)
// })
// .catch((err) => {
//     console.log(err.message)
// })


exports.connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log(`Database Connection Successfull.`)
    } catch (err) {
        console.log(err.message)
    }
}


