function addFilterEntry(filter, paramName, operator, value, paramType) {
  if (typeof operator === "undefined") {
    operator = "eq";
  }
  operator = `$${operator}`;
  if (paramType === "Number") {
    if (typeof value === "String") {
      value = Number(value);
    } else if (Array.isArray(value)) {
      value = value.map(Number);
    }
  }
  console.log(
    `paramName: ${paramName}, operator: ${operator}, value: ${value}, paramType: ${paramType}`
  );
  filter[paramName] = { [operator]: value };
  return filter;
}

function constructFilter(req, model) {
  let filter = {};
  const modelParams = model.schema.paths;
  for (const key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      let keySplit = key.split("_");
      let paramName = keySplit[0];
      if (modelParams.hasOwnProperty(paramName)) {
        let operator = keySplit[1];
        let value = req.query[key];
        try {
          value = JSON.parse(value);
        } catch (err) {}
        let paramType = model.schema.paths[paramName].instance;
        filter = addFilterEntry(filter, paramName, operator, value, paramType);
      }
    }
  }
  return filter;
}

module.exports = constructFilter;
