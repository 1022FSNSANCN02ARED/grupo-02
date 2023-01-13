const {Router} = require("express");
const mainController = require("../controllers/main-controller");
const router = Router();

router.get("/", mainController.index);

module.exports = router;