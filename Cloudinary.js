const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_KEY,
    api_secret : process.env.CLOUD_KEY_SECRET,
    upload_presets:{
        large_images:{
            maxFileSize:52428800,
            maxImageWidth:5000,
            maxImageHeight:5000
        }
    }
})

module.exports = cloudinary