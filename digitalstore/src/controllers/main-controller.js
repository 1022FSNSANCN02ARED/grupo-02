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
    index: (req,res) =>{
            db.Product
            .findAll({
                where: {
                    discount:{
                        [Op.gt]: 0, 
                    }
                }
            }) // force: true es para asegurar que se ejecute la acción
            .then(productsOfert => {
                return res.render('index', {productsOfert})})
            .catch(error => res.send(error)) 
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
        db.Product
        .findAll({
            where: {
                discount:{
                    [Op.gt]: 0, 
                }
            }
        }) // force: true es para asegurar que se ejecute la acción
        .then(productsOfert => {
            return res.render('oferta', {productsOfert})})
        .catch(error => res.send(error)) 
    },
}