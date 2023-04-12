const { body } = require("express-validator");
const path = require("path");

// validamos el formulario para agregar productos

const validacionesProductos = [
  //validaciones de register
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio")
    .bail(),

  body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .bail()

    .isNumeric() //que solo sean caracteres numericos
    .withMessage("El precio solo acepta caracteres numericos"),

  body("discount")
    .notEmpty()
    .withMessage("El descuento no puede estar vacio")
    .bail()

    .isInt({ min: 0, max: 100 }) //que solo sean caracteres numericos del 0 al 100
    .withMessage("El descuento solo acepta valores de 0 a 100 %"),

  //validamos la imagen que se carga del producto

  body("image").custom((value, { req }) => {
    let file = req.file;

    let acceptedExtensions = [".jpg", ".png", ".jpeg"];

    if (!file) {
      //si no se cargo la imagen del producto no hago nada ya que se carga la imagen de producto por default
      //    throw new Error('Tienes que subir una imagen de perfil');
    } else {
      //cuando el usuario si cargo la imagen del producto

      let fileExtension = path.extname(file.originalname);
      //   console.log(fileExtension);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Los formatos de imagen permitidos son:  " + acceptedExtensions
        );
      }
    }

    return true;
  }),
];

module.exports = validacionesProductos;
