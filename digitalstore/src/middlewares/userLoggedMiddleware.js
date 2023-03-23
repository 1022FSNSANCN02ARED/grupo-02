const users = require("../data/users"); //requiero el array de usuarios parseado

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail; //tenemos a alguien en una cookie?
  let userFromCookie = users.findByField("email", emailInCookie); //lo pude encontrar de la DB?



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
