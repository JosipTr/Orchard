const express = require("express");

const router = require("./routes/index");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(router.homeRouter);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(3000);
