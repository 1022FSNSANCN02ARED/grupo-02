const {Router} = require("express");
const router = Router();
const cartController = require ("../controllers/cartController")

router.get ("/", cartController.list)
router.post("/add/:id", cartController.addProductToCart)
router.post("/remove/:id", cartController.decreaseProductToCart)

router.post ("/carrito/delete/:id", cartController.clearProductFromCart);
router.post ("/carrito/clear/", cartController.clearCart);

module.exports = router;