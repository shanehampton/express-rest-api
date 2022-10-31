const mongoose = require("mongoose");
const { generateId } = require("../utils/util");
const Schema = mongoose.Schema;

const modelName = "User";
const generateIdWrapper = () => {
  return generateId(true, modelName);
};

let userSchema = new Schema(
  {
    _id: {
      type: String,
      default: generateIdWrapper,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(modelName, userSchema);
