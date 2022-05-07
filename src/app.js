//esta es la ap de pet paradise 2
const express = require("express");
const app = express();
const path = require("path");
const puertoExpress = 3000;

app.set('view engine', 'ejs');

//rutas estaticas
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

//requerimientos de routes
const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const abmRouter = require("./routes/abm");




app.listen(process.env.PORT || puertoExpress, () => {
    console.log("server corriendo en el puerto" + puertoExpress);
})


//rutas de los archivos actualizados
//main
app.use("/",mainRouter);
app.use("/carrito", mainRouter);

//users
app.use("/", usersRouter);
app.use("/register", usersRouter);

//products
app.use("/",productsRouter);

//abm - alta | baja | modificaciones de los productos
app.use("/abm", abmRouter);

 

// // RUTAS DE LOS ARCHIVOS ANTIGUOS
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/views/main/index.html"));
// });

// app.get("/carrito", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/views/main/carrito.html"));
// });

// app.get("/product-review", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/views/products/product_view.html"));
// });


// app.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/views/users/login.html"));
// });

// app.get("/registro", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/views/users/register.html"));
// });