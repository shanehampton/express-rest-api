const express = require("express");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const addRequestId = require("express-request-id")();
const morgan = require("morgan");
const routers = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(addRequestId);
morgan.token("id", function getId(req) {
  return req.id;
});
const logFormat =
  "\nid: :id\nrequest-time: [:date[iso]]\nrequest-method: :method\nrequest-url: :url\nresponse-status: :status\nresponse-content-length: :res[content-length]\nresponse-time: :response-time ms\n";
app.use(morgan(logFormat));
for (const router of Object.values(routers)) {
  app.use(router);
}
app.use(errors());

module.exports = app;
