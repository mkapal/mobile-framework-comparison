import path from 'path';

import glob from 'glob';

import schema from '../schemas/frameworks.json';

const DIR_BASE = path.resolve(__dirname, '../');

describe('Framework data JSON schema validation', () => {
  const jsonFiles = glob.sync(`${DIR_BASE}/data/*.json`);
  jsonFiles.forEach((filePath) => {
    const jsonObject = require(filePath);
    it(`${path.basename(filePath)} should match JSON schema`, () => {
      expect(jsonObject).toMatchSchema(schema);
    });
  });
});
