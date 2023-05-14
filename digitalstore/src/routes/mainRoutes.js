const {Router} = require("express");
const router = Router();
const mainController = require("../controllers/main-controller");
const guestMiddleware = require ('../middlewares/guestMiddleware');


router.get("/", mainController.index);
router.get("/register", guestMiddleware, mainController.register);
router.get("/login", mainController.login);
router.get("/ayuda", mainController.ayuda);
router.get("/contacto", mainController.contacto);

const productsRoutes = require('./productsRoutes');
router.use("/products", productsRoutes);

//agregar la ruta hacia /users
const usersRoutes = require('./usersRoutes');
router.use("/users", usersRoutes);

//agrega la ruta hacia /carrito
const cartRoutes = require('./cartRoutes');
router.use("/carrito", cartRoutes);

//agrega la ruta hacia /favorites
const favRoutes = require('./favRoutes');
router.use("/favorites", favRoutes);

//api usuarios//
const apiUserRouter = require('./api/userRoutes.js');
router.use("/api/users",apiUserRouter);
module.exports = router;

//api productos//
const apiProductRouter = require("./api/productRoutes.js");
router.use("/api/products", apiProductRouter);
module.exports = router;


