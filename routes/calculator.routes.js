const express = require("express");
const { celebrate, Segments } = require("celebrate");

const controller = require("../controllers/calculator.controller");
const router = new express.Router();
const schemas = require("../validation/schemas");
const body = schemas.body.calculator;

router.route("/calculator").post(
  celebrate({
    [Segments.BODY]: body,
  }),
  controller.run
);

module.exports = router;
