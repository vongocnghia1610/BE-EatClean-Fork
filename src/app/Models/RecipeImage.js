const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeImage = new Schema(
  {
    RecipesImages: { type: String, required: true },
    IDRecipes: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("recipeimage", RecipeImage);