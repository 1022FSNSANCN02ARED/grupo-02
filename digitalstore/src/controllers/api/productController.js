const { Product, CartProduct, Favorite, Category } = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    
    let product = await Product.findAll()
    product.forEach((prod) => {
      prod.image = `http://localhost:3000/img/productos/${prod.image}`;
    });
    let resp = {
      meta: {
        status: 200,
        total: product.length,
        url: "api/products",
      },
      data: product,
    };
    res.json(resp);
},
  detail: async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json({
      meta: {
        status: !product ? 404 : 200,
        url: "api/products/:id",
      },
      data: product,
    });
  },
  update: (req, res) => {
    let productId = req.params.id;
    Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        idCategory: req.body.idCategory,
        description: req.body.description,
        idBrand: req.body.idBrand,
        discount: req.body.discount,
      },
      {
        where: { id: productId },
      }
    )
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/products/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/products/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
  destroy: (req, res) => {
    let productId = req.params.id;
    // elimino de carrito
    CartProduct.destroy({ where: { idProduct: productId }, force: true });
    // elimino de favorito
    Favorite.destroy({ where: { idProduct: productId }, force: true });
    // elimino de producto

    Product.destroy({ where: { id: productId }, force: true })
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/products/delete/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/products/destroy/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },

  categories: async (req, res) => {
    const promCategories = await Category.findAll();
    
    const promProd = await Product.findAll({
      include: ["brand", "category"],
    });
    
    let totalProd = [];
    
    promCategories.forEach(cat=>{
        
        productos = promProd.filter(product=>product.idCategory = cat.id)
        totalProd.push(productos.length)

    })
    console.log(promCategories)
      let resp = {
        meta: {
          status: 200,
          total: promCategories.length,
          url: "api/products/categories/list",
        },
        data: promCategories,
      };
      res.json(resp);
    
  
  }
};
