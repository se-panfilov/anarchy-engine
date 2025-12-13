import fs from 'fs';
import tsj from 'ts-json-schema-generator';

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const baseConfig = {
  tsconfig: './tsconfig.json',
  type: '*', // Or <type-name> if you want to generate schema for that one type only,
  topRef: false
};

function generate(config) {
  const schema = tsj.createGenerator(config).createSchema(config.type);
  return JSON.stringify(schema, null, 2);
}

function writeSchema(outputPath, schemaString) {
  // TODO (S.Panfilov) should create an output file if it's not exist
  fs.writeFile(outputPath, schemaString, (err) => {
    if (err) throw err;
  });
}

function generateLevelConfigSchema() {
  const config = { ...baseConfig, path: './src/Engine/Domains/Level/Models/ILevelConfig.ts' };
  const schemaString = generate(config);
  const outputPath = './src/Engine/Domains/Level/Schemas/ILevelConfig.json';
  writeSchema(outputPath, schemaString);
}

generateLevelConfigSchema();
