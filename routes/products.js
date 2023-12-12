const express = require("express");

const controller = require("../controllers/products");

const middleware = require("../middleware/index");

const router = express.Router();

router.get("/products", controller.getProducts);
router.get(
  "/add-product",
  middleware.isAuthMiddleware,
  controller.getAddProduct
);

router.post(
  "/add-product",
  middleware.isAuthMiddleware,
  controller.postAddProduct
);

module.exports = router;
