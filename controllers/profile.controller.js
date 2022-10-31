const Model = require("../models/profile.model");
const crud = require("../utils/mongoose/crud");

module.exports.getAll = (req, res) => {
  crud.read(req, res, Model);
};

module.exports.getOne = (req, res) => {
  crud.readById(req, res, Model);
};

module.exports.post = (req, res) => {
  crud.create(req, res, Model);
};

module.exports.patch = (req, res) => {
  crud.updateById(req, res, Model);
};

module.exports.delete = (req, res) => {
  crud.deleteById(req, res, Model);
};
