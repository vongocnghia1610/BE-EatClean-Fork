require("dotenv").config();
const User = require("../Models/User");
const Role = require("../Models/Role");
const Blog = require("../Models/Blog");
const Recipe = require("../Models/Recipe");
const BlogImage = require("../Models/BlogImage");
const RecipeImage = require("../Models/RecipeImage");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { UploadImage } = require("./index");
const {
  createToken,
  verifyToken,
  createTokenTime,
  makePassword,
} = require("./index");
class CollaboratorController {
  async CreateBlog(req, res, next) {
    try {
      const BlogTitle = req.body.BlogTitle;
      const BlogContent = req.body.BlogContent;
      const Image = req.files["Image"];
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var role = await Role.findOne({ _id: userDb._doc.IDRole });
      if (role._doc.RoleName == "Collaborator") {
        const blog = await Blog.create({
          BlogTitle,
          BlogAuthor: userDb._doc.FullName,
          BlogContent,
          IDAuthor: userDb._doc._id,
        });
        const id_Blog= blog._doc._id;
        for (let i=0;i<Image.length;i++)
        {
          var addImage = req.files["Image"][i];
          const urlImage = await UploadImage(addImage.filename, "BlogImages/");
          await BlogImage.create({
            BlogImages: urlImage,
            IDBlog: id_Blog,
          });
        }
        const showImage = await BlogImage.find({IDBlog: id_Blog})
        res.status(200).send({
          data: blog,
          Image: showImage,
          error: "",
        });
      } else {
        res.status(400).send({
          data: "",
          error: "No Autheraziton",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }
  // Put collaborator/update-blog

  async UpdateBlog(req, res, next) {
    try {
      const BlogTitle = req.body.BlogTitle;
      const BlogContent = req.body.BlogContent;
      const Image = req.files["Image"];
      var _IDBlog = req.body.IDBlog;
      var update = {
        Status: "Deleted",
      };
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var blog = await Blog.findOne({ _id: _IDBlog });
      if (blog._doc.IDAuthor == userDb._doc._id ) {
        if(blog._doc.Status == "INCONFIRM")
        {
          await Blog.findOneAndUpdate(
            { _id: _IDBlog },
            update,
            {
              new: true,
            }
          );
          const blogNew = await Blog.create({
            BlogTitle,
            BlogAuthor: userDb._doc.FullName,
            BlogContent,
            IDAuthor: userDb._doc._id,
          });
          const id_Blog= blogNew._doc._id;
          for (let i=0;i<Image.length;i++)
          {
            var addImage = req.files["Image"][i];
            const urlImage = await UploadImage(addImage.filename, "BlogImages/");
            await BlogImage.create({
              BlogImages: urlImage,
              IDBlog: id_Blog,
            });
          }
          const showImage = await BlogImage.find({IDBlog: id_Blog})
          res.status(200).send({
            data: blogNew,
            Image: showImage,
            error: "",
          });
        }
        else
        {
          res.status(400).send({
            data: "",
            error: "Blog Confirmed",
          });
        }
       
      } else {
        res.status(400).send({
          data: "",
          error: "No Autheraziton",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }

  // Delete collaborator/delete-blog
  async DeleteBlog(req, res, next) {
    try {
      var update = {
        Status: "Deleted",
      };
      var _IDBlog = req.query.id;
      console.log(_IDBlog);
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var blog = await Blog.findOne({ _id: _IDBlog });
      if (blog._doc.IDAuthor == userDb._doc._id) {
        const blogUpdate = await Blog.findOneAndUpdate(
          { _id: _IDBlog },
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: blogUpdate,
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
        data: error,
        error: "Internal Server Error",
      });
    }
  }

  // Post collaborator/create-recipe
  async CreateRecipe(req, res, next) {
    try {
      const RecipesTitle = req.body.RecipesTitle;
      const RecipesContent = req.body.RecipesContent;
      const NutritionalIngredients = req.body.NutritionalIngredients;
      const Ingredients = req.body.Ingredients;
      const Steps = req.body.Steps;
      const Image = req.files["Image"];
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var role = await Role.findOne({ _id: userDb._doc.IDRole });
      if (role._doc.RoleName == "Collaborator") {
        const recipe = await Recipe.create({
                RecipesTitle,
                RecipesContent,
                RecipesAuthor: userDb._doc.FullName,
                NutritionalIngredients,
                Ingredients,
                Steps,
                IDAuthor: userDb._doc._id,
              });
        const id_Recipe= recipe._doc._id;
        for (let i=0;i<Image.length;i++)
        {
          var addImage = req.files["Image"][i];
          const urlImage = await UploadImage(addImage.filename, "RecipeImages/");
          await RecipeImage.create({
            RecipeImages: urlImage,
            IDRecipe: id_Recipe,
          });
        }
        const showImage = await RecipeImage.find({IDRecipe: id_Recipe})
        res.status(200).send({
          data: recipe,
          Image: showImage,
          error: "",
        });
      } else {
        res.status(400).send({
          data: "",
          error: "No Autheraziton",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }

  // Put collaborator/update-recipe

  async UpdateRecipe(req, res, next) {
    try {
      const RecipesTitle = req.body.RecipesTitle;
      const RecipesContent = req.body.RecipesContent;
      const NutritionalIngredients = req.body.NutritionalIngredients;
      const Ingredients = req.body.Ingredients;
      const Steps = req.body.Steps;
      const Image = req.files["Image"];
      var _IDRecipe = req.body.IDRecipe;
      var update = {
        Status: "Deleted",
      };
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var recipe = await Recipe.findOne({ _id: _IDRecipe });
      if (recipe._doc.IDAuthor == userDb._doc._id ) {
        if(recipe._doc.Status == "INCONFIRM")
        {
          await Recipe.findOneAndUpdate(
            { _id:  _IDRecipe},
            update,
            {
              new: true,
            }
          );
          const recipeNew = await Recipe.create({
            RecipesTitle,
            RecipesContent,
            RecipesAuthor: userDb._doc.FullName,
            NutritionalIngredients,
            Ingredients,
            Steps,
            IDAuthor: userDb._doc._id,
          });
          const id_Recipe= recipeNew._doc._id;
          for (let i=0;i<Image.length;i++)
          {
            var addImage = req.files["Image"][i];
            const urlImage = await UploadImage(addImage.filename, "RecipeImages/");
            await RecipeImage.create({
              RecipeImages: urlImage,
              IDRecipe: id_Recipe,
            });
          }
          const showImage = await RecipeImage.find({IDRecipe: id_Recipe})
          res.status(200).send({
            data: recipeNew,
            Image: showImage,
            error: "",
          });
        }
        else
        {
          res.status(400).send({
            data: "",
            error: "Recipe Confirmed",
          });
        }
       
      } else {
        res.status(400).send({
          data: "",
          error: "No Autheraziton",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }

  // Delete collaborator/delete-recipe
  async DeleteRecipe(req, res, next) {
    try {
      var update = {
        Status: "Deleted",
      };
      var _IDRecipe = req.query.id;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id, Status: "ACTIVE" });
      var recipe = await Recipe.findOne({ _id: _IDRecipe });
      if (recipe._doc.IDAuthor == userDb._doc._id) {
        const recipeUpdate = await Recipe.findOneAndUpdate(
          { _id: _IDRecipe },
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: recipeUpdate,
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
        data: error,
        error: "Internal Server Error",
      });
    }
  }
}
module.exports = new CollaboratorController();
