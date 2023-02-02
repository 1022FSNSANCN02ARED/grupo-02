
//EXPORTS
const path = require('path');

//INIT EXPRESS

const express = require('express');
const app = express();

//EXPRESS CONFIG
const PORT=3000;

//MIDDLEWARES
app.use(express.urlencoded({ extended: true })); //sin esto express no detecta los <forms>
app.use(express.json());


//ROUTERS
const mainRoutes = require("./routes/mainRoutes");
app.use("/",mainRoutes);


//CONFIG PUBLIC FOLDER
app.use(express.static(path.join(__dirname,"../public")))

//TEMPLATE ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//LISTEN
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})
//ERROR404
app.use((req,res,next)=>{
    res.status(404).send('Lo siento, la pagina no existe')
});
