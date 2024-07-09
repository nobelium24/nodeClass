const cloudinaryConfig = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../constants");

cloudinaryConfig.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

module.exports = cloudinaryConfig
