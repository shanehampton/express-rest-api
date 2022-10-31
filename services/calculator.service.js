module.exports.findHypotenuse = (a, b) => {
  let aSquared = Math.pow(a, 2);
  let bSquared = Math.pow(b, 2);
  return Math.sqrt(aSquared + bSquared);
};
