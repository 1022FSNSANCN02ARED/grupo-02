const {Router} = require("express");
const router = Router();

const productsController = require('../controllers/productsController');

router.get("/:id", productsController.products);
router.get("/", productsController.listProducts);
router.get("/:id/edit", productsController.addProducts);

module.exports = router