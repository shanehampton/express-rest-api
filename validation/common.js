const { celebrate, Segments, Joi } = require("celebrate");
const schemas = require("./schemas");

module.exports.validateIdParam = () => {
  return celebrate({
    [Segments.PARAMS]: Joi.object({
      id: schemas.field.id(),
    }),
  });
};

module.exports.checkRefId = (Model) => {
  return async (value, helpers) => {
    const count = await Model.countDocuments({ _id: value });
    if (count >= 1) {
      return value;
    } else {
      return helpers.error("any.invalid");
    }
  };
};
