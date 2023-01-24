const {Router} = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

router.get("/", mainController.index);
router.get("/register", mainController.register);
router.get("/login", mainController.login);
router.get("/ayuda", mainController.ayuda);
router.get("/contacto", mainController.contacto);
router.get("/carrito", mainController.carrito);

const productsRoutes = require('./productsRoutes');
router.use("/products", productsRoutes);

module.exports = router;