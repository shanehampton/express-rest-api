const express = require("express");
const { celebrate, Segments } = require("celebrate");

const controller = require("../controllers/profile.controller");
const router = new express.Router();
const schemas = require("../validation/schemas");
const { validateIdParam } = require("../validation/common");
const u = require("../utils/util");
const body = schemas.body.profile;
const _body = u.relaxSchema(body);

router
  .route("/profiles")
  .get(controller.getAll)
  .post(
    celebrate({
      [Segments.BODY]: body,
    }),
    controller.post
  );

router
  .route("/profiles/:id")
  .all(validateIdParam())
  .get(controller.getOne)
  .patch(
    celebrate({
      [Segments.BODY]: _body,
    }),
    controller.patch
  )
  .delete(controller.delete);

module.exports = router;
