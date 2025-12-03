
require('dotenv').config({ quiet: true })
const app = require('./app')
const PORT = process.env.PORT || 4000
const HOSTNAME = "0.0.0.0"


// Home Page Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello Everyone! This is MERN Stack Ecommerce Project With GreatStack.')
})

// Undifine Routes
app.use((req, res) => {
    res.status(404).send(' 404 !!! Page not found.')
})

// Server Error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Server Running
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running Successfull at http://${HOSTNAME}:${PORT}`)
})


