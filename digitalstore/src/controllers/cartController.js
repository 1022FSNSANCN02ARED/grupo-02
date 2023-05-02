const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {

    async list(req, res) {
        //Mostrar el carrito
        // mostrar los productos que agregó usuario actual
        const userCart = req.session.userLogged
        const cartProducts = await db.CartProduct.findAll({
            where: {
                idUser: userCart.id,
            },
            include: ["product"],
            
        });
        res.render("carrito", {
            cart: cartProducts,
            totalPrice: cartProducts.reduce(
                (acc, cartProduct) => acc + cartProduct.product.price * cartProduct.count,
                0
            ),
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

    async addProductToCart(req, res) {
        const idProduct = req.params.id;
        const userCart = req.session.userLogged
        //Verificar si el producto está agregado
        const productInCartToModify = await db.CartProduct.findOne({
            where: {
                idUser: userCart.id,
                idProduct: idProduct,
            },
        });

        if (productInCartToModify) {
            // Si está agregado: Incrementar el contador de ese Producto
            productInCartToModify.count++;
            await productInCartToModify.save();
        } else {
            // Sino: Agregarlo
            await db.CartProduct.create({
                idUser: userCart.id,
                idProduct: idProduct,
                count: 1,
            });
        }

        res.redirect("/carrito");
    },

    async decreaseProductToCart(req, res) {
        const idProduct = req.params.id;
        const userCart = req.session.userLogged
        //Verificar si el producto está agregado
        const productInCartToModify = await db.CartProduct.findOne({
            where: {
                idUser: userCart.id,
                idProduct: idProduct,
            },
        });

        if (productInCartToModify) {
            // Si está agregado: Disminuir el contador de ese Producto
            // Si el contador es 1, removerlo de la lista completamente.
            if (productInCartToModify.count == 1) {
                await productInCartToModify.destroy();
            } else {
                productInCartToModify.count--;
                await productInCartToModify.save();
            }
        }

        res.redirect("/carrito");
    },
    async clearCart(req, res) {
        const userCart = req.session.userLogged
        await db.CartProduct.destroy({
            where: {
                idUser:userCart.id,
            },
        });
        res.redirect("/carrito");
    },

    async clearProductFromCart(req, res) {
        const idProduct = req.params.id;
        const userCart = req.session.userLogged
        const productInCartToClear = await db.CartProduct.findOne({
            where: {
                idUser: userCart.id,
                idProduct: idProduct,
            },
        });

        if (productInCartToClear) await productInCartToClear.destroy();

        res.redirect("/carrito");
    },

}