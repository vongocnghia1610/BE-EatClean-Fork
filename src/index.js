require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/db");
const port = process.env.PORT || 8000;
const route = require("./routes");
const route2 = require("./routes");
const route3 = require("./routes");

db.connect(process.env.DB_URL);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);

//// test git fork
app.listen(port, () => {
  console.log(`App listening at http://localhost`, port);
});
