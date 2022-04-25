const express = require("express");
const app = express();
const path = require("path");
const puertoExpress = 3000;

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(puertoExpress, () => {
    console.log("Express corriendo OK en el puerto", puertoExpress);
})


// RUTAS DE LOS ARCHIVOS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/product-review", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/product_view.html"));
});

// const express = require('express');
// const path = require("path");

// const app = express();

// //app.use("/static",express.static("public"));
// app.use(express.static("public"));


// //levantar el server
// app.listen(3030, () =>{ 
//     console.log("Express corriendo puerto 3030");
// })

// //rutas
// app.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname,"/views/index.html"))
// });

// app.get("/carrito", (req,res) => {
//     res.sendFile(path.join(__dirname,"/views/carrito.html"))
// });

// app.get("/login", (req,res) => {
//     res.sendFile(path.join(__dirname,"/views/login.html"))
// });

// app.get("/product_view", (req,res) => {
//     res.sendFile(path.join(__dirname,"/views/product_view.html"))
// });

// app.get("/register", (req,res) => {
//     res.sendFile(path.join(__dirname,"/views/register.html"))
// });