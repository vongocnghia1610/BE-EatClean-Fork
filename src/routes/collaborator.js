const express = require("express");
const router = express.Router();
const collaboratorController = require("../app/Controllers/CollaboratorController");


router.post("/create-blog", collaboratorController.CreateBlog);
router.put("/update-blog", collaboratorController.UpdateBlog);
router.delete("/delete-blog", collaboratorController.DeleteBlog);
router.post("/create-recipe", collaboratorController.CreateRecipe);
router.put("/update-recipe", collaboratorController.UpdateRecipe);
router.delete("/delete-recipe", collaboratorController.DeleteRecipe);

module.exports = router;