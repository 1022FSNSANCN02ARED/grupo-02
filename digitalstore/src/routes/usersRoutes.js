//const{body} =require('express-validator');//requerimos validator
const { Router } = require("express");
const router = Router();
const path = require ('path');
const { body } = require("express-validator");

const usersController = require("../controllers/usersController");
const multer = require('multer');
const validaciones = require("../middlewares/validator");
const validacionesLogin = require("../middlewares/validatorLogin");

const storage = multer.diskStorage({

    destination: path.join(__dirname,"../../public/img/usuarios"),
    
    filename:(req, file, cb) => {
      cb(null, "image-" + Date.now() + path.extname(file.originalname));
     
    },

});

const upload = multer({
  storage,
})

//evaluaciones en el login
/*
const validacionesLogin = [
    body("emailLogin")
    .notEmpty()
    .withMessage("El mail no puede estar vacio")
    .bail()

    .isEmail()
    .withMessage("Formato de Email invalido"),

  body("passwordLogin")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacio"),

 

]

module.exports =validacionesLogin;
*/
//ESPECIFICAR RUTAS>

router.get("/add", usersController.addUsersForm); //ruta del formulario para crear  ussuario
router.post("/add", upload.single('avatar'), validaciones,  usersController.addUsers);//ruta del procesamiento de formulario de creacion

//formulario de login
router.get ('/login', usersController.login);

//procesamiento de login
router.post ('/login', validacionesLogin, usersController.loginProcess);

router.get("/panel", usersController.listUsers);

router.get("/:id/carrito", usersController.userCarrito);

router.get("/panel/:id", usersController.deleteUser);
router.post("/panel/:id", usersController.destroyUser);

module.exports = router;
