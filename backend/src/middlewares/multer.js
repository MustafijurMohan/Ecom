const multer = require('multer')

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

const uploadMiddleware = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }])
// exports.upload = multer({storage})
// upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}])


module.exports = uploadMiddleware