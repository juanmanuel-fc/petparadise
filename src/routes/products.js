//llamer al router de express
const express = require("express");
const router = express.Router();

//lamar al controlador
const productsController = require("../controllers/productsController");

//Crear las rutas  y ejecuta un metodo del controlador 

//pagina todos los productos 
router.get("/",productsController.index)

//creacion de productos
router.get("/create",productsController.create)
//aqui poner el post

//pagina del detalle de producto !!!!fata el id
router.get("/detail/",productsController.detail);


//edicion de producto !!! falta poner el id
router.get("/edit", productsController.edit)
//aqui poner el put de la edicion

//Eliminacion de productos
router.get("/delete",productsController.delete)
//aqui poner el delete del boton de eliminar 

//exportar el router
module.exports = router;