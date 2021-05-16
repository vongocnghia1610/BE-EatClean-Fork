const express = require("express");
const router = express.Router();
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
var cpUpload = upload.fields([{ name: 'Image', maxCount: 100 }]);
router.post("/create-blog",cpUpload, collaboratorController.CreateBlog);
router.put("/update-blog", collaboratorController.UpdateBlog);
router.delete("/delete-blog", collaboratorController.DeleteBlog);
router.post("/create-recipe", collaboratorController.CreateRecipe);
router.put("/update-recipe", collaboratorController.UpdateRecipe);
router.delete("/delete-recipe", collaboratorController.DeleteRecipe);

module.exports = router;