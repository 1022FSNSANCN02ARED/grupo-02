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
        res.render("listProducts")
    },
    addProductsForm: (req,res)=>{
        res.render("agregarProducto")
    },
    addProducts: (req,res)=>{
        const product = {
            id:Date.now(),
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            categoria:req.body.categoria,
            img:"default-img.png",
            oferta:false,
            porcentaje:req.body.porcentaje
        }
        res.send(product)
    }
    
}