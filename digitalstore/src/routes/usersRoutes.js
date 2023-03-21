const { Router } = require("express");
const router = Router();
const path = require ('path');
//requerimos los metodos del controlador usuario.
const usersController = require("../controllers/usersController");
const multer = require('multer');
//validacion de formulario-usuario
const validaciones = require("../middlewares/validator");
//evaluaciones en el login
const validacionesLogin = require("../middlewares/validatorLogin");
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const storage = multer.diskStorage({

    destination: path.join(__dirname,"../../public/img/usuarios"),
    
    filename:(req, file, cb) => {
      cb(null, "image-" + Date.now() + path.extname(file.originalname));
     
    },

});

const upload = multer({
  storage,
})

//ESPECIFICAR RUTAS>

router.get("/add", usersController.addUsersForm); //ruta del formulario para crear  ussuario
router.post("/add", upload.single('avatar'), validaciones,  usersController.addUsers);//ruta del procesamiento de formulario de creacion

//formulario de login
router.get ('/login', guestMiddleware,usersController.login);

//procesamiento de login
router.post ('/login', validacionesLogin, usersController.loginProcess);

router.get("/panel", usersController.listUsers);
router.get('/profile/', authMiddleware, usersController.profile);

router.get("/:id/carrito", usersController.userCarrito);

router.get("/panel/:id", usersController.deleteUser);
router.post("/panel/:id", usersController.destroyUser);

module.exports = router;
