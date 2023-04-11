const { fn } = require('sequelize');
const products = require('../data/products');
const db = require('../database/models');
const {Op} = require('sequelize')

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
    listProducts: async (req, res) => {
        const productos = await db.Product.findAll({include: ['brand' ,'category']})
        const categorias = await db.Category.findAll();
        const brands = await db.Brand.findAll();
        res.render("listProducts",{
            productos,
            categorias,
            brands
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
    filterProducts: async (req,res) => {
        const categorias = await db.Category.findAll();
        const brands = await db.Brand.findAll();
        const filter = req.body;
        let productos=[]
        if(Object.entries(filter).length >0){
            const props = Object.entries(filter).map((prop)=>{
                return prop[0];
            })
            //separar si tiene on de oferta 

            const cat = await db.Category.findAll({
                where:{
                    name:{ [Op.or]:
                        props
                    }
                }
            })
            const marca = await db.Brand.findAll({
                where:{
                    name:{ [Op.or]:
                        props
                    }
                }
            })
    
            if(marca){
                var brand = marca[0].dataValues.id
            }
            if (cat){
                var catego = cat[0].dataValues.id
            }
           
           

            if(props[0]!="on"){
                productos = await db.Product.findAll({
                    include: ['brand' ,'category'],
                    where:{
                        idCategory: catego,
                        idBrand: brand,//{
                           // [Op.or]: //props
                       // }
                    }
                });
            }else{
                props.shift();
                productos = await db.Product.findAll({
                    include: ['brand' ,'category'],
                    where:{
                        
                        idCategory: catego,
                        idBrand: brand,
                        /*
                        idCategory:{
                            [Op.or]:props
                        },*/
                        discount:{
                            [Op.gt]:0
                        }
                    }
                })
            }

            res.render('listProducts', {
                productos,
                categorias,
                brands
            })
        }
        else{
            res.render('listProducts', {
                productos,
                categorias,
                brands
            })
        }
        
    }
}


