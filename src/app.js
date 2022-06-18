//esta es la ap de pet paradise 2
const express = require("express");
const app = express();
const path = require("path");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const morgan = require("morgan");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const recordame = require("./middlewares/recordameMiddleware")




//requerimientos de routes
const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const abmRouter = require("./routes/abm");

//REQUERIMIENTOS
app.use(morgan("dev"));
app.use(session({secret: "Secreto",  resave: true, saveUninitialized: true}))
app.use(cookieParser());
app.use(recordame);



app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
const puertoExpress = 3030;

app.set('view engine', 'ejs');

// configurar el entry point para que pueda capturar info envida por post
app.use(express.urlencoded({ extended:false } ));
app.use(express.json());


//rutas estaticas
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));



app.listen(process.env.PORT || puertoExpress, () => {
    console.log("Server corriendo en el puerto ", puertoExpress);
})


//rutas de los archivos actualizados
//main
app.use("/",mainRouter); 
app.use("/carrito", mainRouter);


//users
app.use("/users", usersRouter);

//products
app.use("/products",productsRouter);

//abm - alta | baja | modificaciones de los productos
app.use("/abm", abmRouter);

 
