//llamer al router de express
const express = require("express");
const router = express.Router();

//lamar al controlador
const productsController = require("../controllers/productsController");

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/product-review",productsController.products);



//exportar el router
module.exports = router;