const mongoose = require("mongoose");
const { generateId } = require("../utils/util");
const Schema = mongoose.Schema;

const modelName = "Profile";
const generateIdWrapper = () => {
  return generateId(true, modelName);
};

let profileSchema = new Schema(
  {
    _id: {
      type: String,
      default: generateIdWrapper,
    },
    user_id: {
      type: String,
      ref: "User",
    },
    name: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(modelName, profileSchema);
