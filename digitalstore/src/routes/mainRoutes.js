const {Router} = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");

router.get("/", mainController.index);
router.get("/register", mainController.register);
router.get("/login", mainController.login);
router.get("/ayuda", mainController.ayuda);
router.get("/contacto", mainController.contacto);
router.get("/carrito", mainController.carrito);
router.get("/oferta", mainController.oferta);
router.get("/teclados", mainController.teclados);


const productsRoutes = require('./productsRoutes');
router.use("/products", productsRoutes);
//agregar la ruta hacia /users
router.use("/users",usersRoutes)// marco que enrutador atendera /users

module.exports = router;