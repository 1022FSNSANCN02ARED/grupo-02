const{body} =require('express-validator');

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

module.exports = validacionesLogin;
