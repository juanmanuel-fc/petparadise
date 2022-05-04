//llamer al router de express
const express = require("express");
const router = express.Router();

//lamar al controlador
const mainController = require("../controllers/mainController");

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/",mainController.index);

//exportar el router
module.exports = router;