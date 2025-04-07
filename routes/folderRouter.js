const { Router } = require("express");
const { folderController, renameFolderPostController, deleteFolderPostController } = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/:id", folderController);
folderRouter.post("/rename/:id", renameFolderPostController);
folderRouter.post("/delete/:id", deleteFolderPostController);

module.exports = folderRouter;