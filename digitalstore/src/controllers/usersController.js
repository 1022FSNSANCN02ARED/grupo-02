const { getUsers } = require('../data/users');
const users = require('../data/users'); //requiero el array de usuarios parseado
const products = require('../data/products');

module.exports={

  addUsersForm: (req,res)=>{
      res.render("register")
  },
  addUsers: (req,res)=>{
    //agrego usuario
    if (!req.body) {
      return res.status(400).json({ error: "No hay datos" }); //campos sin completar
    }
    const user = { //sino que guarde en el array
      id: Date.now(),
      name: req.body.nombre,
      last_name: req.body.apellido,
      email: req.body.email,
      usuario: req.body.usuario,
      password: req.body.contraseña,
    };

    users.saveUser(user);
    res.send("USUARIO REGISTRADO");

  },
  listUsers: (req,res)=>{
    const allUsers = users.getUsers();
    res.render("panelDeControl", {allUsers,});
  },
  userCarrito: (req,res)=>{

    const allUsers = users.getUsers(); 
    const listProducts = products.getProducts();

    const user = allUsers.find((e) => e.id == req.params.id);
    const userCarrito = user.saveCarrito;

    const carrito = listProducts.filter(obj => {
      for (let x = 0; x < userCarrito.length; x++) {
        if(userCarrito[x]==obj.id){
          return obj;
        }
      }
    })
    res.render("carrito", {
      carrito,
    });
  }
}