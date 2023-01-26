const products = require('../products/products');
module.exports = {
    index: (req,res) =>{
        const productsOfert = products.getProductsOferta()
        res.render("index",{
            productsOfert,
            nombre:"lautaro"
        })
    },
    register: (req,res)=> {
        res.render("register")
    },
    login: (req,res)=>{
        res.render("login")
    },
    contacto: (req,res)=>{
        res.render("contacto")
    },
    ayuda: (req,res)=>{
        res.render("ayuda")
    },
    carrito: (req,res)=>{
        res.render("carrito")           
    },
    oferta: (req,res)=>{
        const productsOfert = products.getProductsOferta()
        res.render("oferta",{
            productsOfert
        })           
    },

}