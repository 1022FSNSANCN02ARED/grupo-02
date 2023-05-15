const products = require('../data/products');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = {
/*
    index: (req,res) =>{
        const productsOfert = products.getProductsOferta()
        res.render("index",{
            productsOfert,
            nombre:"lautaro"
        })
    },*/
    index: async (req,res) =>{
        
        const productsOfert = await db.Product.findAll({
            
            where: {
                discount:{
                    [Op.gt]: 0, 
                }
            },
            limit: 4,
            offset:0,

        }) // force: true es para asegurar que se ejecute la acción

        const products = await db.Product.findAll({limit:4,offset:4,});
        res.render('index', {productsOfert,products})
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
    }
}