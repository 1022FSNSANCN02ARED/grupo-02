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
    const productos = await db.Product.findAll({
      include: ["brand", "category"],
    });
    const categorias = await db.Category.findAll();
    const brands = await db.Brand.findAll();
    res.render("listProducts", {
      productos,
      categorias,
      brands,
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
      res.render("agregarProducto", {
        errores: errores.mapped(), //COMPARTO CON LA VISTA LA VARIABLE ERRORES
        old: req.body,
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

  filterProducts: async (req, res) => {
    const categorias = await db.Category.findAll();
    const brands = await db.Brand.findAll();
    const filter = req.body;
    console.log(filter);
    let productos = [];
    if (Object.entries(filter).length > 0) {
      const props = Object.entries(filter).map((prop) => {
        return prop[0];
      });
      //separar si tiene on de oferta
      console.log(props);
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
        //var brand = marca[0].dataValues.id
      } /*
            else{
                console.log("asd")
                for (let i = 0; i < brands.length; i++) {
                    brand[i] = brands[i].dataValues.id;
                }
            }  */

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
            }, //{
            // [Op.or]: //props
            // }
          },
        });
      } else {
        props.shift();
        productos = await db.Product.findAll({
          include: ["brand", "category"],
          where: {
            idCategory: {
              [Op.or]: catego,
            },
            idBrand: {
              [Op.or]: brand,
            },
            /*
                        idCategory:{
                            [Op.or]:props
                        },*/
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
      });
    } else {
      res.render("listProducts", {
        productos,
        categorias,
        brands,
      });
    }
  },
};
