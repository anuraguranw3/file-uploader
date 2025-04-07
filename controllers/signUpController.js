const bcrypt = require("bcryptjs");
const prisma = require("../models/prismaClient");

const signUpController = (req, res) => {
    res.render("signup-page");
};

const signUpPostController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }

};

module.exports = {
    signUpController,
    signUpPostController
};