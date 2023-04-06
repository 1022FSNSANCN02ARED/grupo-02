const express = require("express");
const userController = require("../../controllers/api/userController.js");
const router = express.Router();

router.get("/", userController.list);
//router.get("/:id", genresController.detail);
//router.post("/", genresController.create);
module.exports = router;