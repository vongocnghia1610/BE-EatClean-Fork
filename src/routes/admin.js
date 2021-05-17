const express = require("express");
const router = express.Router();
const adminController = require("../app/Controllers/AdminController");


router.get("/show-blog", adminController.ShowBlog);
router.get("/show-recipe", adminController.ShowRecipe);
router.post("/confirm-blog", adminController.ConfirmBlog);
router.post("/confirm-recipe", adminController.ConfirmRecipe);

module.exports = router;