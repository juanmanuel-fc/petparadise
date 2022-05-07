//llamar al router de express
const express = require("express");
const router = express.Router();

//lamar al controlador
const abmController = require("../controllers/abmController");

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/",abmController.index);
router.get("/baja",abmController.baja);

//exportar el router
module.exports = router;