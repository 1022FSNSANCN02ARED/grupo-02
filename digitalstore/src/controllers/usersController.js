const users = require('../data/users'); //requiero el array de usuarios parseado
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
    
      res.redirect("/users");
    },

      

//BUSCAR USUARIO
    /*products.search(product):(req,res)=>{
        //BUSCAR USUARIO
    }*/
}