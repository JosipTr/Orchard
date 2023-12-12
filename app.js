const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");

const router = require("./routes/index");
const errorController = require("./controllers/error");
const middleware = require("./middleware/index");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());



app.use(middleware.authMiddleware);

app.use(router.homeRouter);
app.use(router.authRouter);
app.use(router.productsRouter);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(3000);
