//llamer al router de express
const express = require("express");
const router = express.Router();

//llamar al controlador
const usersController = require("../controllers/usersController");

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/login",usersController.login);
router.get("/register",usersController.register);


//exportar el router
module.exports = router;