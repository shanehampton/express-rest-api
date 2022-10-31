const uuid = require("uuid");

const modelPrefixes = {
  User: "USER",
  Profile: "PROF",
};

function getModelPropertyNames(Model, drop = true) {
  // return array of model field names
  // optionally drop extraneous fields
  const modelPaths = Model.schema.paths;
  let propNames = Object.getOwnPropertyNames(modelPaths);
  if (drop) {
    propNames = propNames.filter(
      (item) => !["_id", "__v", "createdAt", "updatedAt"].includes(item)
    );
  }
  return propNames;
}
module.exports.getModelPropertyNames = getModelPropertyNames;

function relaxSchema(schema) {
  // returns a schema fork with all top-level keys optional
  // for use in partial updates via PATCH
  paths = Object.keys(schema.describe().keys);
  return schema.fork(paths, (schema) => schema.optional());
}
module.exports.relaxSchema = relaxSchema;

async function getInstance(Model) {
  // return an arbitrary instance of Model
  const instance = await Model.findOne();
  return instance;
}
module.exports.getInstance = getInstance;

function generateId(addPrefix = true, modelName = null) {
  // returns a UUID v4 optionally prefixed based on modelName
  let baseId = uuid.v4();
  let prefix = "";
  console.log("\ngenerating ID...\n");
  console.log(
    `modelName: ${modelName}, type: ${typeof modelName}\nprefix: ${
      modelPrefixes[modelName]
    }\n`
  );
  if (
    addPrefix == true &&
    modelName !== null &&
    modelPrefixes[modelName] != null
  ) {
    console.log("adding prefix...\n");
    prefix += `${modelPrefixes[modelName]}-`;
  } else {
    console.log("not adding prefix...\n");
  }
  return prefix + baseId;
}
module.exports.generateId = generateId;
