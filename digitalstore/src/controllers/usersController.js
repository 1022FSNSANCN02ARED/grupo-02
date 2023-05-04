const { validationResult } = require("express-validator"); //requerimos validator
const bcryptjs = require ('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { getUsers } = require("../data/users");
const users = require("../data/users"); //requiero el array de usuarios parseado
// const products = require("../data/products");


module.exports = {

  list: (req, res) => {
    db.User.findAll({
        include: ['role']
    })
        .then(users => {
            res.render('panelDeControl', {users})
        })
},

addUsersForm: (req, res) => {

    res.render("register");
},

addUsers: async (req, res) => {
    
    let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE (VALIDACIONES DE EXPRESS-VALIDATOR)
       //-----
    if(errores.isEmpty()){
           
    //sino hay errores, pregunto si el email con el que intentan rehistrar existe en la db (validacion a mano). NO DEBE HABER DOS USUARIOS CON UN MISMO EMAIL

    //let userInDB = users.findByField('email',req.body.email);
    let userInDB = await db.User.findAll({
        where: {
          email: req.body.email, 
          }
    });
    
    if (userInDB.length>0) {
        return res.render ('register', {
          errores: {
            email:{
                 msg: 'Este mail ya esta registrado'
            
                }
          },
          old:req.body
        });

    }      
    
    db.User.create(
        {   
            id: Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: bcryptjs.hashSync(req.body.password, 10),
            email: req.body.email,
            idRole: 2, // 2 SERIA USUARIO REGULAR // PODEMOS VER COMO HACER PARA QUE CUANDO EL QUE ESTA LOGEADO ES ADMIN PUEDA ELEGIR.
            img: req.file ? req.file.filename : "usuario.jpeg",
        }
    )
    .then(()=> {
        return res.redirect('/login')})            
    .catch(error => res.send(error))
               
    }else{
     
      //si errores no esta vacio vamos a hacer algo>ACA HAY ERRORES
        res.render("register", {
           errores: errores.mapped(),
           old:req.body
        });
     
    } 
  },

  /*
  addUsersForm: (req, res) => {
   
    res.render("register");
  },

  addUsers: (req, res) => {
   
    let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE (VALIDACIONES DE EXPRESS-VALIDATOR)
       //-----
    if(errores.isEmpty()){
           
    //sino hay errores, pregunto si el email con el que intentan rehistrar existe en la db (validacion a mano). NO DEBE HABER DOS USUARIOS CON UN MISMO EMAIL

    let userInDB = users.findByField('email',req.body.email);

    if (userInDB) {
        return res.render ('register', {
          errores: {

            email:{
                 msg: 'Este mail ya esta registrado'
            
                }
          },
            
          old:req.body
  
        });

    }


      const user = {
        //si la variable esta vacia no hay errores por lo tanto crea el usuario
        id: Date.now(),
        name: req.body.nombre,
        last_name: req.body.apellido,
        email: req.body.email,
        usuario: req.body.usuario,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file ? req.file.filename : "usuario.jpeg",
       
      };

            users.saveUser(user);
            // res.send("USUARIO REGISTRADO");
            res.redirect('/login')
    }else{
     //ACA COMPARTO CON LA VISTA LA VARIABLE ERRORES>
      //si errores no esta vacio vamos a hacer algo>ACA HAY ERRORES
        res.render("register", {
           errores: errores.mapped(),
           old:req.body
        });
     
    } 
  },
*/
  //Lista usuarios cargados en la DB en el panel de control para administradores.
  listUsers: (req, res) => {
    db.User.findAll({
        include: ['role']
    })
        .then(users => {
            res.render('panelDeControl', {users})
        })
},
  /*

  listUsers: (req, res) => {
    const allUsers = users.getUsers();
    res.render("panelDeControl", { allUsers });
  },*/

 
  userCarrito: (req, res) => {
    const allUsers = users.getUsers();
    const listProducts = products.getProducts();

    const user = allUsers.find((e) => e.id == req.params.id);
    const userCarrito = user.saveCarrito;

    const carrito = listProducts.filter((obj) => {
      for (let x = 0; x < userCarrito.length; x++) {
        if (userCarrito[x] == obj.id) {
          return obj;
        }
      }
    });
    res.render("carrito", {
      carrito,
    });
  },

  //CRUD USER

  deleteUser: function (req,res) {
    let userId = req.params.id;
    db.User
    .findByPk(userId)
    .then(user => {
          return res.render("userDelete", {user})})
    .catch(error => res.send(error))   
   },

  destroyUser: function (req,res) {
    let userId = req.params.id;
    db.User
    .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(()=>{
        return res.redirect('/users/panel')})
    .catch(error => res.send(error)) 
  },

  edit: function(req,res) {
    const userId = req.params.id;
    const promUser = db.User.findByPk(userId,{include: ['role']});
    const promRole= db.Role.findAll();
    Promise
    .all([promUser, promRole])
    .then(([user, role]) => {
        return res.render("userEdit", {user,role})
        
    })
    .catch(error => res.send(error));
    
},

update: function (req,res) {
    const userId = req.params.id;
    db.User.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.usuario,
            email: req.body.email,
            idRole: req.body.role
        },
        {
            where: {id: userId}
        })
        .then(()=> {

            return res.redirect('/users/panel')})            
        .catch(error => res.send(error))
},
  /*
  deleteUser: (req, res) => {
    const id = req.params.id;
    const idNum= Number(id); 
    const user = users.findByField("id", idNum);
    res.render("userDelete", {user
      }
    )
  },*/

 /*
  destroyUser: (req, res) => {
    const id = req.params.id;
    const idNum= Number(id); 
    users.deleteUser(idNum);
    const allUsers = users.getUsers();
    res.render("panelDeControl", {allUsers})
   },*/

   login: (req, res) => { 
   
      return  res.render('login');
    },
  loginProcess: async (req, res) => {
      //console.log(req.body); 
      let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE (VALIDACIONES DE EXPRESS-VALIDATOR)
         //-----
      if(errores.isEmpty()){
        // si errores esta vacio
        //si los campos del form fueron completados, busco en los modelos  de DB el email que se ingreso en el body del request (form)
              
  
        let user = await db.User.findAll({
            where: {
              email: req.body.email, 
              }
        });
        const userToLogin = user[0].dataValues;
        // res.send (userToLogin)
        if (userToLogin) {// si el usuario buscado existe en la DB
        // res.send (userToLogin)

            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password); //comparo si la contraseña ingresada en el req.body de password es ugual a la que se encontro en la DB >> ME DEVUELVE TRUE O FALSE
  
            if (isOkThePassword){
              delete userToLogin.password;
                      req.session.userLogged = userToLogin;
  
                      if(req.body.remember_user) {
                        console.log("entro")
					    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				    }
              // return res.send ('OK, puedes ingresar')
              //redirijo al panel de control del usuario logueado
              delete userToLogin.password;
              req.session.userLogged = userToLogin;
                      
              //si el usuario quiere recordar el usuario creo la cookie guardando el email
              if (req.body.remember) {
                res.cookie("userEmail", req.body.emailLogin, {maxAge: (1000 * 60) * 2});
              }
  
              return res.redirect("/users/profile");
              }
              return res.render("login", {
                errores: {
                  password: {
                    msg: "La contraseña es incorrecta",
                  },
                },
            });
  
        }
        //SI NO EXISTE MUESTRO UN MENS EN EL RESPONSE (se valida manualmente )Y REDIRIJO AL LOGIN
  
              return res.render('login', {
                errores: {
                    email: {
                      msg: 'No se encuentra este email en nuestra base de datos',
                         old: req.body,
                    }
                }
              });
  
  
      } else {
            res.render("login", {
            errores: errores.mapped(),
            old: req.body,
      });
  
  
     }
  
  },
  /*
   loginProcess: (req, res) => {
     
    let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE (VALIDACIONES DE EXPRESS-VALIDATOR)
       //-----
    if(errores.isEmpty()){
      // si errores esta vacio
      //si los campos del form fueron completados, busco en los modelos  de DB el email que se ingreso en el body del request (form)
            

      let userToLogin = users.findByField("email", req.body.emailLogin);
      // res.send (userToLogin)
      if (userToLogin) {// si el usuario buscado existe en la DB
      // res.send (userToLogin)
          let isOkThePassword =bcryptjs.compareSync(req.body.passwordLogin, userToLogin.password); //comparo si la contraseña ingresada en el req.body de password es ugual a la que se encontro en la DB >> ME DEVUELVE TRUE O FALSE

          if (isOkThePassword){
            delete userToLogin.password; 
				    req.session.userLogged = userToLogin;
          // creo la cookie con el usuario logueado
				    if(req.body.remember_user) {
					    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })// >2 minutos
				    }
            // return res.send ('OK, puedes ingresar')
            //redirijo al panel de control del usuario logueado
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            // console.log (req.session)
         
            //si el usuario quiere recordar el usuario creo la cookie guardando el email
            if (req.body.remember) {
              res.cookie("userEmail", req.body.emailLogin, {maxAge: (1000 * 60) * 2});
            }

            return res.redirect("/");
          }
          return res.render("login", {
              errores: {
                passwordLogin: {
                  msg: "La contraseña es incorrecta",
                },
              },
          });

      }
      //SI NO EXISTE MUESTRO UN MENS EN EL RESPONSE (se valida manualmente )Y REDIRIJO AL LOGIN

            return res.render('login', {
              errores: {
                  emailLogin: {
                    msg: 'No se encuentra este email en nuestra base de datos',
                       old: req.body,
                  }
              }
            });


    } else {
          res.render("login", {
          errores: errores.mapped(),
          old: req.body,
    });


   }

},*/
profile: (req, res) => {
  return res.render('profile', {
    user: req.session.userLogged
  });
},
logout: (req, res) => {
  res.clearCookie('userEmail');
  req.session.destroy();
  return res.redirect('/');
}
}
