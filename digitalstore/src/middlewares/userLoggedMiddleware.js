const users = require("../data/users"); //requiero el array de usuarios parseado
const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false; //seteo que no tengo ningun usuario en sesion
  
  let emailInCookie = req.cookies.userEmail; //tenemos a alguien en una cookie?
  
  
  //lo pude encontrar de la DB?

  if(emailInCookie){
    var user = await db.User.findAll({
      where: {
        email: emailInCookie, 
      }
    });
    var userFromCookie = user[0].dataValues;
  }
  
  

  if (userFromCookie){// SI ENCONTRE AL USUARIO LO PASO A SESION
    req.session.userLogged = userFromCookie;
  }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
  next();
}

module.exports = userLoggedMiddleware;
