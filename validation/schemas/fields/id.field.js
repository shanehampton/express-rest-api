const { Joi } = require("celebrate");

module.exports = (required = true) => {
  if (required) {
    return Joi.string()
      .regex(
        /^[A-Z]{1,5}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
      )
      .required();
  } else {
    return Joi.string()
      .regex(
        /^[A-Z]{1,5}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
      )
      .optional();
  }
};
