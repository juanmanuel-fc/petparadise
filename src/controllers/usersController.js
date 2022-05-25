const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const productsController = require("./productsController");
const { edit } = require("./productsController");

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

        res.render("users/list", {users: users});

    },

    confirmarEliminar: (req, res) => {

        const deleteThis = parseInt(req.params.id);

		// get the info of the product that will be deleted
		const destroy = users.filter( user => {

			if (deleteThis === user.id ) {
				return deleteThis;
			}

		});
		
		res.render("users/delete", {destroy: destroy});


	},

    // // Delete - Delete one product from DB
	destroy: function (req, res) {
		
        // get the id that needs to be deleted
        const deleteThis = req.params.id;

        // create a new array with all the elements EXCLUDING
        // the ID in deleteThis
        const filteredUsers = users.filter( user => {
            return user.id != deleteThis;
        });

        // convert format and write the new array to file
        const usersJSON = JSON.stringify(filteredUsers , null, "\t");
        fs.writeFileSync(usersFilePath, usersJSON);

        // res.redirect("/users/list");
        res.redirect("/");
        
    
	},


    editar: function (req, res) {

        let user = users.find(users => users.id == req.params.id);
        
        res.render("users/user-edit", {user: user});

    },

    update: function (req, res) {

        const usuarioEditado = {
            id: req.params.id,
            nombre: req.body.nombre,
            email: req.body.email,
        }

        let usersAll = users.filter(user => user.id != req.params.id);

        usersAll.push(usuarioEditado);

        let usuariosJSON =  JSON.stringify(usersAll, null, " ");
		fs.writeFileSync(usersFilePath, usuariosJSON);

		// res.redirect("/users/list");
		res.redirect("/");

    }

    
}

module.exports = usersController;