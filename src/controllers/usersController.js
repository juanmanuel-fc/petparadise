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
	destroy: (req, res) => {
		
		// erase this id
		const id = req.params.id;

		// var to store the index of products array to be erased
		let eraseThis = null;

		// find the array index where the id is
		users.forEach( (person, index) => {
			if (person.id === id) {
				eraseThis = index;
			}
		});

		// remove the index from the array
		users.splice(eraseThis, 1);

		// write the changes to the JSON file
		const usersJSON = JSON.stringify(users, null, "\t");
		fs.writeFileSync(usersFilePath, usersJSON);

		res.redirect("/users/list");


	}


    
}

module.exports = usersController;