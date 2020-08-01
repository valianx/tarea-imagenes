const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

//usuarios
router.get("/users", userController.tokenValidation, userController.getUsers);
router.get("/users/:id", userController.tokenValidation, userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.tokenValidation, userController.putUser);
router.delete("/users/:id", userController.tokenValidation, userController.deleteUser);


router.post("/login", userController.loginUser);



module.exports = router;