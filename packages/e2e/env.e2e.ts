import * as fs from 'node:fs';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { parse } from 'valibot';

import { nodeSchema } from '../shared/env-schema';

function loadEnvFile(file: string): void {
  const filePath = path.resolve(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: false });
  }
}

loadEnvFile('.env'); // base
loadEnvFile('.env.e2e');

export const nodeEnv = parse(nodeSchema, process.env);
