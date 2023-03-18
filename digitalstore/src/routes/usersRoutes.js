//const{body} =require('express-validator');//requerimos validator
const { Router } = require("express");
const router = Router();
const path = require ('path');

const usersController = require("../controllers/usersController");
const multer = require('multer');
const validaciones = require("../middlewares/validator");


const storage = multer.diskStorage({



    destination: path.join(__dirname,"../../public/img/usuarios"),
    

    filename:(req, file, cb) => {
      cb(null, "image-" + Date.now() + path.extname(file.originalname));
     
    },

});

const upload = multer({
  storage,
})

/*
const validaciones = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()

    .isAlpha() //que solo sean caracteres alfabeticos
    .withMessage("El nombre solo acepta caracteres alfabeticos"),

  body("apellido")
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .bail()

    .isAlpha() //que solo sean caracteres alfabeticos
    .withMessage("El apellido solo acepta caracteres alfabeticos"),

  body("usuario")
    .notEmpty()
    .withMessage("El usuario no puede estar vacio")
    .bail()

    .isAlphanumeric()
    .withMessage("El usuario debe contener caracteres alfanumericos"),

  body("email")
    .notEmpty()
    .withMessage("El mail no puede estar vacio")
    .bail()

    .isEmail()
    .withMessage("Formato de Email invalido"),

  body("imageuser").custom((value, { req }) => {

    let file = req.file;

    let acceptedExtensions = ['.jpg', '.png'];

    if (!file) {//cuando no el usuario no cargo la imagen de perfil

      throw new Error('Tienes que subir una imagen de perfil');
    } else {//cuando el usuario si cargo la imagen de perfil

    let fileExtension = path.extname(file.originalname);
    console.log(fileExtension);
    if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(
              "Los formatos de imagen permitidos son:  " + acceptedExtensions
            );
            

    }

    }

    return true;

  })

]
*/


//ESPECIFICAR RUTAS>

router.get("/add", usersController.addUsersForm); //ruta del formulario para crear  ussuario
router.post("/add", upload.single('avatar'), validaciones,  usersController.addUsers);//ruta del procesamiento de formulario de creacion

router.get("/panel", usersController.listUsers);

router.get("/:id/carrito", usersController.userCarrito);

router.get("/panel/:id", usersController.deleteUser);
router.post("/panel/:id", usersController.destroyUser);

module.exports = router;
