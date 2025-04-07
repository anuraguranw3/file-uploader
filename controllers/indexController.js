const prisma = require("../models/prismaClient");

const indexController = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.render("index", { user: null, folders: [] });
        }

        const folders = await prisma.folder.findMany({
            where: { userId: user.id }
        });
        res.render("index", { user, folders });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }

};

module.exports = {
    indexController,
};