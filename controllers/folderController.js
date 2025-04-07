const prisma = require("../models/prismaClient");

const folderController = async (req, res) => {
    const folderId = parseInt(req.params.id);
    try {
        const folder = await prisma.folder.findUnique({
            where: { id: folderId },
            include: { images: true },
        });
        if (!folder) {
            return res.status(404).send("Folder not found");
        }
        res.render("folder", { folder, images: folder.images });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
    }
}

const renameFolderPostController = async (req, res) => {
    const folderId = parseInt(req.params.id);
    const { newName } = req.body;
    try {
        await prisma.folder.update({
            where: { id: folderId },
            data: { name: newName }
        });
        res.redirect(`/folder/${folderId}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong while trying to rename the folder");
    }
}

const deleteFolderPostController = async (req, res) => {
    const folderId = parseInt(req.params.id);
    try {
        await prisma.folder.delete({
            where: {id: folderId}
        });
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occured while deleting the folder");
    }
};

module.exports = {
    folderController,
    renameFolderPostController,
    deleteFolderPostController,
};