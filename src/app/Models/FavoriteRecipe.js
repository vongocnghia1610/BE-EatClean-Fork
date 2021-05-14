const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteRecipe = new Schema(
  {
    IDUser: { type: String, required: true },
    IDRecipes: { type: String, required: true },
    Description: { type: String},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("favoriterecipe", FavoriteRecipe);