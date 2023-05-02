const express = require("express");
const productController = require("../../controllers/api/productController.js");
const router = express.Router();

router.get("/", productController.list);
router.get("/:id", productController.detail);

module.exports = router;
