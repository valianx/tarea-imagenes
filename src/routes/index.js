const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

//usuarios
router.get("/users", userController.tokenValidation, userController.getUsers);
router.get("/users/:id", userController.tokenValidation, userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.tokenValidation, userController.putUser);
router.delete("/users/:id", userController.tokenValidation, userController.deleteUser);


router.post("/login", userController.loginUser);

//posts
router.post("/posts", postController.nuevoPost);
router.get("/posts", userController.tokenValidation, postController.getPost);
router.get("/posts/:id", userController.tokenValidation, postController.getPostById);
router.put("/posts/:id", userController.tokenValidation, postController.putPost);
router.delete("/posts/:id", userController.tokenValidation, postController.deletePost);
router.post("/imagen/:id", userController.tokenValidation, postController.nuevaImagen);
router.post("/video/:id", userController.tokenValidation, postController.nuevoVideo);
router.delete("/imagen/:id", userController.tokenValidation, postController.deleteImagen);
router.delete("/video/:id", userController.tokenValidation, postController.deleteVideo);




module.exports = router;