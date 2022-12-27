//ANTES DE CUALQUIER CAMBIO EN EL ARCHIVO APP.JS CONSULTAR CON EL GRUPO 
//IMPORTANTE

////////////////////////////////////////////////////////////////////////

//EXPORTS
const path = require('path');

//INIT EXPRESS
const express = require('express');
const app = express();

//EXPRESS CONFIG
const PORT=3000;

//CONFIG PUBLIC FOLDER
app.use(express.static(path.join(__dirname,"../public")))

//GETS
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../views/index.html"))
})
app.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,"../views/login.html"))
})
app.get("/producto/:id",(req,res) => {
    res.sendFile(path.join(__dirname,"../views/producto.html"))
    console.log()
})

//LISTEN 
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})
