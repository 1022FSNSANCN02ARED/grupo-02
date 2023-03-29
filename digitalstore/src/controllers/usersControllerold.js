const { validationResult } = require("express-validator"); //requerimos validator
const bcryptjs = require ('bcryptjs');

const { getUsers } = require("../data/users");
const users = require("../data/users"); //requiero el array de usuarios parseado
// const products = require("../data/products");


module.exports = {
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
     
      //si errores no esta vacio vamos a hacer algo>ACA HAY ERRORES
        res.render("register", {
           errores: errores.mapped(),
           old:req.body
        });
     
    } 
  },
  listUsers: (req, res) => {
    const allUsers = users.getUsers();
    res.render("panelDeControl", { allUsers });
  },
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
  deleteUser: (req, res) => {
    const id = req.params.id;
    const idNum= Number(id); 
    const user = users.findByField("id", idNum);
    res.render("userDelete", {user
      }
    )
  },
  destroyUser: (req, res) => {
    const id = req.params.id;
    const idNum= Number(id); 
    users.deleteUser(idNum);
    const allUsers = users.getUsers();
    res.render("panelDeControl", {allUsers})
   },

   login: (req, res) => { 
   
      return  res.render('login');
    },

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

},
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
