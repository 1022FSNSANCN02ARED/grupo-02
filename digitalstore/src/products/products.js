const fs = require("fs");
const path = require("path");

module.exports={
    
    getProducts(){
        const productsFilePath = path.join(__dirname, "productsDataBase.json");
        const productsFileContent = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsFileContent);
        return products
    }
}