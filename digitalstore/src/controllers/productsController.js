const { validationResult } = require("express-validator"); //requerimos validator

const { fn } = require("sequelize");
// const products = require("../data/products");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  productDetail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ["category"],
    }).then((producto) => {
      res.render("producto", {
        producto,
      });
    });
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
    let off = false
    const categorias = await db.Category.findAll();
    const brands = await db.Brand.findAll();
    let msj = ""
    let productos = []
    console.log(req.query)
    if(req.query.search){
      msj=`No se encontro ningun producto con "${req.query.search}"`
      const search = req.query.search;
      productos = await db.Product.findAll({
        include: ["brand", "category"],
        where: {
          name:{
            [Op.like]:'%'+search+'%'
          }
        },
      })
    }else if(req.query.category){
      msj=`No se encontro ningun producto con la categoria "${req.query.category}"`
      const category = req.query.category;
      if(category == "oferts"){
        msj=`No se encontro ningun producto con Descuento"`
        off = true
        productos = await db.Product.findAll({
          where:{
            discount:{
              [Op.gt]: 0, 
            }
          },
          include: ["brand", "category"],
        })
      }else{
        productos = await db.Product.findAll({
          include: ["brand", "category"],
        })
        console.log(productos[0].category)
        productos = productos.filter((prod) => { return prod.category.name == category })
      }
    }
    else{
      productos = await db.Product.findAll({
        include: ["brand", "category"],
      });
    }
    res.render("listProducts", {
      productos,
      categorias,
      brands,
      off,
      msj
    });
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
  addProductsForm: (req, res) => {
    const promCategories = db.Category.findAll();
    const promBrands = db.Brand.findAll();

    Promise.all([promCategories, promBrands])
      .then(([categories, brands]) => {
        return res.render("agregarProducto", {
          categories,
          brands,
        });
      })
      .catch((error) => res.send(error));
  },

  addProducts: (req, res) => {
    // ver si la linea de la 68 a la 70 se puede eliminar ya que los errores se validan desde el middleware y por ende, frena el procesamiento del form
    // if (!req.body) {
    //   return res.status(400).json({ error: "No hay datos" });
    // }
    //declaro la variable errores

    const promCategories = db.Category.findAll();
    const promBrands = db.Brand.findAll();

    let errores = validationResult(req); //errores es un objeto que guardara los errores del formulario y tiene varias propiedades por ej: isEmpty >DEVUELVE UN BOOLEANO TRUE /FALSE (VALIDACIONES DE EXPRESS-VALIDATOR)
    if (errores.isEmpty()) {
      //si errores esta vacia, osea no hay errores agrega el producto a la db

      db.Product.create({
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        idCategory: req.body.idCategory,
        description: req.body.description,
        idBrand: req.body.idBrand,
        image: req.file ? req.file.filename : "default-image.png",
        discount: req.body.discount,
      })
        .then(() => {
          return res.redirect("/products");
        })
        .catch((error) => res.send(error));
    } else {
      //     //si errores no esta vacio vamos a hacer algo>ACA HAY ERRORES
      /* res.render("agregarProducto", {
        errores: errores.mapped(), //COMPARTO CON LA VISTA LA VARIABLE ERRORES
        old: req.body,
      });*/

      Promise.all([promCategories, promBrands]).then(([categories, brands]) => {
        return res.render("agregarProducto", {
          errores: errores.mapped(), //COMPARTO CON LA VISTA LA VARIABLE ERRORES
          categories,
          brands,
          old: req.body,
        });
      });
    }
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


    deleteProduct: function (req,res) {
      let productId = req.params.id;
      db.Product
      .findByPk(productId,{
        include: ["category"]
      })
      .then(product => {
            return res.render("deleteProduct", {product})})
      .catch(error => res.send(error))   
     },

    destroyProduct: async function (req,res) {
      let productId = req.params.id;
      db.Product
      .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
      .then(()=>{
          return res.redirect('/products')})
      .catch(error => res.send(error)) 
    },
    
    editProduct: async function(req,res) {
      let productId = req.params.id;
      
      const categories = await db.Category.findAll();
      const brands = await db.Brand.findAll();

      db.Product
      .findByPk(productId,{
        include: ["category"]
      })
      .then(product => {
            return res.render("editProduct", {product, categories, brands})})
      .catch(error => res.send(error))   
     },
      
  
  
  updateProduct: function (req,res) {
      const productId = req.params.id;
      db.Product.update(
          {
            name: req.body.firstName,
            idBrand: req.body.idBrand,
            idCategory: req.body.idCategory,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
          },
          {
              where: {id: productId}
          })
          .then(()=> {
              
              return res.redirect('/products')})          
          .catch(error => res.send(error))
  },
  filterProducts: async (req, res) => {
    let off = false
    const categorias = await db.Category.findAll();
    const brands = await db.Brand.findAll();
    const filter = req.body;
    let productos = [];
    if (Object.entries(filter).length > 0) {
      const props = Object.entries(filter).map((prop) => {
        return prop[0];
      });
      //separar si tiene on de oferta
      const cat = await db.Category.findAll({
        where: {
          name: { [Op.or]: props },
        },
      });
      const marca = await db.Brand.findAll({
        where: {
          name: { [Op.or]: props },
        },
      });
      var brand = [];
      var catego = [];
      if (marca) {
        for (let i = 0; i < marca.length; i++) {
          brand[i] = marca[i].dataValues.id;
        }
      } 

      if (cat.length > 0) {
        for (let i = 0; i < cat.length; i++) {
          catego[i] = cat[i].dataValues.id;
        }
      }

      if (props[0] != "off") {
        productos = await db.Product.findAll({
          include: ["brand", "category"],
          where: {
            idCategory: {
              [Op.or]: catego,
            },
            idBrand: {
              [Op.or]: brand,
            }
          },
        });
      } else {
        props.shift();
        off = true
        productos = await db.Product.findAll({
          include: ["brand", "category"],
          where: {
            idCategory: {
              [Op.or]: catego,
            },
            idBrand: {
              [Op.or]: brand,
            },
            discount: {
              [Op.gt]: 0,
            },
          },
        });
      }

      res.render("listProducts", {
        productos,
        categorias,
        brands,
        off,
        msj:"No se encontro ningun producto con su filtro de busqueda, vuelva a realizarla o envíenos su consulta"
      });

    } else {

       productos = await db.Product.findAll({
        include: ["brand", "category"],
      });
      res.render("listProducts", {
        productos,
        categorias,
        brands,
        off
      });
    }
  },
};
