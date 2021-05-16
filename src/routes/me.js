const express = require("express");
const router = express.Router();
const meController = require("../app/Controllers/MeController");


router.get("/information", meController.information);
router.post("/favorite-blog", meController.FavortiteBlog);
router.post("/favorite-recipe", meController.FavortiteRecipe);
router.get("/show-blog", meController.ShowBlog);
router.get("/show-recipe", meController.ShowRecipe);
module.exports = router;