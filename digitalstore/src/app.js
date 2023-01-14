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

//LISTEN 
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})
//App.use de routers
app.use(mainRouter);
