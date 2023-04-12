const express = require("express");
const userController = require("../../controllers/api/userController.js");
const router = express.Router();

router.get("/", userController.list);
router.get("/:id", userController.detail);

module.exports = router;