const products = require('../products/products');

module.exports={
    productDetail: (req,res)=>{
        const id = req.params.id;
        const allProducts = products.getProducts();
        const producto = allProducts.find((obj) => obj.id==id)
        res.render("producto",{
            producto
        })
    },
    
    listProducts: (req,res)=>{
        const listProducts= products.getProducts()
        res.render("listProducts",{
            listProducts,
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
            img:req.file ? req.file.filename:"default-image.png",
            descripcion:req.body.descripcion,
            oferta:Number(req.body.descuento) != 0 ? true:false,
            descuento:Number(req.body.descuento)
        }
        
        products.saveProduct(product);
        res.redirect("/products");
    },
    filterProducts: (req,res) => {

        let listProducts;
        const filter = req.body;
        if(filter.lenght!=0){
            listProducts= products.getProductsFilter(filter)
        }
        else{
            listProducts= products.getProducts()
        }
        // res.render("listProducts",{
        //     listProducts,
        // }) 
        res.send(listProducts);
        
    }
}