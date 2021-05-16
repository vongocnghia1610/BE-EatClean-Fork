require("dotenv").config();
const User = require("../Models/User");
const Role = require("../Models/Role");
const Blog = require("../Models/Blog");
const Recipe = require("../Models/Recipe");
const BlogImage = require("../Models/BlogImage");
const RecipeImage = require("../Models/RecipeImage");
const FavoriteBlog = require("../Models/FavoriteBlog");
const FavoriteRecipe = require("../Models/FavoriteRecipe");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {
  createToken,
  verifyToken,
  createTokenTime,
  makePassword,
} = require("./index");
class MeController {
  //get me/information / get || post put delete
  async information(req, res, next) {
    try {
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      var resultUser = await User.findOne({ _id, Status: "ACTIVE" }); //muc dich la lay role
      if (resultUser != null) {
        res.status(200).send({
          data: resultUser,
          error: "null"
        });
      } else {
        res.status(404).send({
          data: "",
          error: "Not found user!",
        });
      }
    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
  //Post me/favorite-blog
  async FavortiteBlog(req, res, next) {
    try {
      const IDBlog = req.body.IDBlog;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const result = await User.findOne({ _id, Status: "ACTIVE" });

      if (result != null) {
        var fv = {
          IDUser: result._doc._id,
          IDBlog
        }
        var favoriteBlog = await FavoriteBlog.create(fv);
        res.status(200).send({
          data: favoriteBlog,
          error: "",
        });

      } else {
        res.status(404).send({
          error: "User not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }

  //Post me/favorite-recipe
  async FavortiteRecipe(req, res, next) {
    try {
      const IDRecipe = req.body.IDRecipe;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const result = await User.findOne({ _id, Status: "ACTIVE" });

      if (result != null) {
        var fv = {
          IDUser: result._doc._id,
          IDRecipe
        }
        var favoriteRecipe = await FavoriteRecipe.create(fv);
        res.status(200).send({
          data: favoriteRecipe,
          error: "",
        });

      } else {
        res.status(404).send({
          error: "User not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
  // Get /me/show-blog
  async ShowBlog(req, res, next) {
    try {
      var listBlog = await Blog.find({Status: "CONFIRM"})
      res.status(200).send({
        data: listBlog,
        error: "",
      });

    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
    // Get /me/show-recipe
    async ShowRecipe(req, res, next) {
      try {
        var listRecipe = await Recipe.find({Status: "CONFIRM"})
        res.status(200).send({
          data: listRecipe,
          error: "",
        });
  
      } catch (error) {
        res.status(500).send({
          data: "",
          error: error,
        });
      }
    }

}
module.exports = new MeController();