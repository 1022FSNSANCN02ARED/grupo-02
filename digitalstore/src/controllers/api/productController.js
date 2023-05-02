const { Product } = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    await Product.findAll().then((product) => {
      let resp = {
        meta: {
          status: 200,
          total: product.length,
          url: "api/products",
        },
        data: product,
      };
      res.json(resp);
    });
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
};
