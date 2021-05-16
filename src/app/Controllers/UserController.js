require("dotenv").config();
const User = require("../Models/User");
const Role = require("../Models/Role");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { UploadImage } = require("./index");
const {
  createToken,
  verifyToken,
  createTokenTime,
  makePassword,
} = require("./index");
class UserController {
  //Post user/register-user
  async RegisterUser(req, res, next) {
    try {
      const Username = req.body.Username;
      const Email = req.body.Email;
      const Password = req.body.Password;
      const FullName = req.body.FullName;
      const result = await User.findOne({ Username });
      if (result == null) {
        const hashPassword = await bcrypt.hash(Password, 5);
        const user = await User.create({
          Username,
          Email,
          Password: hashPassword,
          FullName,
        });
        var id_account = user._doc._id;
        const token = await createTokenTime(`${id_account}`);
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
        var url = `http://${req.headers.host}/user/verify-email/${token}`;
        var mailOptions = {
          to: user._doc.Email,
          from: process.env.EmailAdmin,
          subject: "Verify Email",
          text: "Please follow this link to verify Email " + url,
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
            res.status(400).send({
              error: "Gửi không thành công",
            });
          } else {
            res.status(200).send({
              data: user,
              Success: "Đã gửi Email thành công",
            });
          }
        });
      } else {
        res.status(400).send({
          error: "Tài khoản đã tồn tại",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "Dang ky that bai",
      });
    }
  }
  //Post user/register-user
  async RegisterCollaborator(req, res, next) {
    try {
      const Username = req.body.Username;
      const Email = req.body.Email;
      const Password = req.body.Password;
      const FullName = req.body.FullName;
      const result = await User.findOne({ Username });
      if (result == null) {
        const hashPassword = await bcrypt.hash(Password, 5);
        const user = await User.create({
          Username,
          Email,
          Password: hashPassword,
          FullName,
          IDRole: "609d2d03fee09d75f011158c",
        });
        var id_account = user._doc._id;
        const token = await createTokenTime(`${id_account}`);
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
        var url = `http://${req.headers.host}/user/verify-email/${token}`;
        var mailOptions = {
          to: user._doc.Email,
          from: process.env.EmailAdmin,
          subject: "Verify Email",
          text: "Please follow this link to verify Email " + url,
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
            res.status(400).send({
              error: "Gửi không thành công",
            });
          } else {
            res.status(200).send({
              data: user,
              Success: "Đã gửi Email thành công",
            });
          }
        });
      } else {
        res.status(400).send({
          error: "Tài khoản đã tồn tại",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "Dang ky that bai",
      });
    }
  }
  //get customers/verify-Emaillll
  async verifyEmail(req, res, next) {
    try {
      const token = req.params.token;
      const data = await verifyToken(token);
      const _id = data.data;
      console.log(_id);
      var result = await User.findOne({ _id });
      if (result != null) {
        var update = { Status: "ACTIVE" };
        await User.findOneAndUpdate({ _id }, update, {
          new: true,
        });
        res.status(200).send({
          data: "Kích hoạt thành công",
          error: "null",
        });
      } else {
        res.status(400).send({
          error: "No Email",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Token hết hạn!");
    }
  }

  //Post user/login
  async login(req, res, next) {
    try {
      const { Username, Password } = req.body;
      var result = await User.findOne({ Username, Status: "ACTIVE" });
      if (result != null) {
        const isEqualPassword = await bcrypt.compare(Password, result.Password);
        if (isEqualPassword) {
          const token = await createToken(`${result._id}`);
          result._doc.token = token;
          res.status(200).send({
            data: result,
            error: "null",
          });
        } else {
          res.status(400).send({
            error: "Wrong password!",
          });
        }
      } else {
        res.status(404).send({
          error: "Email not found or Email Inactive",
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
module.exports = new UserController();
