const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

//usuarios
router.get("/users", userController.tokenValidation, userController.getUsers); //obtiene todos los usuarios
router.get("/users/:id", userController.tokenValidation, userController.getUserById); //obtiene 1 usuario si le pasas la id
router.post("/users", userController.createUser); //crea un usuario. le tienes que pasar un nombre, email y password (datos por el body)
router.put("/users/:id", userController.tokenValidation, userController.putUser); //le puedes mandar el nombre, email y password en el body para edicar
router.delete("/users/:id", userController.tokenValidation, userController.deleteUser); //elimina un usuario por su id como parametro


router.post("/login", userController.loginUser); //login con el email y password

//posts
router.post("/posts", userController.tokenValidation, postController.nuevoPost); //crea un post, le tienes que pasar un titulo y opcional la descripcion (datos por el body)
router.get("/posts", userController.tokenValidation, postController.getPost); //obtiene todos los posts
router.get("/posts/:id", userController.tokenValidation, postController.getPostById); //obtiene un post con su id en los parametros
router.put("/posts/:id", userController.tokenValidation, postController.putPost); //le mandas el titulo y/o la descripcion si quieres editar la publicacion (datos por el body)
router.delete("/posts/:id", userController.tokenValidation, postController.deletePost); //elimina un post, le mandas el id como parametro
router.post("/imagen/:id", userController.tokenValidation, postController.nuevaImagen); //añade nueva imagen, enviar como formulario con el nombre 'data' la imagen nueva 
router.post("/video/:id", userController.tokenValidation, postController.nuevoVideo);//añade nuevo video , enviar como formulario con el nombre 'data' el video nuevo 
router.delete("/imagen/:id", userController.tokenValidation, postController.deleteImagen); //elimina la imagen de un post, se envia la id del post como parametro
router.delete("/video/:id", userController.tokenValidation, postController.deleteVideo); //elimina el video de un post, se envia la id del post como parametro


module.exports = router;