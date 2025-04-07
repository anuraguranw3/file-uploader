const { Router } = require("express");
const upload = require("../middlewares/multer.middleware");
const { uploadImagePostController, deleteImageController, downloadImageController } = require("../controllers/imageController");

const imageRouter = Router();


imageRouter.post("/upload", upload.single('image'), uploadImagePostController);
imageRouter.delete("/delete/:id", deleteImageController);
imageRouter.get("/download/:id", downloadImageController);


module.exports = imageRouter;