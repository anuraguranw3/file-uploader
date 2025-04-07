const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("image uploaded on cloudinary");
        console.log("url ", response.url, " id ", response.public_id);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (err) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteImageCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted:', result);
        return result;
      } catch (error) {
        console.error('Error deleting image:', error);
        return null;
      }
};

module.exports = {
    uploadOnCloudinary,
    deleteImageCloudinary
};