let productsController = {
    index: function(req,res){
        res.render("products/index")
    },
    detail: function(req,res){
        res.render("products/product_view")
    },
    create: function(req,res){
        res.render("abm/product-create")
    },
    edit: function(req,res){
        res.render("abm/product-edit")
    },
    delete:function(req,res){
        res.render("abm/baja")
    }
    
}

module.exports = productsController;