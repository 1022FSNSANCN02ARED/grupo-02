const {Router} = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");
const guestMiddleware = require ('../middlewares/guestMiddleware');


router.get("/", mainController.index);
router.get("/register", guestMiddleware, mainController.register);
router.get("/login", mainController.login);
router.get("/ayuda", mainController.ayuda);
router.get("/contacto", mainController.contacto);
router.get("/carrito", mainController.carrito);
router.get("/oferta", mainController.oferta);

const productsRoutes = require('./productsRoutes');
router.use("/products", productsRoutes);

//agregar la ruta hacia /users
const usersRoutes = require('./usersRoutes');
router.use("/users", usersRoutes);

module.exports = router;