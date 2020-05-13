const Ajv = require('ajv');
const betterAjvErrors = require('better-ajv-errors');

const ajv = new Ajv({ jsonPointers: true });

const schema = require('../schemas/schema.json');
const data = require('../data/react-native.json');

const validate = ajv.compile(schema);
const valid = validate(data);

console.log(valid);

if (!valid) {
  const output = betterAjvErrors(schema, data, validate.errors);
  console.log(output);
}
