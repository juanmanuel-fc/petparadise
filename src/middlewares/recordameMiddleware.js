function recordame (req,res,next){
    if(req.cookies.recordame != undefined && !req.session.usuario){
        req.session.usuario = req.cookies.recordame
    }
    next();
}

module.exports = recordame;