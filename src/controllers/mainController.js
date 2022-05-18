const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let mainController = {
    index: function(req,res){
        res.render("main/index", {products: products})

    },
    carrito: function(req,res){
        res.render("main/carrito")
    },
}

module.exports = mainController;