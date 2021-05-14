const express = require("express");
const router = express.Router();
const meController = require("../app/Controllers/MeController");


router.get("/information", meController.information);

module.exports = router;