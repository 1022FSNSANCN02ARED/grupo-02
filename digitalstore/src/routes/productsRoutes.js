const {Router} = require("express");
const router = Router();

const productsController = require('../controllers/productsController');

router.get("/:id", productsController.products);
router.get("/", productsController.listProducts);

router.get("/add", productsController.addProductsForm);
router.post("/", productsController.addProducts);

module.exports = router