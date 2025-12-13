import fs from 'fs';
import * as tsj from 'ts-json-schema-generator';

const isMinify = process.argv.includes('--minify');

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const baseConfig = {
  // additionalProperties: false,
  // discriminatorType: "json-schema",
  // encodeRefs: true,
  // expose: "export",
  // schemaId: 'Anarchy_Engine',
  // extraTags: [],
  // fullDescription: false,
  // functions: "comment",
  jsDoc: 'basic',
  // markdownDescription: false,
  minify: isMinify ?? false,
  // skipTypeCheck: false,
  // sortProps: true,
  strictTuples: true,
  topRef: false,
  tsconfig: './tsconfig.json',
  type: '*' // Or <type-name> if you want to generate schema for that one type only,
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
  const config = { ...baseConfig, path: './src/Space/Models/TSpaceConfig.ts' };
  const schemaString = generate(config);
  const outputPath = './src/Space/Schemas/TSpaceConfig.json';
  writeSchema(outputPath, schemaString);
}

generateLevelConfigSchema();
