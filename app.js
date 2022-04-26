const express = require("express");
const app = express();
const path = require("path");
const puertoExpress = 3000;

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(process.env.PORT || puertoExpress, () => {
    console.log("Express corriendo OK");
})


// RUTAS DE LOS ARCHIVOS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/product-review", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/product_view.html"));
});

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/carrito.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"));
});