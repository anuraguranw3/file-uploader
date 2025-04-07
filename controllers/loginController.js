const passport = require("passport");
const localStrategy = require("passport-local");
const prisma = require("../models/prismaClient");
const bcrypt = require("bcryptjs");

passport.use(
    new localStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                return done(null, false, { message: "Invalid user" });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Invalid password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        done(null, user);
    } catch (err) {
        done(err);
    }
});

const loginController = (req, res) => {
    const errorMessage = req.flash("error");
    res.render("login-page", { errorMessage });
};

const loginPostController = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
};

module.exports = {
    loginController,
    loginPostController
};