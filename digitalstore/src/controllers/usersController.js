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
    let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE
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
            res.redirect('/')
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
)},
  destroyUser: (req, res) => {
    const id = req.params.id;
    const idNum= Number(id); 
    users.deleteUser(idNum);
    const allUsers = users.getUsers();
    res.render("panelDeControl", {allUsers})
   }
};
