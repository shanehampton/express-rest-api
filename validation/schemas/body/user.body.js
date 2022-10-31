const { Joi } = require("celebrate");

const userBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  is_active: Joi.boolean().optional().default(true),
});

module.exports = userBody;
