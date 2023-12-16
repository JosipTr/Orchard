const express = require("express");

const controller = require("../controllers/auth");
const userMiddleware = require("../middleware/user");
const cartMiddleware = require("../middleware/cart");
const router = express.Router();

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.get("/logout", controller.getLogout);

router.post("/login", userMiddleware, cartMiddleware, controller.postLogin);
router.post("/register", controller.postRegister);

module.exports = router;
