const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const appConfig = require("../config/app.config");
const u = require("../utils/util");
const User = require("../models/user.model");
const Profile = require("../models/profile.model");

async function populate() {
  const users = [
    new User({
      email: "shane1@example.com",
      password: bcrypt.hashSync("shane", 8),
    }),
    new User({
      email: "shane2@example.com",
      password: bcrypt.hashSync("shane", 8),
    }),
  ];
  for (const user of users) {
    await user.save();
  }

  let user = await u.getInstance(User);
  let user_id = user._id;
  const profiles = [
    new Profile({ user_id: user_id, name: "dummy-profile-1" }),
    new Profile({ user_id: user_id, name: "dummy-profile-2" }),
  ];
  for (const profile of profiles) {
    await profile.save();
  }
}

async function clear() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

module.exports.setUp = async () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(appConfig.databaseUrlTest, { useNewUrlParser: true });
  await populate();
};

module.exports.tearDown = async () => {
  await clear();
  mongoose.connection.close();
};
