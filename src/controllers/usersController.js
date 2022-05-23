const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../data/usuariosDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

let usersController = {
    
    login: function(req,res){
        res.render("users/login");
    },
    
    register: function(req,res){
        res.render("users/register");
    },

    createUser: function (req, res) {

        
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("users/register", {errors: resultValidation.mapped(),
            oldInfo: req.body
            });
            
    
        } else {

            // max to calculate the next ID
            let max = 0;

            for (let i=0; i<users.length; i++) {
                if (users[i].id > max) {
                    max = users[i].id;
                }
            }

            let nuevoUsuario = {
                id: max + 1,
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                terminos: req.body.terminos
            };

            users.push(nuevoUsuario);

            const usuariosJSON = JSON.stringify(users, null, "\t");

            fs.writeFileSync(usersFilePath, usuariosJSON);

            res.redirect("/users/list");

        }

    

    },

    list: function (req, res) {
        res.render("users/list");
    }


    
}

module.exports = usersController;