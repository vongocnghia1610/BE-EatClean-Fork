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
          error: "null",
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
  // Get /admin/show-blog
  async ShowBlog(req, res, next) {
    try {
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var role = await Role.findOne({ _id: userDb._doc.IDRole });
      if (role._doc.RoleName == "Admin") {
        var listBlog = await Blog.find({ Status: "INCONFIRM" });
        res.status(200).send({
          data: listBlog,
          error: "",
        });
      } else {
        res.status(400).send({
          data: "",
          error: "No Autheraziton",
        });
      }
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
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var role = await Role.findOne({ _id: userDb._doc.IDRole });
      if (role._doc.RoleName == "Admin") {
        var listRecipe = await Recipe.find({ Status: "INCONFIRM" });
        res.status(200).send({
          data: listRecipe,
          error: "",
        });
      }
      else
      {
        res.status(400).send({
            data: "",
            error: "No Autheraziton",
          });
      }
    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
}
module.exports = new MeController();
