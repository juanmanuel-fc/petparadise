const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let productsController = {
    index: function(req,res){
        res.render("products/index",{products: products})
    },
    detail: function(req,res){
        let id = req.params.id;
        
        
        const product = products.find(product => product.id == id);


        res.render("products/product_view",{product: product} )
    },
    create: function(req,res){
        res.render("abm/product-create")
    },
    store: function(req,res){
        //vlida si los campos para crear un producto estan (!!!!faltan validaciones)
		if(req.file){
			//deberia guardar todos los datos en json y redireccionar a /products

			let productoNuevo = {
				id: products.length + 1,
				name: req.body.name,
				price: req.body.price,
				codigo: req.body.codigo,
				category: req.body.category,
				description: req.body.description,
				brand: req.body.brand,
				image: req.file.filename
			}
		
				products.push(productoNuevo);
		
				let productsJSON =  JSON.stringify(products,null," ");
		
				fs.writeFileSync(productsFilePath, productsJSON)
		
		 		res.redirect("/products")

		}else{
			//mostrar mensaje de error y recargar la pagina de creacion
			res.render("abm/product-create")
		}
    },
    edit: function(req,res){
        let id = req.params.id;
        const product = products.find(product => product.id == id);

        res.render("abm/product-edit", {product: product})
    },
    update: function(req,res){
        
		let product = products.find(product => product.id == req.params.id)	

        // !!!!!!!! faltan validaciones del formulario
        //!!!! fata subir el archivo de la imagen por defecto
		if(req.file){
			let productoEditado = {
				id:  product.id,
				name: req.body.name,
				price: req.body.price,
				codigo: req.body.codigo,
				category: req.body.category,
				description: req.body.description,
				brand: req.body.brand,
				image: req.file.filename 
				
			}
			let productsAll = products.filter(product => product.id != req.params.id);

		
		products = productsAll

		products.push(productoEditado)
		
		let productsJSON =  JSON.stringify(products,null," ");
		fs.writeFileSync(productsFilePath, productsJSON)

		res.redirect("/products");
		}else{
			let productoEditado = {
				id:  product.id,
				name: req.body.name,
				price: req.body.price,
				codigo: req.body.codigo,
				category: req.body.category,
				description: req.body.description,
				brand: req.body.brand,
				image: product.image 
				
			}
			let productsAll = products.filter(product => product.id != req.params.id);

		
		products = productsAll

		products.push(productoEditado)
		
		let productsJSON =  JSON.stringify(products,null," ");
		fs.writeFileSync(productsFilePath, productsJSON)

		res.redirect("/products");
		}	
        
    },
    destroy : (req, res) => {
		let productsNew = products.filter(product => product.id != req.params.id)

		let productsNewJSON =  JSON.stringify(productsNew,null," ");
		fs.writeFileSync(productsFilePath, productsNewJSON)

		res.redirect("/products");
		
	},
	confirmDestroy: (req, res) =>{
		res.render("abm/confirmacion-eliminar-producto")
	}
    
}

module.exports = productsController;