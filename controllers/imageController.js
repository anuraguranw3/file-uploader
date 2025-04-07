const http = require('http');
const fs = require('fs');
const { uploadOnCloudinary, deleteImageCloudinary } = require("../fileUpload/cloudinary");
const prisma = require("../models/prismaClient");


const uploadImagePostController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const response = await uploadOnCloudinary(req.file.path);

        if (!response || !response.url) {
            return res.status(500).send("Failed to upload image.");
        }

        console.log("Cloudinary URL: ", response.url);
        const { folderId } = req.body;
        const savedImage = await prisma.image.create({
            data: {
                filename: req.file.originalname,
                url: response.url,
                folderId: parseInt(folderId),
            }
        });
        console.log("Image saved in database: ", savedImage);
        res.redirect(`/folder/${folderId}`);

    } catch (err) {
        console.error("Error uploading fil: ", err);
        res.status(500).send("Something went wrong while uploading the file");
    }
};

const deleteImageController = async (req, res) => {
    const { id } = req.params;

    try {

        const image = await prisma.image.findUnique({
            where: { id: parseInt(id) }
        });

        if (!image) {
            return res.status(404).send('Image not found');
        }

        const regex = /\/v\d+\/(.*?)\./;
        const match = image.url.match(regex);
        if (!match) {
            return res.status(500).send('Invalid Cloudinary URL, public_id not found');
        }
        const publicId = match[1];


        const cloudinaryResult = await deleteImageCloudinary(publicId);

        if (!cloudinaryResult) {
            return res.status(500).send('Error deleting image from Cloudinary');
        }

        await prisma.image.delete({
            where: { id: parseInt(id) }
        });
        res.redirect(`/folder/${image.folderId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting image');
    };
};



const downloadImageController = async (req, res) => {
    const { id } = req.params;

    try {  
        const image = await prisma.image.findUnique({
            where: { id: parseInt(id) }
        });

        if (!image) {
            return res.status(404).send('Image not found');
        }

        const imageUrl = image.url;

        http.get(imageUrl, (imageResponse) => {
            if (imageResponse.statusCode === 200) {
                res.setHeader('Content-Type', imageResponse.headers['content-type']);
                res.setHeader('Content-Disposition', 'attachment; filename=' + image.filename);
                
                imageResponse.pipe(res);
            } else {
                res.status(500).send('Failed to fetch the image');
            }
        }).on('error', (err) => {
            console.error(err);
            res.status(500).send('Error downloading image');
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing download request');
    }
};


module.exports = {
    uploadImagePostController,
    deleteImageController,
    downloadImageController
};