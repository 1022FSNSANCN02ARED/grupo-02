const {Router} = require("express");
const router = Router();
const favController = require ("../controllers/favController")

router.get ("/", favController.list)
router.post("/add/:id", favController.addProductToFav)

router.post ("/favorites/delete/:id", favController.clearProductFromFav);
router.post ("/favorites/clear/", favController.clearAllFavs);

module.exports = router;