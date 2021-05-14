const express = require("express");
const router = express.Router();
const collaboratorController = require("../app/Controllers/CollaboratorController");


router.post("/create-blog", collaboratorController.CreateBlog);
router.put("/update-blog", collaboratorController.UpdateBlog);
router.delete("/delete-blog", collaboratorController.DeleteBlog);

module.exports = router;