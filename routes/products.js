const express = require("express");

const controller = require("../controllers/products");

const middleware = require("../middleware/auth");

const router = express.Router();

router.get("/products", controller.getProducts);
router.get(
  "/add-product",
  middleware.checkAuthorization,
  controller.getAddProduct
);

router.post(
  "/add-product",
  middleware.checkAuthorization,
  controller.postAddProduct
);

module.exports = router;
