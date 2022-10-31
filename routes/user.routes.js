const express = require("express");
const { celebrate, Segments } = require("celebrate");

const controller = require("../controllers/user.controller");
const router = new express.Router();
const schemas = require("../validation/schemas");
const body = schemas.body.user;

router.route("/users").get(controller.getAll);

router.route("/users/register").post(
  celebrate({
    [Segments.BODY]: body,
  }),
  controller.register
);

router.route("/users/login").post(
  celebrate({
    [Segments.BODY]: body,
  }),
  controller.login
);

module.exports = router;
