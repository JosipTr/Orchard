const express = require("express");

const controller = require("../controllers/auth");
const router = express.Router();

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);

module.exports = router;
