const { body } = require("express-validator");
const path = require("path");

const validaciones = [
  //validaciones de register
  body("firstName")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()

    .isAlpha() //que solo sean caracteres alfabeticos
    .withMessage("El nombre solo acepta caracteres alfabeticos"),

  body("lastName")
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .bail()

    .isAlpha() //que solo sean caracteres alfabeticos
    .withMessage("El apellido solo acepta caracteres alfabeticos"),

  body("userName")
    .notEmpty()
    .withMessage("El usuario no puede estar vacio")
    .bail()

    .isAlphanumeric()
    .withMessage("El usuario debe contener caracteres alfanumericos")
    .bail()

    .isLength({ max: 13 })
    .withMessage("El usuario no debe contener mas de 13 caracteres"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .bail(),

  body("passwordConfirm")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .bail(),

  body("email")
    .notEmpty()
    .withMessage("El mail no puede estar vacio")
    .bail()

    .isEmail()
    .withMessage("Formato de Email invalido"),

  body("img").custom((value, { req }) => {
    let file = req.file;

    let acceptedExtensions = [".jpg", ".png", ".jpeg"];

    if (!file) {
      //cuando no el usuario no cargo la imagen de perfil
      //no muestra error de validacion ya que estipula que si el usuario no cargo imagen de perfil se cargue la que esta por default(usuario.jpeg)
      // throw new Error('Tienes que subir una imagen de perfil');
    } else {
      //cuando el usuario si cargo la imagen de perfil

      let fileExtension = path.extname(file.originalname);
      console.log(fileExtension);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Los formatos de imagen permitidos son:  " + acceptedExtensions
        );
      }
    }

    return true;
  }),
];

module.exports = validaciones;
