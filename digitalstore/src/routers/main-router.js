const {Router} = require("express");
const mainController = require("../controllers/main-controller");
const router = Router();

router.get("/", mainController.index);
router.get("/register", mainController.register);
router.get("/login", mainController.login);
module.exports = router;