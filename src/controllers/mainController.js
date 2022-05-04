let mainController = {
    index: function(req,res){
        res.render("main/index")
    },
    carrito: function(req,res){
        res.render("main/carrito")
    },
}

module.exports = mainController;