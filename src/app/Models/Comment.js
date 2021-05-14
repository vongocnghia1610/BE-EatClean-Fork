const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    IDUser: { type: String, required: true },
    IDRecipes: { type: String, required: true },
    Starts: { type: Number, required: true },
    Comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comment", Comment);