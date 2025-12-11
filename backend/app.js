const express = require('express')
const app = new express()



// Security middleware require
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors')
const hpp = require('hpp')
const { connectCloudinary } = require('./src/config/cloudinary')
const { connectDB } = require('./src/config/database')
const router = require('./src/routes/api')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, token");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Security middleware Implement
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

// Express Implement
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '50mb'}))

// Database Connection
// require('./src/config/database')
connectDB()

// Cloudinary Connection
connectCloudinary()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)



// Managing Backend API Routing
app.use('/api/v1', router)



module.exports = app