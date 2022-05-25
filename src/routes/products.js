//llamer al router de express
const express = require("express");
const router = express.Router();
const path = require('path')

//MULTER 
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null,path.join(__dirname, '../../public/img/productos'))
    },
    filename: (req,file,cb) => {

        const nweFilename = 'img-' + Date.now() + path.extname(file.originalname);
        cb(null, nweFilename )
    }
});

const upload = multer({storage: storage});

//lamar al controlador
const productsController = require("../controllers/productsController");

//Crear las rutas  y ejecuta un metodo del controlador 

//pagina todos los productos 
router.get("/",productsController.index)

//creacion de productos
router.get("/create",productsController.create)
router.post('/', upload.single('product-img') ,productsController.store); 

//pagina del detalle de producto !!!!fata el id
router.get("/detail/:id",productsController.detail);


//edicion de producto !!! falta poner el id
router.get("/edit/:id", productsController.edit)
router.put('/edit/:id', upload.single('product-img'),productsController.update); 

//Eliminacion de productos
router.delete('/delete/:id', productsController.destroy); 

//confirmacion eliminar
router.get("/confirmDelete/:id", productsController.confirmDestroy)


//exportar el router
module.exports = router;