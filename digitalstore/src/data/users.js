const users = require("./users");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "usersDataBase.json");

module.exports = {
  getUsers() {
    //leer el archivo de usuarios y parsearlo para poder manipularlo

    const usersFileContent = fs.readFileSync(usersFilePath, "utf-8"); // usersFileContent lee el json
    const users = JSON.parse(usersFileContent); //lo convierto a array de o.l
    return users;
  },

  saveUser(user) {
    //guardar un usuario nuevo
    const users = this.getUsers(); //vuelvo  a declarar users para poder trabajar con la variable
    users.push(user); //le empujo el nuevo usuario
    const usersFileContent = JSON.stringify(users, null, 4); //reconvertir el array de o.l de usuarios a json
    fs.writeFileSync(usersFilePath, usersFileContent, "utf-8"); //va a escribir en el json
  },
  updateUse(user) {
    const users = this.getUsers();
    for (let x = 1; x < users.length; x++) {
      if (users[x].id == user.id) {
        users[x].name = user.name;
        users[x].last_name = user.last_name;
        users[x].email = user.email;
        users[x].usuario = user.usuario;
        users[x].password = user.password;
        
      }
    }
    const usersFileContent = JSON.stringify(users, null, 4);
    fs.writeFileSync(usersFilePath, usersFileContent, "utf-8");
  },
  deleteUser(id) {
    const users = this.getUsers();
    const newUsers = users.filter((obj) => obj.id !== id);
    const usersFileContent = JSON.stringify(newUsers, null, 4);
    fs.writeFileSync(usersFilePath, usersFileContent, "utf-8");
  },
  findByField(field, text) {
		let allUsers = this.getUsers();
		let userFound = allUsers.find(
      oneUser => oneUser[field] === text
    );
		return userFound;
	},
};


//console.log (module.exports.findByField("id", 5))