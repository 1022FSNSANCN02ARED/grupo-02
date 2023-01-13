//ANTES DE CUALQUIER CAMBIO EN EL ARCHIVO APP.JS CONSULTAR CON EL GRUPO 
//IMPORTANTE

// EXPRESS
////////////////////////////////////////////////////////////////////////
//ROUTERS
const mainRouter = require("./routers/main-router");
//EXPORTS
const path = require('path');
//INIT EXPRESS
const express = require('express');
const app = express();

//EXPRESS CONFIG
const PORT=3000;

//CONFIG PUBLIC FOLDER
app.use(express.static(path.join(__dirname,"../public")))
//PLANTILLA EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
//GETS
//app.get("/",(req,res) => {
//    res.sendFile(path.join(__dirname,"../views/index.html"))
//})
app.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,"../views/login.html"))
})

app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname,"../views/register.html"))
})

app.get("/carrito", (req,res) => {
    res.sendFile(path.join(__dirname,"../views/carrito.html"))
})

/*se agrega pedido de respuesta a pagina de ayuda*/
app.get("/ayuda", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/ayuda.html"));
});

/*se agrega pedido de respuesta a pagina de contacto*/
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contacto.html"));
});


app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/listadeproducto.html"));
});


//LISTEN 
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})
//App.use de routers
app.use(mainRouter);
