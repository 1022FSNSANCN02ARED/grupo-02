//EXPORTS
const path = require('path');

//INIT EXPRESS

const express = require('express');
const app = express();
//session-middlewares
const session = require('express-session');
//********************************//
const logger = require('morgan');
app.use(logger('dev'));
//const userLogger = require("./middlewares/userLogger");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookies = require('cookie-parser');


app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());
//*Intercambio de Recursos de Origen Cruzado (CORS)*/
const cors = require('cors');
app.use(
	cors({
	  origin: "*",
	})
);
//****************************** */
app.use(userLoggedMiddleware);


//app.use(userLogger);
//******************************** */
//EXPRESS CONFIG
const PORT=3000;

//MIDDLEWARES
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

//ROUTERS
const mainRoutes = require("./routes/mainRoutes");
app.use("/",mainRoutes);

//CONFIG PUBLIC FOLDER
app.use(express.static(path.join(__dirname,"../public")))

//TEMPLATE ENGINEñ
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//LISTEN
app.listen(PORT,()=> {
    console.log("Server start on http://localhost:"+PORT)
})


//ERROR404
app.use((req,res,next)=>{
    res.status(404).render('error404')
});
