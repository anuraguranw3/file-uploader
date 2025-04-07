const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const passport = require("passport");
const session = require("express-session");
const loginRouter = require("./routes/loginRouter");
const flash = require("connect-flash");
const logOutRouter = require("./routes/logOutRouter");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const createFolderRouter = require("./routes/createFolderRouter");
const folderRouter = require("./routes/folderRouter");
const imageRouter = require("./routes/imageRouter");
const methodOverride = require('method-override'); 

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(methodOverride('_method'));

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session(
    {
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    }
));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logOutRouter);

app.use("/create-folder", createFolderRouter);
app.use("/folder", folderRouter);

app.use("/image", imageRouter);

app.use((err, req, res, next) => {
    console.error("Global Error Handler: ", err.stack);
    res.status(500).send("Something went wrong");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});