const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const productsController = require("./productsController");
const { edit } = require("./productsController");

const usersFilePath = path.join(__dirname, "../data/usuariosDataBase.json");


let usersController = {
    
    login: function(req,res){
        res.render("users/login", {usuario: req.session.usuario});
    },
    
    register: function(req,res){
        res.render("users/register");
    },

    createUser: function (req, res) {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        
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

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        // console.log("users");
        res.render("users/list", {users: users});

    },

    confirmarEliminar: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        const deleteThis = parseInt(req.params.id);

		// get the info of the product that will be deleted
		const destroy = users.find( user => {

			if (deleteThis == user.id ) {
				return deleteThis;
			}

		});
		
		res.render("users/delete", {persona: destroy});


	},

    // // Delete - Delete one product from DB
	destroy: function (req, res) {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
		
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

        res.redirect("/users/list");
        
    
	},


    editar: function (req, res) {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        let user = users.find(users => users.id == req.params.id);
        
        res.render("users/user-edit", {user: user});

    },

    update: function (req, res) {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        const idConvertido = parseInt(req.params.id);

        const usuarioEditado = {
            id: idConvertido,
            nombre: req.body.nombre,
            email: req.body.email,
        }

        let usersAll = users.filter(user => user.id != req.params.id);

        usersAll.push(usuarioEditado);

        let usuariosJSON =  JSON.stringify(usersAll, null, " ");
		fs.writeFileSync(usersFilePath, usuariosJSON);

		res.redirect("/users/list");

    },
    //posteo del loging para guardar la cookie JUANAMA HACE LAS VALIDACIONES DEL LOGING ACA
    posteo: function(req, res) {

        
        req.session.usuario = req.body.usuario
        // if(!req.session.usuario && req.cookies.recordame){
        // req.session.usuario = req.cookies.recordame
        // }

        if(req.body.recordame != undefined){
            res.cookie("recordame", req.body.usuario, {maxAge: 90000})
        }


        res.render("users/exito",{usuario: req.session.usuario})
    },
    saludo: function (req,res){
        res.render("users/exito",{
            usuario: req.session.usuario
            
        })
    }


    
}

module.exports = usersController;