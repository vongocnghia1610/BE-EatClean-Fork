const express = require("express");
const router = express.Router();
const meController = require("../app/Controllers/MeController");
var multer = require("multer");
const path = require("path");
const collaboratorController = require("../app/Controllers/CollaboratorController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'Image', maxCount: 1 }]);

router.get("/information", meController.Information);
router.post("/favorite-blog", meController.FavortiteBlog);
router.post("/favorite-recipe", meController.FavortiteRecipe);
router.get("/show-blog", meController.ShowBlog);
router.get("/show-recipe", meController.ShowRecipe);
router.post("/create-comment", meController.CreateComment);
router.put("/edit-comment", meController.EditComment);
router.delete("/delete-comment", meController.DeleteComment);
router.put("/change-password", meController.ChangePassword);
router.put("/edit-information",cpUpload , meController.EditInformation);


module.exports = router;