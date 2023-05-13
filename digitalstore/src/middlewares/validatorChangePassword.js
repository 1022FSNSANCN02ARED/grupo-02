const{body} =require('express-validator');

const validacionesChangePass = [
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacio"),
  
  body("newPass1")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacio"),
    
  body("newPass")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacio"),
]

module.exports = validacionesChangePass;
