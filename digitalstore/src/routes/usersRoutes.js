const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");

const path = require("path");

//ESPECIFICAR RUTAS>

router.get("/add", usersController.addUsersForm);
router.post("/add", usersController.addUsers);

router.get("/panel", usersController.listUsers);

router.get("/:id/carrito", usersController.userCarrito);
module.exports = router;
