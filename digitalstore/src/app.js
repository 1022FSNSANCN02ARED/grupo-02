
//EXPORTS
const path = require('path');

//INIT EXPRESS
const express = require('express');
const app = express();

//EXPRESS CONFIG
const PORT=3000;


//ROUTERS
const mainRoutes = require("./routes/mainRoutes");
app.use("/",mainRoutes);


//CONFIG PUBLIC FOLDER
app.use(express.static(path.join(__dirname,"../public")))

//TEMPLATE ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//DETECTAR FORMS
app.use(express.urlencoded({ extended: false }));

//LISTEN 
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})


