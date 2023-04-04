const {Router} = require("express");
const router = Router();

const productsController = require('../controllers/productsController');

const path = require('path');


const multer  = require('multer');
const { getProductTeclado } = require("../data/products");

const storage= multer.diskStorage({
    destination:path.join(__dirname,"../../public/img/productos"),
    filename:(req,file,cb) =>{
        cb(null,"image-"+Date.now()+path.extname(file.originalname))
    },
});

const upload=multer({
    storage,
})

router.get("/detail/:id", productsController.productDetail);
//router.get("/", productsController.listProducts);
router.get("/", productsController.listProducts);
router.post("/", productsController.filterProducts);

router.get("/add", productsController.addProductsForm);
router.post("/add",upload.single("image"), productsController.addProducts);


module.exports = router