const {Router} = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

router.get("/", mainController.index);
router.get("/register", mainController.register);
router.get("/login", mainController.login);
router.get("/ayuda", mainController.ayuda);
router.get("/contacto", mainController.contacto);
router.get("/productos/:id", mainController.producto);
router.get("/lista-producto", mainController.listaProducto);
router.get("/carrito", mainController.carrito);

module.exports = router;