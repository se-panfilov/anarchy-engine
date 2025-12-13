#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('❌ Usage: node rename-preload.js <input.js> <output.mjs>');
  process.exit(1);
}

try {
  const resolvedInput = path.resolve(inputPath);
  const resolvedOutput = path.resolve(outputPath);

  await fs.rename(resolvedInput, resolvedOutput);

  console.log(`✅ Renamed:\n  ${resolvedInput} →\n  ${resolvedOutput}`);
} catch (err) {
  console.error('❌ Rename failed:', err);
  process.exit(1);
}
