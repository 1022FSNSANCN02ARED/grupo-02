const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {

    async list(req, res) {
        //Mostrar el carrito
        // mostrar los productos que agregó usuario actual
        const userFav = req.session.userLogged
        let products = []
        const favorites = await db.Favorite.findAll({
            where: {
                idUser: userFav.id,
            },
            include: ["product"],
        });

        if(favorites.length > 0){

            favorites.forEach( item => {
                products.push(item.product)
            });
        }
            
        console.log(products)

        res.render("favorites", {
            fav: products,
        });
        
/*      
        res.render("cart", {
            cart: cartProducts,
            totalPrice: cartProducts.reduce(
                (acc, cartProduct) => acc + cartProduct.product.price * cartProduct.count,
                0
            ),
        });*/
    },

    async addProductToFav(req, res) {
        const idProduct = req.params.id;
        const userFav = req.session.userLogged
        //Verificar si el producto está agregado
        const productInFavToModify = await db.Favorite.findOne({
            where: {
                idUser: userFav.id,
                idProduct: idProduct,
            },
        });

        if (!productInFavToModify) {
            await db.Favorite.create({
                idUser: userFav.id,
                idProduct: idProduct,
            });
        }
        res.redirect("/favorites");
    },

    async clearAllFavs(req, res) {
        const userFav = req.session.userLogged
        await db.Favorite.destroy({
            where: {
                idUser:userFav.id,
            },
        });
        res.redirect("/favorites");
    },

    async clearProductFromFav(req, res) {
        const idProduct = req.params.id;
        const userFav = req.session.userLogged
        const productInFavToClear = await db.Favorite.findOne({
            where: {
                idUser: userFav.id,
                idProduct: idProduct,
            },
        });

        if (productInFavToClear) await productInFavToClear.destroy();

        res.redirect("/favorites");
    },

}