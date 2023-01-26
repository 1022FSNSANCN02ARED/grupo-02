const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "productsDataBase.json");

module.exports = {

    getProducts() {

        const productsFileContent = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsFileContent);
        return products
    },
    saveProduct(product) {
        const products = this.getProducts();
        products.push(product);
        const productsFileContent = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, productsFileContent, "utf-8");
    },
    updateProduct(product) {
        const products = this.getProducts();
        for (let x = 1; x < products.length; x++) {
            if (products[x].id == product.id) {
                products[x].name = product.name
                products[x].description = product.description
                products[x].category = product.category
                products[x].price = product.price
                products[x].discount = product.discount
            }
        }
        const productsFileContent = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, productsFileContent, "utf-8");
    },
    deleteProduct(id) {
        const products = this.getProducts();
        const newProducts = products.filter((obj) => obj.id !== id)
        const productsFileContent = JSON.stringify(newProducts, null, 4);
        fs.writeFileSync(productsFilePath, productsFileContent, "utf-8");
    },
    getProductsOferta() {
        const products = this.getProducts();
        const productsOfert = products.filter(oferta => oferta.oferta == true)
        return productsOfert;
    }
}