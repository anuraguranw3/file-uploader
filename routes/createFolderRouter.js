const { Router } = require("express");
const { createFolderController, createFolderPostController } = require("../controllers/createFolderController");

const createFolderRouter = Router();

createFolderRouter.get("/", createFolderController);
createFolderRouter.post("/", createFolderPostController);

module.exports = createFolderRouter;