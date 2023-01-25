const products = require('../products/products');

module.exports={
    products: (req,res)=>{
        const id = req.params.id;
        const allProducts = products.getProducts();
        const producto = allProducts.find((obj) => obj.id==id)
        res.render("producto",{
            producto
        })
    },
    listProducts: (req,res)=>{
        const allProducts= products.getProducts()
        res.render("listProducts",{
            allProducts,
        })
    },
    addProductsForm: (req,res)=>{
        res.render("agregarProducto")
    },
    addProducts: (req,res)=>{
        if(!req.body) {
            return res.status(400).json({error: 'No hay datos'});
        }
        const product = {
            id:Date.now(),
            nombre:req.body.nombre,
            precio:Number(req.body.precio),
            categoria:req.body.categoria,
            image:req.file ? req.file.filename:"default-img.png",
            descripcion:req.body.descripcion,
            oferta:Number(req.body.descuento) != 0 ? true:false,
            descuento:Number(req.body.descuento)
        }
        
        products.saveProduct(product);
        res.redirect("/products");
    }
}