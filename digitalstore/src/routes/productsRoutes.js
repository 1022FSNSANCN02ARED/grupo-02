const {Router} = require("express");
const router = Router();

//validaciones para el formulario de agregar producto
const validacionesProductos = require("../middlewares/productsValidations");

const productsController = require('../controllers/productsController');

const path = require('path');


const multer  = require('multer');

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
router.get("/", productsController.listProducts);
router.post("/", productsController.filterProducts);
//muestra form de agregar producto

router.get("/add", productsController.addProductsForm);

router.get("/delete/:id", productsController.deleteProduct);
router.post("/destroy/:id", productsController.destroyProduct);

router.get("/edit/:id", productsController.editProduct);
router.post("/update/:id", productsController.updateProduct);

//procesa formulario de agregar producto
router.post(
  "/add",
  upload.single("image"),
  validacionesProductos, productsController.addProducts
);


module.exports = router