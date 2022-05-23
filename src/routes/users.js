//llamer al router de express
const express = require("express");
const router = express.Router();

//llamar al controlador
const usersController = require("../controllers/usersController");

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/login",usersController.login);
router.get("/register",usersController.register);


router.post("/register", usersController.createUser);
// redirection listando usuarios después de haber enviado info por POST
router.get("/list", usersController.list);


//exportar el router
module.exports = router;