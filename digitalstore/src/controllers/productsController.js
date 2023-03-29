const products = require('../data/products');
const db = require('../database/models');

module.exports={
     productDetail: (req,res)=>{

        db.Product.findByPk(req.params.id,{
            include: ['category']
        })
            .then(producto => {
                res.render("producto",{
                    producto,
                })
        })

    },
    /*
    productDetail: (req,res)=>{
        const id = req.params.id;
        const allProducts = products.getProducts();
        const producto = allProducts.find((obj) => obj.id==id)
        res.render("producto",{
            producto
        })
    },*/
    listProducts: (req, res) => {
        db.Product.findAll({
            include: ['brand' ,'category']
        })
            .then(productos => {
                res.render("listProducts",{
                    productos,
                })
    })
    },
    /*
    listProducts: (req,res)=>{
        const listProducts= products.getProducts()
        res.render("listProducts",{
            listProducts,
        })
    },*/
    /*
    addProductsForm: (req,res)=>{
        res.render("agregarProducto")
    },*/
    addProductsForm: (req,res)=>{
        
        const promCategories = db.Category.findAll();
        const promBrands = db.Brand.findAll();
            
        Promise
            .all([promCategories, promBrands])
            .then(([categories, brands]) => {
                return res.render("agregarProducto",{
                    categories, brands
                }) })
            .catch(error => res.send(error))
    },
    addProducts: (req,res)=>{
        if(!req.body) {
            return res.status(400).json({error: 'No hay datos'});
        }
        db.Product.create(
            {   
                id: Date.now(),
                name: req.body.name,
                price: req.body.price,
                idCategory: req.body.idCategory,
                description: req.body.description,
                idBrand: req.body.idBrand,
                image:req.file ? req.file.filename:"default-image.png",
                discount: req.body.discount,
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
       
    },
    /*
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
    },*/
    filterProducts: (req,res) => {

        let listProducts;
        const filter = req.body;
        console.log(Object.entries(filter).length )
        console.log(filter)
        if(Object.entries(filter).length >0){
            listProducts= products.getProductsFilter(filter)
        }
        else{
            listProducts= products.getProducts();
        }
        res.render("listProducts",{
            listProducts,
        }) 
        
    }
}