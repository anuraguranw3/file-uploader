const prisma = require("../models/prismaClient");

const createFolderController = (req, res) => {
    res.render("create-folder-page");
};

const createFolderPostController = async (req, res) => {
    try {
        const { name } = req.body;

        await prisma.folder.create({
            data: {
                name: name,
                userId: req.user.id
            }
        })
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
};

module.exports = {
    createFolderController,
    createFolderPostController
};