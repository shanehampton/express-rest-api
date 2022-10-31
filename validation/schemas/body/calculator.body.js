const { Joi } = require("celebrate");

const calculatorBody = Joi.object({
  a: Joi.number().greater(0).required(),
  b: Joi.number().greater(0).required(),
});

module.exports = calculatorBody;
