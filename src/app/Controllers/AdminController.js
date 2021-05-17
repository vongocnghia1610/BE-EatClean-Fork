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
  //Post admin/confirm-blog
  async ConfirmBlog(req, res, next) {
    try {
      const token = req.get("Authorization").replace("Bearer ", "");
      var _IDBlog = req.query.id;
      var updateValue = { Status: "CONFIRM" };
      const _id = await verifyToken(token);
      var result = await User.findOne({ _id }); //muc dich la lay role
      if (result != null) {
        const roleDT = result._doc.IDRole;
        var role = await Role.findOne({ _id: roleDT });
        if (role._doc.RoleName == "Admin") {
          var check = await Blog.findOne({ _id: _IDBlog });
          if (check != null) {
            var user = await User.findOne({ _id: check._doc.IDAuthor });
            var emailUser = user._doc.Email;
            console.log(emailUser);
            var smtpTransport = nodemailer.createTransport({
              service: "gmail", //smtp.gmail.com  //in place of service use host...
              secure: false, //true
              port: 25, //465
              auth: {
                user: process.env.EmailAdmin,
                pass: process.env.PasswordAdmin,
              },
              tls: {
                rejectUnauthorized: false,
              },
            });
            var nameBlog = `${check.BlogTitle}`;
            var mailOptions = {
              to: emailUser,
              from: process.env.EmailAdmin,
              subject: "Confirm Blog",
              text:
                "Blog " +
                nameBlog +
                " đã được admin xác nhận và đăng lên Blog cộng đồng.",
            };
            smtpTransport.sendMail(
              mailOptions,
              async function (error, response) {
                if (error) {
                  console.log(error);
                  res.status(400).send({
                    data: "null",
                    error: "Gửi không thành công",
                  });
                } else {
                  var resultBlog = await Blog.findOneAndUpdate(
                    { _id: _IDBlog },
                    updateValue,
                    {
                      new: true,
                    }
                  );
                  res.status(200).send({
                    Data: resultBlog,
                    Success: "Đã gửi Email thành công",
                    error: "null",
                  });
                }
              }
            );
          } else {
            res.status(400).send({
              data: "",
              error: "No Blog",
            });
          }
        } else {
          res.status(404).send({
            data: "",
            error: "No Authentication",
          });
        }
      } else {
        res.status(404).send({
          data: "",
          error: "Not found user!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
  //Post admin/confirm-Recipe
  async ConfirmRecipe(req, res, next) {
    try {
      const token = req.get("Authorization").replace("Bearer ", "");
      var _IDRecipe = req.query.id;
      var updateValue = { Status: "CONFIRM" };
      const _id = await verifyToken(token);
      var result = await User.findOne({ _id }); //muc dich la lay role
      if (result != null) {
        const roleDT = result._doc.IDRole;
        var role = await Role.findOne({ _id: roleDT });
        if (role._doc.RoleName == "Admin") {
          var check = await Recipe.findOne({ _id: _IDRecipe });
          if (check != null) {
            var user = await User.findOne({ _id: check._doc.IDAuthor });
            var emailUser = user._doc.Email;
            console.log(emailUser);
            var smtpTransport = nodemailer.createTransport({
              service: "gmail", //smtp.gmail.com  //in place of service use host...
              secure: false, //true
              port: 25, //465
              auth: {
                user: process.env.EmailAdmin,
                pass: process.env.PasswordAdmin,
              },
              tls: {
                rejectUnauthorized: false,
              },
            });
            var nameRecipe = `${check.RecipesTitle}`;
            var mailOptions = {
              to: emailUser,
              from: process.env.EmailAdmin,
              subject: "Confirm Blog",
              text:
                "Recipe " +
                nameRecipe +
                " đã được admin xác nhận và đăng lên Recipes cộng đồng.",
            };
            smtpTransport.sendMail(
              mailOptions,
              async function (error, response) {
                if (error) {
                  console.log(error);
                  res.status(400).send({
                    data: "null",
                    error: "Gửi không thành công",
                  });
                } else {
                  var resultRecipe = await Recipe.findOneAndUpdate(
                    { _id: _IDRecipe },
                    updateValue,
                    {
                      new: true,
                    }
                  );
                  res.status(200).send({
                    Data: resultRecipe,
                    Success: "Đã gửi Email thành công",
                    error: "null",
                  });
                }
              }
            );
          } else {
            res.status(400).send({
              data: "",
              error: "No Recipes",
            });
          }
        } else {
          res.status(404).send({
            data: "",
            error: "No Authentication",
          });
        }
      } else {
        res.status(404).send({
          data: "",
          error: "Not found user!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
}
module.exports = new MeController();
