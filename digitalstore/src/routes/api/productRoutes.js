const express = require("express");
const productController = require("../../controllers/api/productController.js");
const router = express.Router();

router.get("/", productController.list);
router.get("/categories/list", productController.categories);
router.get("/brands/list", productController.brands);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.destroy);
router.get("/:id", productController.detail);
module.exports = router;
