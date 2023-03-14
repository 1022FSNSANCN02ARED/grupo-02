const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "productsDataBase.json");

module.exports = {

    getProducts() {

        const productsFileContent = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsFileContent);
        return products
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
    },
    getProductsFilter(obj) {

        console.log(obj)

        const products = this.getProducts();
        const teclados = products.filter(producto => producto.categoria == "Teclados");
        const auriculares = products.filter(producto => producto.categoria == "Auriculares");
        const monitores = products.filter(producto => producto.categoria == "Monitores");
        const gabinetes = products.filter(producto => producto.categoria == "Gabinetes");
        const memorias = products.filter(producto => producto.categoria == "Memorias");
        const motherboard = products.filter(producto => producto.categoria == "Motherboard");

        let listProducts=[];
        if(obj.hasOwnProperty('teclados')){
            listProducts=listProducts.concat(teclados)
        }
        if(obj.hasOwnProperty('monitores')){
            listProducts=listProducts.concat(monitores)
        }
        if(obj.hasOwnProperty('motherboard')){
            listProducts=listProducts.concat(motherboard)
        }
        if(obj.hasOwnProperty('gabinetes')){
            listProducts=listProducts.concat(gabinetes)
        }
        if(obj.hasOwnProperty('auriculares')){
            listProducts=listProducts.concat(auriculares)
        }
        if(obj.hasOwnProperty('memorias')){
            listProducts=listProducts.concat(memorias)
        }
        if(obj.hasOwnProperty('off')){
            if(Object.entries(obj).length==1){
                listProducts=products.filter(producto => producto.oferta == true);
            }
            else{
                listProducts=listProducts.filter(producto => producto.oferta == true);
            }
        }
        return listProducts;
    }
}