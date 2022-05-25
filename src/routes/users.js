//llamer al router de express
const express = require("express");
const router = express.Router();

//llamar al controlador
const usersController = require("../controllers/usersController");

// solo traer la propiedad body de la librería de express validator
const { body } = require("express-validator"); 

// validaciones de express-validator, todos en formato de array
const validations = [
    body("nombre").notEmpty().withMessage("Ingrese su nombre, el campo está vacío"),
    body("email").isEmail().withMessage("Ingrese su email, el campo está vacío"),
    body("nacimiento").notEmpty().withMessage("Ingrese su fecha de nacimiento, el campo está vacío"),
    body("password").notEmpty().withMessage("Ingrese su fecha de nacimiento, el campo está vacío"),
    body("terminos").notEmpty().withMessage("Acepte los términos y condiciones"),
];

//Crear las rutas  y ejecuta un metodo del controlador 
router.get("/login",usersController.login);
router.get("/register",usersController.register);

// router.get("/error", usersController.error);


// redirection listando usuarios después de haber enviado info por POST
router.post("/register", validations, usersController.createUser);
router.get("/list", usersController.list);

// confirmar eliminar usuarios
router.get("/eliminar/:id", usersController.confirmarEliminar);
// eliminar definitivamente
router.delete("/destroy/:id", usersController.destroy);

//exportar el router
module.exports = router;