const { Joi } = require("celebrate");
const id = require("../fields/id.field");
const User = require("../../../models/user.model");
const { checkRefId } = require("../../common");

const profileBody = Joi.object({
  user_id: id().required(),
  name: Joi.string().required(),
  date_of_birth: Joi.string().isoDate().optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  phone_number: Joi.string()
    .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    .optional(),
  location: Joi.string().optional(),
  bio: Joi.string().optional(),
});

module.exports = profileBody;
