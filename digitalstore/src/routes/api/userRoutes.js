const express = require("express");
const userController = require("../../controllers/api/userController.js");
const router = express.Router();

router.get("/", userController.list);
router.get("/:id", userController.detail);
router.post("/create", userController.create);
router.put("/update/:id",userController.update);
router.delete("/delete/:id",userController.destroy);
module.exports = router;