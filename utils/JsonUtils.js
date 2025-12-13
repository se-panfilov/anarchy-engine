// import * as tsConfig from '../../tsconfig.json';
const fs = require('fs');
const path = require('path');
const tsj = require('ts-json-schema-generator');

// const inputFile = fs.readFileSync(path.resolve(file));
// const inputFile = fs.readFileSync(path.resolve('../../tsconfig.json'));

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
  path: 'src/Engine/Launcher/Models/ISceneConfig.ts',
  tsconfig: './tsconfig.json',
  type: '*' // Or <type-name> if you want to generate schema for that one type only
};

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err) => {
  if (err) throw err;
});

const output_path = 'path/to/output/file';

export function generateSchemaForInterface(file, tsConfig) {}

// npx ts-json-schema-generator --path 'ISceneConfig.ts' --type 'ISceneConfig' --tsconfig '../../../../tsconfig.json'
