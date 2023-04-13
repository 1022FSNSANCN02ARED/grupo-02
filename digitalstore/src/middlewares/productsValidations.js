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

    .isNumeric({ min: 100 }) //que solo sean caracteres numericos pero a partir de un minimo de 100
    .withMessage(
      "El precio solo acepta caracteres numericos y solo se acepta un minimo de 100"
    ),

  //saque las validaciones a descuento ya que de ser que este vacio se toma como 0 al procesar el form

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
