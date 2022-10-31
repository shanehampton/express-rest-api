const constructFilter = require("./filter");
const getSort = require("./sort");

module.exports.read = (req, res, Model) => {
  // read all records
  const filter = constructFilter(req, Model);
  const sort = getSort(req);
  Model.find(filter)
    .collation({ locale: "en", strength: 1 })
    .sort(sort)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred",
      });
    });
};

module.exports.readById = (req, res, Model) => {
  // read a single record denominated by id
  Model.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
        return;
      }
      res.status(500).send({
        message: err.message || `An error occured`,
      });
    });
};

module.exports.create = (req, res, Model) => {
  // create a record
  const instance = new Model(req.body);
  instance
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred",
      });
    });
};

module.exports.updateById = (req, res, Model) => {
  // update a single record denominated by id
  Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
      }
      res.status(500).send({
        message: err.message || "An error occured",
      });
    });
};

module.exports.deleteById = (req, res, Model) => {
  // delete a single record denominated by id
  Model.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Id ${req.params.id} not found`,
        });
      }
      res.status(500).send({
        message: err.message || "An error occurred",
      });
    });
};
