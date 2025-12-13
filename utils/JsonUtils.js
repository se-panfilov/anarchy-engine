import fs from 'fs';
import * as tsj from 'ts-json-schema-generator';

const isMinify = process.argv.includes('--minify');

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const baseConfig = {
  tsconfig: './tsconfig.json',
  type: '*', // Or <type-name> if you want to generate schema for that one type only,
  topRef: false,
  minify: isMinify ?? false,
  // TODO debug, revert "noTypeCheck"
  noTypeCheck: true
};

function generate(config) {
  const schema = tsj.createGenerator(config).createSchema(config.type);
  return JSON.stringify(schema, null, isMinify ? null : 2);
}

function writeSchema(outputPath, schemaString) {
  // TODO should create an output file if it's not exist
  fs.writeFile(outputPath, schemaString, (err) => {
    if (err) throw err;
  });
}

function generateLevelConfigSchema() {
  const config = { ...baseConfig, path: './src/Engine/Space/Models/TSpaceConfig.ts' };
  const schemaString = generate(config);
  const outputPath = './src/Engine/Space/Schemas/TSpaceConfig.json';
  writeSchema(outputPath, schemaString);
}

generateLevelConfigSchema();
