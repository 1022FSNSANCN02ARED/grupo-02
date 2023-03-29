const{body} =require('express-validator');

const validacionesLogin = [
    body("email")
    .notEmpty()
    .withMessage("El mail no puede estar vacio")
    .bail()

    .isEmail()
    .withMessage("Formato de Email invalido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacio"),

]

module.exports = validacionesLogin;
