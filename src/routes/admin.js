const express = require("express");
const router = express.Router();
const adminController = require("../app/Controllers/AdminController");


router.get("/show-blog", adminController.ShowBlog);
router.get("/show-recipe", adminController.ShowRecipe);
module.exports = router;