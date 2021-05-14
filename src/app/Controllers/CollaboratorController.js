require("dotenv").config();
const User = require("../Models/User");
const Role = require("../Models/Role");
const Blog = require("../Models/Blog");
const Recipe = require("../Models/Recipe");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {
  createToken,
  verifyToken,
  createTokenTime,
  makePassword,
} = require("./index");
class CollaboratorController {
  // Post collaborator/create-blog
  async CreateBlog(req, res, next) {
    try {
      const {
        BlogTitle,
        BlogAuthor,
        BlogContent,
        IDAuthor,
      } = req.body;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id ,Status: "ACTIVE"});
      console.log(userDb._doc.IDRole);
      var role = await Role.findOne({_id: userDb._doc.IDRole});
      console.log(role._doc.RoleName);
      if (role._doc.RoleName == "Collaborator") {
        const blog = await Blog.create({
          BlogTitle,
          BlogAuthor: userDb._doc.FullName,
          BlogContent,
          IDAuthor: userDb._doc._id, 
        });
        res.status(200).send({
          data: blog,
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
      } 
       catch (error) {
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }
  // Put collaborator/update-blog

  async UpdateBlog(req, res, next) {
    try {
      const {
        BlogTitle,
        BlogContent,
      } = req.body;
      var update = {
        BlogTitle,
        BlogContent,
      }
      var _IDBlog = req.body.IDBlog;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id ,Status: "ACTIVE"});
      var blog = await Blog.findOne({_id: _IDBlog})
      if (blog._doc.IDAuthor == userDb._doc._id) {
        const blogUpdate = await Blog.findOneAndUpdate(
          { _id: _IDBlog},
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: blogUpdate,
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
      } 
       catch (error) {
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
      }
      var _IDBlog = req.query.id;
      console.log(_IDBlog);
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id ,Status: "ACTIVE"});
      var blog = await Blog.findOne({_id: _IDBlog})
      if (blog._doc.IDAuthor == userDb._doc._id) {
        const blogUpdate = await Blog.findOneAndUpdate(
          { _id: _IDBlog},
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: blogUpdate,
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
      } 
       catch (error) {
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }

   // Post collaborator/create-recipe
   async CreateBlog(req, res, next) {
    try {
      const {
        RecipesTitle,
        RecipesContent,
        NutritionalIngredients,
        IDAuthor,
      } = req.body;
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      const userDb = await User.findOne({ _id ,Status: "ACTIVE"});
      console.log(userDb._doc.IDRole);
      var role = await Role.findOne({_id: userDb._doc.IDRole});
      console.log(role._doc.RoleName);
      if (role._doc.RoleName == "Collaborator") {
        const blog = await Blog.create({
          BlogTitle,
          BlogAuthor: userDb._doc.FullName,
          BlogContent,
          IDAuthor: userDb._doc._id, 
        });
        res.status(200).send({
          data: blog,
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
      } 
       catch (error) {
      res.status(500).send({
        data: error,
        error: "Internal Server Error",
      });
    }
  }

}
  module.exports = new CollaboratorController();