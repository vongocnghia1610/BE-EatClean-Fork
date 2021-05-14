const express = require("express");
const router = express.Router();
const userController = require("../app/Controllers/UserController");


router.post("/register-user", userController.RegisterUser);
router.post("/register-collaborator", userController.RegisterCollaborator);
router.post("/login", userController.login);
router.get("/verify-email/:token", userController.verifyEmail);


module.exports = router;
