const express = require("express");
const router = express.Router();
const meController = require("../app/Controllers/MeController");


router.get("/information", meController.information);
router.post("/favorite-blog", meController.FavortiteBlog);
router.post("/favorite-recipe", meController.FavortiteRecipe);
router.get("/show-blog", meController.ShowBlog);
router.get("/show-recipe", meController.ShowRecipe);
router.post("/create-comment", meController.CreateComment);
router.put("/edit-comment", meController.EditComment);
router.delete("/delete-comment", meController.DeleteComment);
router.put("/change-password", meController.ChangePassword);

module.exports = router;