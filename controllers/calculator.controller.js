const service = require("../services/calculator.service");

module.exports.run = (req, res) => {
  const data = req.body;
  let a = data.a;
  let b = data.b;
  let h = service.findHypotenuse(a, b);
  let responseBody = {
    hypotenuse: h,
  };
  return res.status(200).send(responseBody);
};
