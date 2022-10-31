const User = require("../models/user.model.js");
const crud = require("../utils/mongoose/crud");
const bcrypt = require("bcryptjs");

module.exports.getAll = (req, res) => {
  crud.read(req, res, User);
};

module.exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const data = req.body;
  data["password"] = hashedPassword;
  const instance = new User(data);
  instance
    .save()
    .then(() => {
      res.status(200).send({
        message: "Registration successful",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred",
      });
    });
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).send({
          message: "Login failed",
        });
      } else {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          res.status(401).send({
            message: "Login failed",
          });
        } else {
          user["password"] = "********";
          res.status(200).send(user);
        }
      }
    })
    .catch((err) => {
      return res.status(401).send({
        message: "Login failed",
      });
    });
};
