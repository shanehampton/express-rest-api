const mongoose = require("mongoose");
const app = require("./app");
const appConfig = require("./config/app.config");

mongoose.Promise = global.Promise;
mongoose
  .connect(appConfig.databaseUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.listen(appConfig.port, () => {
  console.log(`Server started on port ${appConfig.port}...`);
});
