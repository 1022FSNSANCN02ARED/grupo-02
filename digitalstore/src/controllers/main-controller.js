module.exports = {
    index: (req,res) =>{
        res.render("index")
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
    }
}