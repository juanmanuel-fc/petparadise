let abmController = {
    index: function(req,res){
        res.render("abm/index")
    }, 
    baja: function(req,res){
        res.render("abm/baja")
    }, 
}

module.exports = abmController;