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
    addProducts: (req,res)=>{
        res.render("agregarProducto")
    }
}